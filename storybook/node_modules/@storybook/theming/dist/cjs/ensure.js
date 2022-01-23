"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.freeze.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensure = void 0;

require("core-js/modules/es.object.keys.js");

var _clientLogger = require("@storybook/client-logger");

var _deepObjectDiff = require("deep-object-diff");

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _light = _interopRequireDefault(require("./themes/light"));

var _convert = require("./convert");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ensure = function ensure(input) {
  if (!input) {
    return (0, _convert.convert)(_light.default);
  }

  var missing = (0, _deepObjectDiff.deletedDiff)(_light.default, input);

  if (Object.keys(missing).length) {
    _clientLogger.logger.warn((0, _tsDedent.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          Your theme is missing properties, you should update your theme!\n\n          theme-data missing:\n        "]))), missing);
  }

  return (0, _convert.convert)(input);
};

exports.ensure = ensure;