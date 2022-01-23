"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.themes = void 0;

require("core-js/modules/es.object.assign.js");

var _light = _interopRequireDefault(require("./themes/light"));

var _dark = _interopRequireDefault(require("./themes/dark"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This generates theme variables in the correct shape for the UI
var themes = {
  light: _light.default,
  dark: _dark.default,
  normal: _light.default
};
exports.themes = themes;
var preferredColorScheme = (0, _utils.getPreferredColorScheme)();

var create = function create() {
  var vars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    base: preferredColorScheme
  };
  var rest = arguments.length > 1 ? arguments[1] : undefined;
  var inherit = Object.assign({}, themes[preferredColorScheme], themes[vars.base] || {}, vars, {
    base: themes[vars.base] ? vars.base : preferredColorScheme
  });
  return Object.assign({}, rest, inherit, {
    barSelectedColor: vars.barSelectedColor || inherit.colorSecondary
  });
};

exports.create = create;