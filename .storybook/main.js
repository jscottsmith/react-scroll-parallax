module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
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
    '@storybook/addon-docs'
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: false, // Disable type-checking to avoid build issues
    reactDocgen: false, // Disable to fix TypeScript 5.9.2 compatibility issue
  },
  viteFinal: async (config) => {
    // Vite handles CSS modules natively, no additional configuration needed
    return config;
  },
};
