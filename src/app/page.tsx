/** @format */

import { PeaceCoinLogo } from "./components/PeaceCoinLogo";
import { WalletIcon } from "./components/WalletIcon";
import { FAUCET_CONFIG } from "./constants/faucet";

export default function Home() {
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
        </div>

        <div
          className="bg-[oklch(.95_0.02_208.35)] border border-[oklch(.6531_0.1089_208.35)]/20 text-[oklch(.6531_0.1089_208.35)] px-6 py-4 rounded-2xl relative mb-8"
          role="alert"
        >
          <p className="text-sm leading-relaxed">
            Together, we can build a more peaceful world.
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Your Wallet Address (0x...)"
              className="w-full pl-12 pr-6 py-4 border border-[oklch(.6531_0.1089_208.35)]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[oklch(.6531_0.1089_208.35)]/50 bg-white/50 backdrop-blur-sm text-gray-700 placeholder-gray-400"
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <WalletIcon className="text-[oklch(.6531_0.1089_208.35)]" />
            </div>
          </div>

          <button className="w-full bg-[oklch(.6531_0.1089_208.35)] text-[oklch(.985_0_0)] py-4 rounded-2xl font-semibold hover:bg-[oklch(.6_0.1089_208.35)] transition-colors shadow-lg shadow-[oklch(.6531_0.1089_208.35)]/20 flex items-center justify-center space-x-2">
            <span>Receive PCE</span>
          </button>
        </div>

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
