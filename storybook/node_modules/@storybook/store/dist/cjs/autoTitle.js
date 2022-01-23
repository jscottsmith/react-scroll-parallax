"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.function.name.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoTitle = exports.autoTitleFromSpecifier = void 0;

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.replace.js");

var _startCase = _interopRequireDefault(require("lodash/startCase"));

var _path = _interopRequireDefault(require("path"));

var _slash = _interopRequireDefault(require("slash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var stripExtension = function stripExtension(titleWithExtension) {
  var parts = titleWithExtension.split('/');
  var last = parts[parts.length - 1];
  var dotIndex = last.indexOf('.');
  var stripped = dotIndex > 0 ? last.substr(0, dotIndex) : last;
  parts[parts.length - 1] = stripped;

  var _parts = parts,
      _parts2 = _toArray(_parts),
      first = _parts2[0],
      rest = _parts2.slice(1);

  if (first === '') {
    parts = rest;
  }

  return parts.join('/');
};

var startCaseTitle = function startCaseTitle(title) {
  return title.split('/').map(_startCase.default).join('/');
};

var autoTitleFromSpecifier = function autoTitleFromSpecifier(fileName, entry) {
  var _ref = entry || {},
      directory = _ref.directory,
      importPathMatcher = _ref.importPathMatcher,
      _ref$titlePrefix = _ref.titlePrefix,
      titlePrefix = _ref$titlePrefix === void 0 ? '' : _ref$titlePrefix; // On Windows, backslashes are used in paths, which can cause problems here
  // slash makes sure we always handle paths with unix-style forward slash


  var normalizedFileName = (0, _slash.default)(fileName);

  if (importPathMatcher.exec(normalizedFileName)) {
    var suffix = normalizedFileName.replace(directory, '');
    var titleAndSuffix = (0, _slash.default)(_path.default.join(titlePrefix, suffix));
    return startCaseTitle(stripExtension(titleAndSuffix));
  }

  return undefined;
};

exports.autoTitleFromSpecifier = autoTitleFromSpecifier;

var autoTitle = function autoTitle(fileName, storiesEntries) {
  for (var i = 0; i < storiesEntries.length; i += 1) {
    var title = autoTitleFromSpecifier(fileName, storiesEntries[i]);
    if (title) return title;
  }

  return undefined;
};

exports.autoTitle = autoTitle;