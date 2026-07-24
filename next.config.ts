import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phones and other devices on the local network to load the
  // development runtime and hydrate Client Components.
  allowedDevOrigins: ['192.168.1.19'],
};

export default nextConfig;
