import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize bundle — tree-shake large packages
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  // Enable compression
  compress: true,
  // Powered by header removal for security
  poweredByHeader: false,
  // Strict mode for catching bugs early
  reactStrictMode: true,
};

export default nextConfig;
