import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for simple deployment */
  output: 'export',

  images: {
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Required for static export
  },

  /* Trailing slashes for clean URLs */
  trailingSlash: true,
};

export default nextConfig;
