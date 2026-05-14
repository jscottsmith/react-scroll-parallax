const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/preset-scss',
      options: {
        rule: {
          test: /\.module\.s[ca]ss$/,
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
    },
    '@storybook/addon-docs',
  ],
  typescript: {
    check: false,
    reactDocgen: false,
  },
  viteFinal: async (config) => {
    const dirname = __dirname;
    const storyAliases = [
      {
        find: /^scroll-parallax$/,
        replacement: path.resolve(
          dirname,
          '../../../packages/scroll-parallax/src/index.ts'
        ),
      },
      {
        find: 'react-scroll-parallax',
        replacement: path.resolve(
          dirname,
          '../../../packages/react-scroll-parallax/src/index.ts'
        ),
      },
    ];
    config.resolve = config.resolve || {};
    const raw = config.resolve.alias;
    if (Array.isArray(raw)) {
      config.resolve.alias = [...storyAliases, ...raw];
    } else {
      config.resolve.alias = [
        ...storyAliases,
        ...Object.entries(raw || {}).map(([find, replacement]) => ({
          find,
          replacement,
        })),
      ];
    }
    return config;
  },
};
