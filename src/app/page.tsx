/** @format */

"use client";

import { useState, useEffect } from "react";
import { PeaceCoinLogo } from "./components/PeaceCoinLogo";
import { WalletIcon } from "./components/WalletIcon";
import { FAUCET_CONFIG } from "./constants/faucet";
import { requestPCE } from "./actions/faucet";
import { CHAIN_CONFIG } from "./constants/chain";
import { checkBalance } from "./actions/check-balance";

export default function Home() {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [txHash, setTxHash] = useState<string>();
  const [faucetInfo, setFaucetInfo] = useState<{
    address: string;
    pceBalance: string;
    maticBalance: string;
  }>();
  const [showDebug, setShowDebug] = useState(false);

  // Load balance info only in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const loadFaucetInfo = async () => {
        try {
          const info = await checkBalance();
          setFaucetInfo(info);
        } catch (error) {
          console.error("Error loading faucet info:", error);
        }
      };
      loadFaucetInfo();
    }
  }, []);

  // Debug mode toggle handler
  const toggleDebug = (e: KeyboardEvent) => {
    if (process.env.NODE_ENV === "development" && e.ctrlKey && e.key === "d") {
      setShowDebug((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", toggleDebug);
    return () => window.removeEventListener("keydown", toggleDebug);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);
    setTxHash(undefined);

    try {
      const result = await requestPCE(address);
      setMessage(result.message);
      setIsError(!result.success);
      if (result.txHash) {
        setTxHash(result.txHash);
      }
    } catch {
      setMessage("An error occurred while processing your request");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // トランザクションのExplorer URL
  const getExplorerUrl = (hash: string) => {
    return `${CHAIN_CONFIG.explorerUrl}/tx/${hash}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(.95_0.02_208.35)] to-[oklch(.85_0.05_208.35)] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-[oklch(.6531_0.1089_208.35)]/20">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6">
            <PeaceCoinLogo />
          </div>
          <p className="text-center text-[oklch(.6531_0.1089_208.35)] font-medium mb-2">
            Building Peace Through Technology
          </p>
          <p className="text-center text-gray-500 text-sm">
            Receive {FAUCET_CONFIG.DISTRIBUTION_AMOUNT} PCE /{" "}
            {FAUCET_CONFIG.DISTRIBUTION_INTERVAL_HOURS} hrs
          </p>
          {process.env.NODE_ENV === "development" &&
            showDebug &&
            faucetInfo && (
              <div className="mt-4 text-center text-xs font-mono bg-gray-100 p-2 rounded">
                <p>DEBUG MODE</p>
                <p>Faucet: {faucetInfo.address}</p>
                <p>PCE: {Number(faucetInfo.pceBalance).toFixed(2)}</p>
                <p>MATIC: {Number(faucetInfo.maticBalance).toFixed(4)}</p>
              </div>
            )}
        </div>

        {message && (
          <div
            className={`${
              isError
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-[oklch(.95_0.02_208.35)] border-[oklch(.6531_0.1089_208.35)]/20 text-[oklch(.6531_0.1089_208.35)]"
            } px-6 py-4 rounded-2xl relative mb-8 border`}
            role="alert"
          >
            <p className="text-sm leading-relaxed">{message}</p>
            {txHash && (
              <p className="text-sm mt-2">
                <a
                  href={getExplorerUrl(txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[oklch(.6531_0.1089_208.35)] hover:underline"
                >
                  View transaction →
                </a>
              </p>
            )}
          </div>
        )}

        {!message && (
          <div
            className="bg-[oklch(.95_0.02_208.35)] border border-[oklch(.6531_0.1089_208.35)]/20 text-[oklch(.6531_0.1089_208.35)] px-6 py-4 rounded-2xl relative mb-8"
            role="alert"
          >
            <p className="text-sm leading-relaxed">
              Together, we can build a more peaceful world.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Your Wallet Address (0x...)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border border-[oklch(.6531_0.1089_208.35)]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[oklch(.6531_0.1089_208.35)]/50 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <WalletIcon className="text-[oklch(.6531_0.1089_208.35)]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !address}
            className="w-full bg-[oklch(.6531_0.1089_208.35)] text-[oklch(.985_0_0)] py-4 rounded-2xl font-semibold hover:bg-[oklch(.6_0.1089_208.35)] transition-colors shadow-lg shadow-[oklch(.6531_0.1089_208.35)]/20 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? "Processing..." : "Receive PCE"}</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="https://www.peace-coin.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[oklch(.6531_0.1089_208.35)] hover:text-[oklch(.6_0.1089_208.35)] text-sm"
          >
            Learn more about PEACE COIN →
          </a>
        </div>
      </div>
    </div>
  );
}
