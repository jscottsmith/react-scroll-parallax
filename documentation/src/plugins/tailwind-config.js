const path = require('path');

/** @param {import('@docusaurus/types').LoadContext} context */
module.exports = function tailwindPostCssPlugin(context) {
  const tailwindConfigPath = path.join(context.siteDir, 'tailwind.config.js');

  return {
    name: 'docusaurus-tailwind-postcss',
    configurePostCss(postcssOptions) {
      const tailwindcss = require('tailwindcss');
      const autoprefixer = require('autoprefixer');

      const plugins = postcssOptions.plugins ?? [];

      const withoutTailwind = plugins.filter((plugin) => {
        if (typeof plugin === 'function') {
          return plugin.postcssPlugin !== 'tailwindcss';
        }
        if (Array.isArray(plugin)) {
          const pluginPath = String(plugin[0] ?? '');
          return !pluginPath.includes('tailwindcss');
        }
        return true;
      });

      postcssOptions.plugins = [
        tailwindcss({ config: tailwindConfigPath }),
        autoprefixer(),
        ...withoutTailwind,
      ];

      return postcssOptions;
    },
  };
};
