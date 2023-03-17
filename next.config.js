/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  assetPrefix: isProd ? 'https://irishcollegiateesports.azurewebsites.net/' : undefined,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: isProd ? 'https://irishcollegiateesports.azurewebsites.net/api/:path*' : undefined,
      },
    ]
  },
}

module.exports = nextConfig
