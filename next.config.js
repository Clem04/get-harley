/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'loremflickr.com', 
      'picsum.photos', 
      'tailwindui.com', 
      'images.unsplash.com'
    ],
  },
}

module.exports = nextConfig
