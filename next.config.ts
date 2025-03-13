import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true
      }
    ];
  },
  experimental: {
    nodeMiddleware: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        pathname: '/600x400/**'
      },
      {
        protocol: "https",
        hostname: "cmotqldfmxiwnbjyksmg.supabase.co",
        pathname: "/storage/v1/object/public/uploads/**",
      },
      {
        protocol: "https",
        hostname: "optim.tildacdn.pub",
        pathname: "/**"
      }
    ],
  },
};

export default nextConfig;
