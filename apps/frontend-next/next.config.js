const withTM = require('next-transpile-modules')(['ui'])

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   images: {
      domains: ['res.cloudinary.com'],
   },
   swcMinify: true,
}

module.exports = withTM(nextConfig)
