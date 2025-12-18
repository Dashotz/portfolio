import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  // Note: API routes won't work with static export
  // Use Vercel for full functionality including API routes
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  basePath: process.env.GITHUB_PAGES === 'true' ? process.env.BASE_PATH || '' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? process.env.BASE_PATH || '' : '',
  reactStrictMode: true,
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  // Optimize performance
  experimental: {
    optimizePackageImports: [
      '@react-three/drei',
      '@react-three/fiber',
      'gsap',
      'three',
      'lenis',
    ],
    optimizeCss: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'www.chartjs.org',
      },
      {
        protocol: 'https',
        hostname: 'greensock.com',
      },
      {
        protocol: 'https',
        hostname: 'threejs.org',
      },
      {
        protocol: 'https',
        hostname: 'vitejs.dev',
      },
      {
        protocol: 'https',
        hostname: 'react-leaflet.js.org',
      },
    ],
  },
};

export default nextConfig;
