/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimize images
  images: {
    domains: ['localhost', 'gined.in', 'www.gined.in'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Optimize CSS
  experimental: {
    scrollRestoration: true,
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/data': path.resolve(__dirname, 'src/data'),
        '@/images': path.resolve(__dirname, 'src/images'),
      };
    }

    return config;
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ];
  },

  // Compress responses
  compress: true,

  // Generate ETags
  generateEtags: true,

  // Optimize build output
  output: 'standalone',

  // Reduce JavaScript bundle size
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
};

const path = require('path');
module.exports = nextConfig;