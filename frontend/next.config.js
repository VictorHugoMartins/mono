const withImages = require('next-images')
const withTM = require("next-transpile-modules")([
  "react-leaflet",
  "@react-leaflet/core",
]);

module.exports = withTM({
  ...withImages(),
  images: {
    domains: ['scmanager.secondmind.com.br'],
    disableStaticImages: true
  },
  trailingSlash: true,
  future: {
    webpack5: true
  }
});