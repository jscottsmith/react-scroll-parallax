import webpack, { ProgressPlugin } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import { logger } from '@storybook/node-logger';
import { useProgressReporting, checkWebpackVersion } from '@storybook/core-common';
import findUp from 'find-up';
import fs from 'fs-extra';
import express from 'express';
import { getManagerWebpackConfig } from './manager-config';
import { clearManagerCache, useManagerCache } from './utils/manager-cache';
import { getPrebuiltDir } from './utils/prebuilt-manager';
let compilation;
let reject;
export const WEBPACK_VERSION = '4';
export const getConfig = getManagerWebpackConfig;
export const makeStatsFromError = err => ({
  hasErrors: () => true,
  hasWarnings: () => false,
  toJson: () => ({
    warnings: [],
    errors: [err]
  })
});
export const executor = {
  get: async options => {
    var _await$options$preset;

    const version = (await options.presets.apply('webpackVersion')) || WEBPACK_VERSION;
    const webpackInstance = ((_await$options$preset = await options.presets.apply('webpackInstance')) === null || _await$options$preset === void 0 ? void 0 : _await$options$preset.default) || webpack;
    checkWebpackVersion({
      version
    }, WEBPACK_VERSION, `manager-webpack${WEBPACK_VERSION}`);
    return webpackInstance;
  }
};
export const start = async ({
  startTime,
  options,
  router
}) => {
  var _config$output;

  const prebuiltDir = await getPrebuiltDir(options);

  if (prebuiltDir && options.managerCache && !options.smokeTest) {
    logger.info('=> Using prebuilt manager');
    router.use('/', express.static(prebuiltDir));
    return;
  }

  const config = await getConfig(options);

  if (options.cache) {
    // Retrieve the Storybook version number to bust cache on upgrades.
    const packageFile = await findUp('package.json', {
      cwd: __dirname
    });
    const {
      version: storybookVersion
    } = await fs.readJSON(packageFile);
    const cacheKey = `managerConfig-webpack${WEBPACK_VERSION}@${storybookVersion}`;

    if (options.managerCache) {
      const [useCache, hasOutput] = await Promise.all([// useManagerCache sets the cache, so it must run even if outputDir doesn't exist yet,
      // otherwise the 2nd run won't be able to use the manager built on the 1st run.
      useManagerCache(cacheKey, options, config), fs.pathExists(options.outputDir)]);

      if (useCache && hasOutput && !options.smokeTest) {
        logger.line(1); // force starting new line

        logger.info('=> Using cached manager');
        router.use('/', express.static(options.outputDir));
        return;
      }
    } else if (!options.smokeTest && (await clearManagerCache(cacheKey, options))) {
      logger.line(1); // force starting new line

      logger.info('=> Cleared cached manager config');
    }
  }

  const webpackInstance = await executor.get(options);
  const compiler = webpackInstance(config);

  if (!compiler) {
    const err = `${config.name}: missing webpack compiler at runtime!`;
    logger.error(err); // eslint-disable-next-line consistent-return

    return {
      bail,
      totalTime: process.hrtime(startTime),
      stats: makeStatsFromError(err)
    };
  }

  const {
    handler,
    modulesCount
  } = await useProgressReporting(router, startTime, options);
  new ProgressPlugin({
    handler,
    modulesCount
  }).apply(compiler);
  const middlewareOptions = {
    publicPath: (_config$output = config.output) === null || _config$output === void 0 ? void 0 : _config$output.publicPath,
    writeToDisk: true,
    watchOptions: config.watchOptions || {}
  };
  compilation = webpackDevMiddleware(compiler, middlewareOptions);
  router.use(compilation);
  const stats = await new Promise((ready, stop) => {
    compilation.waitUntilValid(ready);
    reject = stop;
  });

  if (!stats) {
    throw new Error('no stats after building preview');
  } // eslint-disable-next-line consistent-return


  return {
    bail,
    stats,
    totalTime: process.hrtime(startTime)
  };
};
export const bail = e => {
  if (reject) {
    reject();
  }

  if (process) {
    try {
      compilation.close();
      logger.warn('Force closed preview build');
    } catch (err) {
      logger.warn('Unable to close preview build!');
    }
  }

  throw e;
};
export const build = async ({
  options,
  startTime
}) => {
  logger.info('=> Compiling manager..');
  const webpackInstance = await executor.get(options);
  const config = await getConfig(options);
  const statsOptions = typeof config.stats === 'boolean' ? 'minimal' : config.stats;
  const compiler = webpackInstance(config);

  if (!compiler) {
    const err = `${config.name}: missing webpack compiler at runtime!`;
    logger.error(err);
    return Promise.resolve(makeStatsFromError(err));
  }

  return new Promise((succeed, fail) => {
    compiler.run((error, stats) => {
      if (error || !stats || stats.hasErrors()) {
        logger.error('=> Failed to build the manager');

        if (error) {
          logger.error(error.message);
        }

        if (stats && (stats.hasErrors() || stats.hasWarnings())) {
          const {
            warnings,
            errors
          } = stats.toJson(statsOptions);
          errors.forEach(e => logger.error(e));
          warnings.forEach(e => logger.error(e));
        }

        process.exitCode = 1;
        fail(error || stats);
      } else {
        var _statsData$warnings;

        logger.trace({
          message: '=> Manager built',
          time: process.hrtime(startTime)
        });
        const statsData = stats.toJson(typeof statsOptions === 'string' ? statsOptions : Object.assign({}, statsOptions, {
          warnings: true
        }));
        statsData === null || statsData === void 0 ? void 0 : (_statsData$warnings = statsData.warnings) === null || _statsData$warnings === void 0 ? void 0 : _statsData$warnings.forEach(e => logger.warn(e));
        succeed(stats);
      }
    });
  });
};
export const corePresets = [require.resolve('./presets/manager-preset')];
export const overridePresets = [];