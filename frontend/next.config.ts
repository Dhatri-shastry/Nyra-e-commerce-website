// frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      // Add more hosts later if needed (e.g., your Firebase Storage, Cloudinary, etc.)
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nyrafashion.in',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;