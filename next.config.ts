import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 75],
    //   remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'localhost',
    //     port: '3000',
    //     pathname: '/uploads-hotels/**', // acepta ** para cualquier subruta
    //   },
    // ],
    // domains: ['localhost'],
  },

  async rewrites() {
    return [
      {
        source: '/uploads-hotels/:path*',
        destination: `${process.env.API_BASE_URL}/uploads-hotels/:path*`,
      },
      {
        source: '/uploads/avatars/:path*',
        destination: `${process.env.API_BASE_URL}/uploads/avatars/:path*`,
      },
    ]
  },
  allowedDevOrigins: ['http://192.168.0.2']
};

export default nextConfig;
