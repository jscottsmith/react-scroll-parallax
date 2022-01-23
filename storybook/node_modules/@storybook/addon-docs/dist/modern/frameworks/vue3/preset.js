export function webpackFinal(webpackConfig = {}, options) {
  var _options$presetsList;

  let vueDocgenOptions = {};
  (_options$presetsList = options.presetsList) === null || _options$presetsList === void 0 ? void 0 : _options$presetsList.forEach(preset => {
    if (preset.name.includes('addon-docs') && preset.options.vueDocgenOptions) {
      const appendableOptions = preset.options.vueDocgenOptions;
      vueDocgenOptions = Object.assign({}, vueDocgenOptions, appendableOptions);
    }
  });
  webpackConfig.module.rules.push({
    test: /\.vue$/,
    loader: require.resolve('vue-docgen-loader', {
      paths: [require.resolve('@storybook/vue3')]
    }),
    enforce: 'post',
    options: {
      docgenOptions: Object.assign({
        alias: webpackConfig.resolve.alias
      }, vueDocgenOptions)
    }
  });
  return webpackConfig;
}