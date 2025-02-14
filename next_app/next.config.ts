import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/video-api/:path*",
        destination: "http://localhost:4000/video-api/:path*",
      },
    ];
  },
};

export default nextConfig;
