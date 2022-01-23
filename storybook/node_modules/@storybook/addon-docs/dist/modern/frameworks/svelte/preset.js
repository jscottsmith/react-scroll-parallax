import path from 'path';
export async function webpackFinal(webpackConfig, options) {
  const svelteOptions = await options.presets.apply('svelteOptions', {}, options);
  webpackConfig.module.rules.push({
    test: /\.svelte$/,
    loader: path.resolve(`${__dirname}/svelte-docgen-loader`),
    enforce: 'post',
    options: svelteOptions
  });
  return webpackConfig;
}