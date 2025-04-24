'use server';

import { ethers } from 'ethers';
import { CHAIN_CONFIG, PCE_ABI } from '../constants/chain';

export async function checkBalance() {
  try {
    const provider = new ethers.JsonRpcProvider(CHAIN_CONFIG.rpcUrl);
    const wallet = new ethers.Wallet(process.env.FAUCET_PRIVATE_KEY!, provider);
    const pceContract = new ethers.Contract(CHAIN_CONFIG.pceContract, PCE_ABI, provider);

    // Check PCE balance
    const pceBalance = await pceContract.balanceOf(wallet.address);
    const formattedBalance = ethers.formatUnits(pceBalance, 18);

    // Check MATIC balance
    const maticBalance = await provider.getBalance(wallet.address);
    const formattedMaticBalance = ethers.formatEther(maticBalance);

    return {
      address: wallet.address,
      pceBalance: formattedBalance,
      maticBalance: formattedMaticBalance
    };
  } catch (error) {
    console.error('Error checking balance:', error);
    throw error;
  }
} 