"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addons = addons;

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.filter.js");

var _path = _interopRequireWildcard(require("path"));

var _nodeLogger = require("@storybook/node-logger");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var requireMain = function requireMain(configDir) {
  var main = {};
  var absoluteConfigDir = _path.default.isAbsolute(configDir) ? configDir : _path.default.join(process.cwd(), configDir);

  var mainFile = _path.default.join(absoluteConfigDir, 'main');

  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    main = require(mainFile);
  } catch (err) {
    _nodeLogger.logger.warn("Unable to find main.js: ".concat(mainFile));
  }

  return main;
};

function addons() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var checkInstalled = function checkInstalled(addon, main) {
    var _main$addons;

    var existingAddon = (_main$addons = main.addons) === null || _main$addons === void 0 ? void 0 : _main$addons.find(function (entry) {
      var name = typeof entry === 'string' ? entry : entry.name;
      return name === null || name === void 0 ? void 0 : name.startsWith(addon);
    });

    if (existingAddon) {
      _nodeLogger.logger.info("Found existing addon ".concat(JSON.stringify(existingAddon), ", skipping."));
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
      return require.resolve((0, _path.join)(addon, 'preset')); // eslint-disable-next-line no-empty
    } catch (err) {}

    try {
      return require.resolve((0, _path.join)(addon, 'register')); // eslint-disable-next-line no-empty
    } catch (err) {}

    return require.resolve(addon);
  });
}