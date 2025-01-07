import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_DOMEN: process?.env?.NEXT_PUBLIC_API_DOMEN || '',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process?.env?.NEXT_PUBLIC_API_DOMEN || '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
