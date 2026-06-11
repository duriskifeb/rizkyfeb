await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'cdn.hashnode.com',
      },
    ],
  },
};

export default config;
