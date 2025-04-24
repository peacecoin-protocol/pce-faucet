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
NEXT_PUBLIC_CHAIN_ID=137  # Polygon Mainnet
NEXT_PUBLIC_RPC_URL=https://polygon-rpc.com
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

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Link Your Project

```bash
vercel link
```

### 4. Set Up Environment Variables

You can set up environment variables in two ways:

#### Using Vercel CLI

```bash
# Add environment variables
vercel env add NEXT_PUBLIC_CHAIN_ID
vercel env add NEXT_PUBLIC_RPC_URL
vercel env add NEXT_PUBLIC_PCE_CONTRACT_ADDRESS
vercel env add NEXT_PUBLIC_EXPLORER_URL
vercel env add FAUCET_PRIVATE_KEY
```

#### Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" > "Environment Variables"
4. Add the following variables:
   - `NEXT_PUBLIC_CHAIN_ID`
   - `NEXT_PUBLIC_RPC_URL`
   - `NEXT_PUBLIC_PCE_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_EXPLORER_URL`
   - `FAUCET_PRIVATE_KEY`

### 5. Set Up Vercel KV

1. Go to your project in Vercel Dashboard
2. Navigate to "Storage" tab
3. Click "Create Database"
4. Select "KV" and choose your preferred region
5. After creation, you'll get the following environment variables:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
6. Add all these variables to your project's environment variables

Note: All these variables are required for Vercel KV to work properly, even in development environment.

For local development, you can find these values in the Vercel Dashboard:

1. Go to your project
2. Navigate to "Storage" > "KV"
3. Click "Quick Copy" next to ".env.local"
4. Paste the contents into your `.env.local` file

### 6. Deploy

```bash
vercel deploy
```

For more details, refer to the [Vercel documentation](https://vercel.com/docs).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
