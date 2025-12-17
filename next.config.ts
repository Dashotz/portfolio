import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  experimental: {
    optimizePackageImports: [
      '@react-three/drei',
      '@react-three/fiber',
      'gsap',
      'three',
      'lenis',
    ],
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
