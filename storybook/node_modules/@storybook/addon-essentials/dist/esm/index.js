import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.filter.js";
import path, { join } from 'path';
import { logger } from '@storybook/node-logger';

var requireMain = function requireMain(configDir) {
  var main = {};
  var absoluteConfigDir = path.isAbsolute(configDir) ? configDir : path.join(process.cwd(), configDir);
  var mainFile = path.join(absoluteConfigDir, 'main');

  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    main = require(mainFile);
  } catch (err) {
    logger.warn("Unable to find main.js: ".concat(mainFile));
  }

  return main;
};

export function addons() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var checkInstalled = function checkInstalled(addon, main) {
    var _main$addons;

    var existingAddon = (_main$addons = main.addons) === null || _main$addons === void 0 ? void 0 : _main$addons.find(function (entry) {
      var name = typeof entry === 'string' ? entry : entry.name;
      return name === null || name === void 0 ? void 0 : name.startsWith(addon);
    });

    if (existingAddon) {
      logger.info("Found existing addon ".concat(JSON.stringify(existingAddon), ", skipping."));
    }

    return !!existingAddon;
  };

  var main = requireMain(options.configDir);
  return ['docs', 'controls', 'actions', 'backgrounds', 'viewport', 'toolbars', 'measure', 'outline'].filter(function (key) {
    return options[key] !== false;
  }).map(function (key) {
    return "@storybook/addon-".concat(key);
  }).filter(function (addon) {
    return !checkInstalled(addon, main);
  }) // Use `require.resolve` to ensure Yarn PnP compatibility
  // Files of various addons should be resolved in the context of `addon-essentials` as they are listed as deps here
  // and not in `@storybook/core` nor in SB user projects. If `@storybook/core` make the require itself Yarn 2 will
  // throw an error saying that the package to require must be added as a dependency. Doing `require.resolve` will
  // allow `@storybook/core` to work with absolute path directly, no more require of dep no more issue.
  // File to load can be `preset.js`, `register.js`, or the package entry point, so we need to check all these cases
  // as it's done in `lib/core/src/server/presets.js`.
  .map(function (addon) {
    try {
      return require.resolve(join(addon, 'preset')); // eslint-disable-next-line no-empty
    } catch (err) {}

    try {
      return require.resolve(join(addon, 'register')); // eslint-disable-next-line no-empty
    } catch (err) {}

    return require.resolve(addon);
  });
}