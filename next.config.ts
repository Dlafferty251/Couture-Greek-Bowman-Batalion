import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint errors during `next build`
    ignoreDuringBuilds: true,
  },
  /* your other config options here */
};

export default nextConfig;
