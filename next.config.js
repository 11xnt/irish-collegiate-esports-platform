/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  assetPrefix: isProd ? 'https://cdn.mydomain.com' : undefined,
}

module.exports = nextConfig
