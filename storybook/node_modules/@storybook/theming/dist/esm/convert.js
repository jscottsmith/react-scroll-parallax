import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { opacify } from 'polished';
import { background, typography, color } from './base';
import { easing, animation } from './animation';
import { create as createSyntax, chromeLight, chromeDark } from './modules/syntax';
import { getPreferredColorScheme } from './utils';
import { themes } from './create';
var lightSyntaxColors = {
  green1: '#008000',
  red1: '#A31515',
  red2: '#9a050f',
  red3: '#800000',
  red4: '#ff0000',
  gray1: '#393A34',
  cyan1: '#36acaa',
  cyan2: '#2B91AF',
  blue1: '#0000ff',
  blue2: '#00009f'
};
var darkSyntaxColors = {
  green1: '#7C7C7C',
  red1: '#92C379',
  red2: '#9a050f',
  red3: '#A8FF60',
  red4: '#96CBFE',
  gray1: '#EDEDED',
  cyan1: '#C6C5FE',
  cyan2: '#FFFFB6',
  blue1: '#B474DD',
  blue2: '#00009f'
};

var createColors = function createColors(vars) {
  return {
    // Changeable colors
    primary: vars.colorPrimary,
    secondary: vars.colorSecondary,
    tertiary: color.tertiary,
    ancillary: color.ancillary,
    // Complimentary
    orange: color.orange,
    gold: color.gold,
    green: color.green,
    seafoam: color.seafoam,
    purple: color.purple,
    ultraviolet: color.ultraviolet,
    // Monochrome
    lightest: color.lightest,
    lighter: color.lighter,
    light: color.light,
    mediumlight: color.mediumlight,
    medium: color.medium,
    mediumdark: color.mediumdark,
    dark: color.dark,
    darker: color.darker,
    darkest: color.darkest,
    // For borders
    border: color.border,
    // Status
    positive: color.positive,
    negative: color.negative,
    warning: color.warning,
    critical: color.critical,
    defaultText: vars.textColor || color.darkest,
    inverseText: vars.textInverseColor || color.lightest
  };
};

export var convert = function convert() {
  var inherit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : themes[getPreferredColorScheme()];

  var base = inherit.base,
      colorPrimary = inherit.colorPrimary,
      colorSecondary = inherit.colorSecondary,
      appBg = inherit.appBg,
      appContentBg = inherit.appContentBg,
      appBorderColor = inherit.appBorderColor,
      appBorderRadius = inherit.appBorderRadius,
      fontBase = inherit.fontBase,
      fontCode = inherit.fontCode,
      textColor = inherit.textColor,
      textInverseColor = inherit.textInverseColor,
      barTextColor = inherit.barTextColor,
      barSelectedColor = inherit.barSelectedColor,
      barBg = inherit.barBg,
      inputBg = inherit.inputBg,
      inputBorder = inherit.inputBorder,
      inputTextColor = inherit.inputTextColor,
      inputBorderRadius = inherit.inputBorderRadius,
      brandTitle = inherit.brandTitle,
      brandUrl = inherit.brandUrl,
      brandImage = inherit.brandImage,
      gridCellSize = inherit.gridCellSize,
      rest = _objectWithoutProperties(inherit, ["base", "colorPrimary", "colorSecondary", "appBg", "appContentBg", "appBorderColor", "appBorderRadius", "fontBase", "fontCode", "textColor", "textInverseColor", "barTextColor", "barSelectedColor", "barBg", "inputBg", "inputBorder", "inputTextColor", "inputBorderRadius", "brandTitle", "brandUrl", "brandImage", "gridCellSize"]);

  return Object.assign({}, rest || {}, {
    base: base,
    color: createColors(inherit),
    background: {
      app: appBg,
      bar: barBg,
      content: appContentBg,
      gridCellSize: gridCellSize || background.gridCellSize,
      hoverable: background.hoverable,
      positive: background.positive,
      negative: background.negative,
      warning: background.warning,
      critical: background.critical
    },
    typography: {
      fonts: {
        base: fontBase,
        mono: fontCode
      },
      weight: typography.weight,
      size: typography.size
    },
    animation: animation,
    easing: easing,
    input: {
      border: inputBorder,
      background: inputBg,
      color: inputTextColor,
      borderRadius: inputBorderRadius
    },
    // UI
    layoutMargin: 10,
    appBorderColor: appBorderColor,
    appBorderRadius: appBorderRadius,
    // Toolbar default/active colors
    barTextColor: barTextColor,
    barSelectedColor: barSelectedColor || colorSecondary,
    barBg: barBg,
    // Brand logo/text
    brand: {
      title: brandTitle,
      url: brandUrl,
      image: brandImage || (brandTitle ? null : undefined)
    },
    code: createSyntax({
      colors: base === 'light' ? lightSyntaxColors : darkSyntaxColors,
      mono: fontCode
    }),
    // Addon actions theme
    // API example https://github.com/xyc/react-inspector/blob/master/src/styles/themes/chromeLight.js
    addonActionsTheme: Object.assign({}, base === 'light' ? chromeLight : chromeDark, {
      BASE_FONT_FAMILY: fontCode,
      BASE_FONT_SIZE: typography.size.s2 - 1,
      BASE_LINE_HEIGHT: '18px',
      BASE_BACKGROUND_COLOR: 'transparent',
      BASE_COLOR: textColor,
      ARROW_COLOR: opacify(0.2, appBorderColor),
      ARROW_MARGIN_RIGHT: 4,
      ARROW_FONT_SIZE: 8,
      TREENODE_FONT_FAMILY: fontCode,
      TREENODE_FONT_SIZE: typography.size.s2 - 1,
      TREENODE_LINE_HEIGHT: '18px',
      TREENODE_PADDING_LEFT: 12
    })
  });
};