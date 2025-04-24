declare namespace NodeJS {
  interface ProcessEnv {
    // Vercel KV
    KV_URL: string;

    // Chain Config
    NEXT_PUBLIC_CHAIN_ID: string;
    NEXT_PUBLIC_RPC_URL: string;
    NEXT_PUBLIC_PCE_CONTRACT_ADDRESS: string;
    NEXT_PUBLIC_EXPLORER_URL: string;

    // Faucet Wallet
    FAUCET_PRIVATE_KEY: string;
  }
} 