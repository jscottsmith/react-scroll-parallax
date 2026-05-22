/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const { sidebarHeader } = require('./sidebarHeader');

const sidebars = {
  migrationSidebar: [
    sidebarHeader('Migration Guides'),
    'upgrade-to-v4',
    'upgrade-to-v3',
    'upgrade-to-v2',
  ],
};

module.exports = sidebars;
