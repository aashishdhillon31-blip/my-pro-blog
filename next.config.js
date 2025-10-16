/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-strapi-app-name.onrender.com'], // Isko baad mein badalna hai
  },
}

module.exports = nextConfig
