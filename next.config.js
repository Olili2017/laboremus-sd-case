const withImages = require('next-images')

module.exports = withImages({
  webpack(config, _options) {
    return config
  },
})
