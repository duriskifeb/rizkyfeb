await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.hashnode.com',
      },
    ],
  },
};

export default config;
