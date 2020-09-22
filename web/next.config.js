const withImages = require('next-images')

module.exports = withImages({
  webpack: (config, { webpack, dev, isServer }) => config
  ,
})
