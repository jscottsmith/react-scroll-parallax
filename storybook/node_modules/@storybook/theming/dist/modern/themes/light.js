import { color, typography, background } from '../base';
const theme = {
  base: 'light',
  // Storybook-specific color palette
  colorPrimary: '#FF4785',
  // coral
  colorSecondary: '#1EA7FD',
  // ocean
  // UI
  appBg: background.app,
  appContentBg: color.lightest,
  appBorderColor: color.border,
  appBorderRadius: 4,
  // Fonts
  fontBase: typography.fonts.base,
  fontCode: typography.fonts.mono,
  // Text colors
  textColor: color.darkest,
  textInverseColor: color.lightest,
  textMutedColor: color.dark,
  // Toolbar default and active colors
  barTextColor: color.mediumdark,
  barSelectedColor: color.secondary,
  barBg: color.lightest,
  // Form colors
  inputBg: color.lightest,
  inputBorder: color.border,
  inputTextColor: color.darkest,
  inputBorderRadius: 4
};
export default theme;