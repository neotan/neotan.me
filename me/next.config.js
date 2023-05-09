/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['utils'],
  images: {
    domains: [
      'raw.githubusercontent.com',
    ],
  },
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
}
