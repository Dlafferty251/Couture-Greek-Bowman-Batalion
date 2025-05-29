import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint errors during `next build`
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  /* your other config options here */
};

export default nextConfig;
