/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['utils'],
  images: {
    domains: ['res.cloudinary.com', 'raw.githubusercontent.com'],
  },
}
