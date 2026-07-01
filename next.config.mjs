/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cukup gunakan basePath, hapus assetPrefix
  basePath: '/rizkyfeb',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/rizkyfeb',
  },
};

export default nextConfig;