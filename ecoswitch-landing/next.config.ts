// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/landing-b", permanent: false },
    ];
  },
};

export default nextConfig;
