/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    urlImports: ['https://cdn.skypack.dev'],
  },
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
  typescript: {
    ignoreBuildErrors: true, // for bypassing hash-wasm/lib/WASMInterface.ts type error
  },
}

export default nextConfig
