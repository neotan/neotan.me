/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['utils'],
  experimental: {
    appDir: true
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
