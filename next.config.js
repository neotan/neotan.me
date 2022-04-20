const withImage = require('next-images')

module.exports = withImage({
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
})
