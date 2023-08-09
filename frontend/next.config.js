const withImages = require('next-images')
const withTM = require("next-transpile-modules")([
  "react-leaflet",
  "@react-leaflet/core",
]);

module.exports = withTM({
  ...withImages(),
  images: {
    domains: [],
    disableStaticImages: true
  },
  trailingSlash: true,
  future: {
    webpack5: true
  }
});