/**
 * Non-interactive sidebar section title (Docusaurus `type: 'html'` item).
 *
 * @param {string} title
 * @returns {import('@docusaurus/plugin-content-docs').SidebarItemConfig}
 */
function sidebarHeader(title) {
  return {
    type: 'html',
    value: title,
    className: 'sidebar-version-title',
    defaultStyle: false,
  };
}

module.exports = { sidebarHeader };
