// This generates theme variables in the correct shape for the UI
import lightThemeVars from './themes/light';
import darkThemeVars from './themes/dark';
import { getPreferredColorScheme } from './utils';
export const themes = {
  light: lightThemeVars,
  dark: darkThemeVars,
  normal: lightThemeVars
};
const preferredColorScheme = getPreferredColorScheme();
export const create = (vars = {
  base: preferredColorScheme
}, rest) => {
  const inherit = Object.assign({}, themes[preferredColorScheme], themes[vars.base] || {}, vars, {
    base: themes[vars.base] ? vars.base : preferredColorScheme
  });
  return Object.assign({}, rest, inherit, {
    barSelectedColor: vars.barSelectedColor || inherit.colorSecondary
  });
};