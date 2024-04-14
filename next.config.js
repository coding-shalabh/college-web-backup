/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  eslint: {
    // Ignore ESLint warnings during production builds
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;