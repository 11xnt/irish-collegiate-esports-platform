/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  assetPrefix: isProd ? 'https://irishcollegiateesports.azurewebsites.net/' : undefined,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: isProd ? 'https://irishcollegiateesports.azurewebsites.net/:path*' : undefined,
  //     },
  //   ]
  // },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://irishcollegiateesports.azurewebsites.net" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
