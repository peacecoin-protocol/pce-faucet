<!-- @format -->

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# PEACE COIN Faucet

A faucet website for distributing PEACE COIN test tokens.

## Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- Redis (for local development)

### Environment Variables

Create a `.env.local` file and set the following environment variables:

```bash
# Chain Config
NEXT_PUBLIC_CHAIN_ID=11155111  # Sepolia
NEXT_PUBLIC_RPC_URL=https://...
NEXT_PUBLIC_PCE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_EXPLORER_URL=https://polygonscan.com

# Faucet Wallet
FAUCET_PRIVATE_KEY=your_private_key

# Vercel KV (for production)
KV_URL=redis://...
```

### Redis Setup (for Local Development)

For macOS:

```bash
# Install Redis
brew install redis

# Start Redis server
brew services start redis

# Stop Redis server (if needed)
brew services stop redis
```

For other operating systems, please refer to the [Redis documentation](https://redis.io/docs/getting-started/).

### Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## Tech Stack

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [ethers.js](https://docs.ethers.org/v6/) - Ethereum JavaScript API
- [Vercel KV](https://vercel.com/storage/kv) - KV Storage (Production)
- [Redis](https://redis.io/) - KV Storage (Development)

## Deployment

This application is designed to be deployed on [Vercel](https://vercel.com). Follow these steps to deploy:

1. Import your project to Vercel
2. Configure environment variables
3. Enable Vercel KV

For more details, refer to the [Vercel documentation](https://vercel.com/docs).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
