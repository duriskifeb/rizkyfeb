/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ini wajib agar hasil build berupa folder statis (out/)
  images: {
    unoptimized: true, // Wajib, karena fitur optimizer Next.js butuh server Node.js
  },
}

module.exports = nextConfig