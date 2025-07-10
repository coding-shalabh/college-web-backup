const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // DISABLE image optimization to prevent 400 errors (matches server config)
  images: {
    unoptimized: true,
    domains: ['localhost', 'gined.in', 'www.gined.in'],
    dangerouslyAllowSVG: true,
  },

  // Optimize CSS
  experimental: {
    scrollRestoration: true,
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Set up aliases for all build scenarios
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/data': path.resolve(__dirname, 'src/data'),
      '@/images': path.resolve(__dirname, 'public/images'),
      '@/src': path.resolve(__dirname, 'src'),
    };

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
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },

  // Compress responses
  compress: true,

  // Generate ETags
  generateEtags: true,

  // Optimize build output for VPS deployment
  output: 'standalone',

  // Reduce JavaScript bundle size
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },

  // Add proper trailing slash handling
  trailingSlash: false,

  // Disable x-powered-by header
  poweredByHeader: false,
};

module.exports = nextConfig;