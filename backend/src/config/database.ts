// backend/src/config/database.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Use LOCAL_DATABASE_URL only in development mode, otherwise use DATABASE_URL
// This avoids Supabase tenant/user context issues in local development
// In production (Render), always use DATABASE_URL
const isDevelopment = process.env.NODE_ENV !== 'production';
const connectionString = (isDevelopment && process.env.LOCAL_DATABASE_URL) 
  ? process.env.LOCAL_DATABASE_URL 
  : process.env.DATABASE_URL;

// Verify connection string is set
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set. Please check your .env file or Render environment variables.');
}

// Log which database URL is being used (for debugging)
if (isDevelopment && process.env.LOCAL_DATABASE_URL) {
  console.log('Using LOCAL_DATABASE_URL for development');
} else {
  console.log('Using DATABASE_URL for production');
}

// Prisma 7: Use adapter for database connection
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ 
  adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export default prisma;

