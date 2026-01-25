import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sat-mubhir-files.s3.me-central-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev.mubhir.ai',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
