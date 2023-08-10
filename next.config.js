/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["img.clerk.com", "uploadthing.com"],
  },
};

module.exports = nextConfig;
