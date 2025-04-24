'use server';

import { kv } from '../lib/redis';
import { ethers } from 'ethers';
import { FAUCET_CONFIG } from '../constants/faucet';
import { CHAIN_CONFIG, PCE_ABI } from '../constants/chain';

export type FaucetResponse = {
  success: boolean;
  message: string;
  txHash?: string;
};

/**
 * Validate wallet address
 */
function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Get next available distribution time
 */
function getNextAvailableTime(lastRequestTime: number | null): number {
  if (!lastRequestTime) return 0;
  const lastRequest = new Date(lastRequestTime);
  const nextAvailable = new Date(lastRequest);
  nextAvailable.setHours(nextAvailable.getHours() + FAUCET_CONFIG.DISTRIBUTION_INTERVAL_HOURS);
  return nextAvailable.getTime();
}

/**
 * Send PCE tokens
 */
async function sendPCE(toAddress: string): Promise<string> {
  const provider = new ethers.JsonRpcProvider(CHAIN_CONFIG.rpcUrl);
  const wallet = new ethers.Wallet(process.env.FAUCET_PRIVATE_KEY, provider);
  const pceContract = new ethers.Contract(CHAIN_CONFIG.pceContract, PCE_ABI, wallet);

  // Adjust PCE amount to 18 decimals
  const amount = ethers.parseUnits(FAUCET_CONFIG.DISTRIBUTION_AMOUNT.toString(), 18);

  // Send transaction
  const tx = await pceContract.transfer(toAddress, amount);
  const receipt = await tx.wait();

  return receipt.hash;
}

/**
 * Server Action to distribute PCE tokens
 */
export async function requestPCE(address: string): Promise<FaucetResponse> {
  if (!isValidAddress(address)) {
    return {
      success: false,
      message: 'Invalid wallet address',
    };
  }

  try {
    const lastRequestTime = Number(await kv.get<string>(`last_request:${address}`)) || null;
    const nextAvailableTime = getNextAvailableTime(lastRequestTime);
    const now = Date.now();

    if (nextAvailableTime > now) {
      const waitTimeHours = Math.ceil((nextAvailableTime - now) / (1000 * 60 * 60));
      return {
        success: false,
        message: `Please wait ${waitTimeHours} hour${waitTimeHours > 1 ? 's' : ''} before requesting again`,
      };
    }

    const txHash = await sendPCE(address);
    await kv.set(`last_request:${address}`, now);

    return {
      success: true,
      message: 'PCE tokens have been sent to your wallet!',
      txHash,
    };
  } catch (error) {
    console.error('Error in requestPCE:', error);
    return {
      success: false,
      message: 'Failed to send PCE tokens. Please try again later.',
    };
  }
} 