/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["img.clerk.com", "uploadthing.com", "images.clerk.dev"],
  },
};

module.exports = nextConfig;
