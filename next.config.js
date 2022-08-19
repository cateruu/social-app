/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.pinimg.com',
      's.gravatar.com',
      'firebasestorage.googleapis.com',
    ],
  },
};

module.exports = nextConfig;
