import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "media2.dev.to"], // Domain ảnh từ Dev.to
  },
};

export default nextConfig;
