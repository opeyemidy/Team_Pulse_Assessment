import { execSync } from 'child_process';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

if (process.env.NODE_ENV === 'production') {
  execSync('npx prisma generate', { stdio: 'inherit' });
}

export default nextConfig;
