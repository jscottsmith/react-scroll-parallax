# Storybook Addon PostCSS

The Storybook PostCSS addon can be used to run the PostCSS preprocessor against your stories in [Storybook](https://storybook.js.org).

## Getting Started

Install this addon by adding the `@storybook/addon-postcss` dependency:

```sh
yarn add -D @storybook/addon-postcss
```

within `.storybook/main.js`:

```js
module.exports = {
  addons: ['@storybook/addon-postcss'],
};
```

and create a PostCSS config in the base of your project, like `postcss.config.js`, that contains:

```js
module.exports = {
  // Add your installed PostCSS plugins here:
  plugins: [
    // require('autoprefixer'),
    // require('postcss-color-rebeccapurple'),
  ],
};
```

## PostCSS 8+

If your project requires you to be using PostCSS v8, you can replace the included PostCSS by passing `postcssLoaderOptions` to this addon.

First, you'll need to install PostCSS v8 as a dependency of your project:

```sh
yarn add -D postcss@^8
```

Then, you'll need to update your addons config. Within `.storybook/main.js`:

```diff
module.exports = {
  addons: [
-   '@storybook/addon-postcss',
+   {
+     name: '@storybook/addon-postcss',
+     options: {
+       postcssLoaderOptions: {
+         implementation: require('postcss'),
+       },
+     },
+   },
  ]
}
```

When running Storybook, you'll see the version of PostCSS being used in the logs. For example:

```sh
info => Using PostCSS preset with postcss@8.2.4
```

## Loader Options

You can specify loader options for `style-loader`, `css-loader`, and `postcss-loader` by passing options to this addon as `styleLoaderOptions`, `cssLoaderOptions`, or `postcssLoaderOptions` respectively.

You can also configure the loader rule by overriding the `rule` option.
