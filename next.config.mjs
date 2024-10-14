/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/blog/:path*',
        destination: 'https://neo-blog-backend.vercel.app/api/blog/:path*',
      },
    ]
  },
}

export default nextConfig
