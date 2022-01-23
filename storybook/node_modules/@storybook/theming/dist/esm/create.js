import "core-js/modules/es.object.assign.js";
// This generates theme variables in the correct shape for the UI
import lightThemeVars from './themes/light';
import darkThemeVars from './themes/dark';
import { getPreferredColorScheme } from './utils';
export var themes = {
  light: lightThemeVars,
  dark: darkThemeVars,
  normal: lightThemeVars
};
var preferredColorScheme = getPreferredColorScheme();
export var create = function create() {
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