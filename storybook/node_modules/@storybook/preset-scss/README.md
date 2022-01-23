# SCSS preset for Storybook

One-line SCSS configuration for storybook.

## Basic usage

```
yarn add -D @storybook/preset-scss css-loader sass-loader style-loader
```

Then add the following to `.storybook/main.js`:

```js
module.exports = {
  addons: ['@storybook/preset-scss'],
};
```

## Advanced usage

You can pass configurations by using Object addon declaration for `@storybook/preset-scss` and adding the configurations under the `option` key. You can pass configurations into the preset's webpack loaders using `styleLoaderOptions`, `cssLoaderOptions`, and `sassLoaderOptions` keys. See documentation for each respective loader to learn about valid options. You can register other addons through the string declaration as normal.

```
module.exports = {
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
           modules: true,
           localIdentName: '[name]__[local]--[hash:base64:5]',
        }
      }
    },
    // You can add other presets/addons by using the string declaration
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
  ]
}
```
