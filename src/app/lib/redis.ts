import Redis from 'ioredis';
import { kv } from '@vercel/kv';

// Redis client for development environment
const redis = process.env.NODE_ENV === 'development'
  ? new Redis() // Connect to localhost:6379
  : kv;

export { redis as kv }; 