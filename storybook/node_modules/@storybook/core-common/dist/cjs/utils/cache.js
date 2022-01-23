"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cache = void 0;

var _fileSystemCache = _interopRequireDefault(require("file-system-cache"));

var _resolvePathInSbCache = require("./resolve-path-in-sb-cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = (0, _fileSystemCache.default)({
  basePath: (0, _resolvePathInSbCache.resolvePathInStorybookCache)('dev-server'),
  ns: 'storybook' // Optional. A grouping namespace for items.

});
exports.cache = cache;