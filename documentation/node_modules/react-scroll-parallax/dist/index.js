
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-scroll-parallax.cjs.production.min.js')
} else {
  module.exports = require('./react-scroll-parallax.cjs.development.js')
}
