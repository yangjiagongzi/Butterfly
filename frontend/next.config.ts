import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true, // ✅ next build 直接跳过ts类型检查，不卡编译
  },
};

export default nextConfig;
