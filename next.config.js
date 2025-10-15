/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    domains: ["covers.openlibrary.org"],
  },
};

module.exports = nextConfig;
