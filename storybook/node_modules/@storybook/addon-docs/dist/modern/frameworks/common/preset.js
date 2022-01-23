import path from 'path';
import remarkSlug from 'remark-slug';
import remarkExternalLinks from 'remark-external-links'; // @ts-ignore

import { createCompiler } from '@storybook/csf-tools/mdx';

const resolvedBabelLoader = require.resolve('babel-loader', {
  paths: [require.resolve('@storybook/builder-webpack4')] // FIXME!!!

}); // for frameworks that are not working with react, we need to configure
// the jsx to transpile mdx, for now there will be a flag for that
// for more complex solutions we can find alone that we need to add '@babel/plugin-transform-react-jsx'


function createBabelOptions({
  babelOptions,
  mdxBabelOptions,
  configureJSX
}) {
  const babelPlugins = (mdxBabelOptions === null || mdxBabelOptions === void 0 ? void 0 : mdxBabelOptions.plugins) || (babelOptions === null || babelOptions === void 0 ? void 0 : babelOptions.plugins) || [];
  const jsxPlugin = [require.resolve('@babel/plugin-transform-react-jsx'), {
    pragma: 'React.createElement',
    pragmaFrag: 'React.Fragment'
  }];
  const plugins = configureJSX ? [...babelPlugins, jsxPlugin] : babelPlugins;
  return Object.assign({
    // don't use the root babelrc by default (users can override this in mdxBabelOptions)
    babelrc: false,
    configFile: false
  }, babelOptions, mdxBabelOptions, {
    plugins
  });
}

export function webpack(webpackConfig = {}, options = {}) {
  const {
    module = {}
  } = webpackConfig; // it will reuse babel options that are already in use in storybook
  // also, these babel options are chained with other presets.

  const {
    babelOptions,
    mdxBabelOptions,
    configureJSX = true,
    sourceLoaderOptions = {
      injectStoryParameters: true
    },
    transcludeMarkdown = false
  } = options;
  const mdxLoaderOptions = {
    remarkPlugins: [remarkSlug, remarkExternalLinks]
  }; // set `sourceLoaderOptions` to `null` to disable for manual configuration

  const sourceLoader = sourceLoaderOptions ? [{
    test: /\.(stories|story)\.[tj]sx?$/,
    loader: require.resolve('@storybook/source-loader'),
    options: Object.assign({}, sourceLoaderOptions, {
      inspectLocalDependencies: true
    }),
    enforce: 'pre'
  }] : [];
  let rules = module.rules || [];

  if (transcludeMarkdown) {
    rules = [...rules.filter(rule => {
      var _rule$test;

      return ((_rule$test = rule.test) === null || _rule$test === void 0 ? void 0 : _rule$test.toString()) !== '/\\.md$/';
    }), {
      test: /\.md$/,
      use: [{
        loader: resolvedBabelLoader,
        options: createBabelOptions({
          babelOptions,
          mdxBabelOptions,
          configureJSX
        })
      }, {
        loader: require.resolve('@mdx-js/loader'),
        options: mdxLoaderOptions
      }]
    }];
  }

  const result = Object.assign({}, webpackConfig, {
    module: Object.assign({}, module, {
      rules: [...rules, {
        test: /\.js$/,
        include: new RegExp(`node_modules\\${path.sep}acorn-jsx`),
        use: [{
          loader: resolvedBabelLoader,
          options: {
            presets: [[require.resolve('@babel/preset-env'), {
              modules: 'commonjs'
            }]]
          }
        }]
      }, {
        test: /(stories|story)\.mdx$/,
        use: [{
          loader: resolvedBabelLoader,
          options: createBabelOptions({
            babelOptions,
            mdxBabelOptions,
            configureJSX
          })
        }, {
          loader: require.resolve('@mdx-js/loader'),
          options: Object.assign({
            compilers: [createCompiler(options)]
          }, mdxLoaderOptions)
        }]
      }, {
        test: /\.mdx$/,
        exclude: /(stories|story)\.mdx$/,
        use: [{
          loader: resolvedBabelLoader,
          options: createBabelOptions({
            babelOptions,
            mdxBabelOptions,
            configureJSX
          })
        }, {
          loader: require.resolve('@mdx-js/loader'),
          options: mdxLoaderOptions
        }]
      }, ...sourceLoader]
    })
  });
  return result;
}