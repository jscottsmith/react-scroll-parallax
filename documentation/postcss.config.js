// Tailwind is wired through the Docusaurus plugin at
// src/plugins/tailwind-config.js (configurePostCss).
// Keep autoprefixer here for any PostCSS passes that load this file directly.
const path = require('path');

module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
