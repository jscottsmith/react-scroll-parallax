import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.assign.js";
export function webpackFinal() {
  var _options$presetsList;

  var webpackConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 ? arguments[1] : undefined;
  var vueDocgenOptions = {};
  (_options$presetsList = options.presetsList) === null || _options$presetsList === void 0 ? void 0 : _options$presetsList.forEach(function (preset) {
    if (preset.name.includes('addon-docs') && preset.options.vueDocgenOptions) {
      var appendableOptions = preset.options.vueDocgenOptions;
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