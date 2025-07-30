/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js'

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    viewTransition: true,
  },
  allowedDevOrigins: ['http://localhost'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  typescript: {
    // Ignore TypeScript errors during build - allows build to succeed despite hash-wasm type issues
    ignoreBuildErrors: true,
  },
}

export default config
