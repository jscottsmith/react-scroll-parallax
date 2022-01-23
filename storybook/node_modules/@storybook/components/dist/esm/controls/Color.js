import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";

var _ColorPicker, _fallbackColor;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.function.name.js";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { HexColorPicker, HslaStringColorPicker, RgbaStringColorPicker } from 'react-colorful';
import convert from 'color-convert';
import throttle from 'lodash/throttle';
import { styled } from '@storybook/theming';
import { TooltipNote } from '../tooltip/TooltipNote';
import { WithTooltip } from '../tooltip/lazy-WithTooltip';
import { Form } from '../form';
import { Icons } from '../icon/icon';
import { getControlId } from './helpers';
var Wrapper = styled.div({
  position: 'relative',
  maxWidth: 250
});
var PickerTooltip = styled(WithTooltip)({
  position: 'absolute',
  zIndex: 1,
  top: 4,
  left: 4
});
var TooltipContent = styled.div({
  width: 200,
  margin: 5,
  '.react-colorful__saturation': {
    borderRadius: '4px 4px 0 0'
  },
  '.react-colorful__hue': {
    boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 5%)'
  },
  '.react-colorful__last-control': {
    borderRadius: '0 0 4px 4px'
  }
});
var Note = styled(TooltipNote)(function (_ref) {
  var theme = _ref.theme;
  return {
    fontFamily: theme.typography.fonts.base
  };
});
var Swatches = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(9, 16px)',
  gap: 6,
  padding: 3,
  marginTop: 5,
  width: 200
});
var SwatchColor = styled.div(function (_ref2) {
  var theme = _ref2.theme,
      active = _ref2.active;
  return {
    width: 16,
    height: 16,
    boxShadow: active ? "".concat(theme.appBorderColor, " 0 0 0 1px inset, ").concat(theme.color.mediumdark, "50 0 0 0 4px") : "".concat(theme.appBorderColor, " 0 0 0 1px inset"),
    borderRadius: theme.appBorderRadius
  };
});
var swatchBackground = "url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill-opacity=\".05\"><path d=\"M8 0h8v8H8zM0 8h8v8H0z\"/></svg>')";

var Swatch = function Swatch(_ref3) {
  var value = _ref3.value,
      active = _ref3.active,
      onClick = _ref3.onClick,
      style = _ref3.style,
      props = _objectWithoutProperties(_ref3, ["value", "active", "onClick", "style"]);

  var backgroundImage = "linear-gradient(".concat(value, ", ").concat(value, "), ").concat(swatchBackground, ", linear-gradient(#fff, #fff)");
  return /*#__PURE__*/React.createElement(SwatchColor, _extends({}, props, {
    active: active,
    onClick: onClick,
    style: Object.assign({}, style, {
      backgroundImage: backgroundImage
    })
  }));
};

Swatch.displayName = "Swatch";
var Input = styled(Form.Input)(function (_ref4) {
  var theme = _ref4.theme;
  return {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    boxSizing: 'border-box',
    fontFamily: theme.typography.fonts.base
  };
});
var ToggleIcon = styled(Icons)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    position: 'absolute',
    zIndex: 1,
    top: 6,
    right: 7,
    width: 20,
    height: 20,
    padding: 4,
    boxSizing: 'border-box',
    cursor: 'pointer',
    color: theme.input.color
  };
});
var ColorSpace;

(function (ColorSpace) {
  ColorSpace["RGB"] = "rgb";
  ColorSpace["HSL"] = "hsl";
  ColorSpace["HEX"] = "hex";
})(ColorSpace || (ColorSpace = {}));

var COLOR_SPACES = Object.values(ColorSpace);
var COLOR_REGEXP = /\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/;
var RGB_REGEXP = /^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i;
var HSL_REGEXP = /^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i;
var HEX_REGEXP = /^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i;
var SHORTHEX_REGEXP = /^\s*#?([0-9a-f]{3})\s*$/i;
var ColorPicker = (_ColorPicker = {}, _defineProperty(_ColorPicker, ColorSpace.HEX, HexColorPicker), _defineProperty(_ColorPicker, ColorSpace.RGB, RgbaStringColorPicker), _defineProperty(_ColorPicker, ColorSpace.HSL, HslaStringColorPicker), _ColorPicker);
var fallbackColor = (_fallbackColor = {}, _defineProperty(_fallbackColor, ColorSpace.HEX, 'transparent'), _defineProperty(_fallbackColor, ColorSpace.RGB, 'rgba(0, 0, 0, 0)'), _defineProperty(_fallbackColor, ColorSpace.HSL, 'hsla(0, 0%, 0%, 0)'), _fallbackColor);

var stringToArgs = function stringToArgs(value) {
  var match = value === null || value === void 0 ? void 0 : value.match(COLOR_REGEXP);
  if (!match) return [0, 0, 0, 1];

  var _match = _slicedToArray(match, 5),
      x = _match[1],
      y = _match[2],
      z = _match[3],
      _match$ = _match[4],
      a = _match$ === void 0 ? 1 : _match$;

  return [x, y, z, a].map(Number);
};

var parseValue = function parseValue(value) {
  var _ref12;

  if (!value) return undefined;
  var valid = true;

  if (RGB_REGEXP.test(value)) {
    var _ref8;

    var _stringToArgs = stringToArgs(value),
        _stringToArgs2 = _slicedToArray(_stringToArgs, 4),
        r = _stringToArgs2[0],
        g = _stringToArgs2[1],
        b = _stringToArgs2[2],
        a = _stringToArgs2[3];

    var _ref6 = convert.rgb.hsl([r, g, b]) || [0, 0, 0],
        _ref7 = _slicedToArray(_ref6, 3),
        h = _ref7[0],
        s = _ref7[1],
        l = _ref7[2];

    return _ref8 = {
      valid: valid,
      value: value,
      keyword: convert.rgb.keyword([r, g, b]),
      colorSpace: ColorSpace.RGB
    }, _defineProperty(_ref8, ColorSpace.RGB, value), _defineProperty(_ref8, ColorSpace.HSL, "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(a, ")")), _defineProperty(_ref8, ColorSpace.HEX, "#".concat(convert.rgb.hex([r, g, b]).toLowerCase())), _ref8;
  }

  if (HSL_REGEXP.test(value)) {
    var _ref11;

    var _stringToArgs3 = stringToArgs(value),
        _stringToArgs4 = _slicedToArray(_stringToArgs3, 4),
        _h = _stringToArgs4[0],
        _s2 = _stringToArgs4[1],
        _l = _stringToArgs4[2],
        _a = _stringToArgs4[3];

    var _ref9 = convert.hsl.rgb([_h, _s2, _l]) || [0, 0, 0],
        _ref10 = _slicedToArray(_ref9, 3),
        _r = _ref10[0],
        _g = _ref10[1],
        _b = _ref10[2];

    return _ref11 = {
      valid: valid,
      value: value,
      keyword: convert.hsl.keyword([_h, _s2, _l]),
      colorSpace: ColorSpace.HSL
    }, _defineProperty(_ref11, ColorSpace.RGB, "rgba(".concat(_r, ", ").concat(_g, ", ").concat(_b, ", ").concat(_a, ")")), _defineProperty(_ref11, ColorSpace.HSL, value), _defineProperty(_ref11, ColorSpace.HEX, "#".concat(convert.hsl.hex([_h, _s2, _l]).toLowerCase())), _ref11;
  }

  var plain = value.replace('#', '');
  var rgb = convert.keyword.rgb(plain) || convert.hex.rgb(plain);
  var hsl = convert.rgb.hsl(rgb);
  var mapped = value;
  if (/[^#a-f0-9]/i.test(value)) mapped = plain;else if (HEX_REGEXP.test(value)) mapped = "#".concat(plain);

  if (mapped.startsWith('#')) {
    valid = HEX_REGEXP.test(mapped);
  } else {
    try {
      convert.keyword.hex(mapped);
    } catch (e) {
      valid = false;
    }
  }

  return _ref12 = {
    valid: valid,
    value: mapped,
    keyword: convert.rgb.keyword(rgb),
    colorSpace: ColorSpace.HEX
  }, _defineProperty(_ref12, ColorSpace.RGB, "rgba(".concat(rgb[0], ", ").concat(rgb[1], ", ").concat(rgb[2], ", 1)")), _defineProperty(_ref12, ColorSpace.HSL, "hsla(".concat(hsl[0], ", ").concat(hsl[1], "%, ").concat(hsl[2], "%, 1)")), _defineProperty(_ref12, ColorSpace.HEX, mapped), _ref12;
};

var getRealValue = function getRealValue(value, color, colorSpace) {
  if (!value || !(color !== null && color !== void 0 && color.valid)) return fallbackColor[colorSpace];
  if (colorSpace !== ColorSpace.HEX) return (color === null || color === void 0 ? void 0 : color[colorSpace]) || fallbackColor[colorSpace];

  if (!color.hex.startsWith('#')) {
    try {
      return "#".concat(convert.keyword.hex(color.hex));
    } catch (e) {
      return fallbackColor.hex;
    }
  }

  var short = color.hex.match(SHORTHEX_REGEXP);
  if (!short) return HEX_REGEXP.test(color.hex) ? color.hex : fallbackColor.hex;

  var _short$1$split = short[1].split(''),
      _short$1$split2 = _slicedToArray(_short$1$split, 3),
      r = _short$1$split2[0],
      g = _short$1$split2[1],
      b = _short$1$split2[2];

  return "#".concat(r).concat(r).concat(g).concat(g).concat(b).concat(b);
};

var useColorInput = function useColorInput(initialValue, onChange) {
  var _useState = useState(initialValue || ''),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(function () {
    return parseValue(value);
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      color = _useState4[0],
      setColor = _useState4[1];

  var _useState5 = useState((color === null || color === void 0 ? void 0 : color.colorSpace) || ColorSpace.HEX),
      _useState6 = _slicedToArray(_useState5, 2),
      colorSpace = _useState6[0],
      setColorSpace = _useState6[1]; // Reset state when initialValue becomes undefined (when resetting controls)


  useEffect(function () {
    if (initialValue !== undefined) return;
    setValue('');
    setColor(undefined);
    setColorSpace(ColorSpace.HEX);
  }, [initialValue]);
  var realValue = useMemo(function () {
    return getRealValue(value, color, colorSpace).toLowerCase();
  }, [value, color, colorSpace]);
  var updateValue = useCallback(function (update) {
    var parsed = parseValue(update);
    setValue((parsed === null || parsed === void 0 ? void 0 : parsed.value) || update || '');
    if (!parsed) return;
    setColor(parsed);
    setColorSpace(parsed.colorSpace);
    onChange(parsed.value);
  }, [onChange]);
  var cycleColorSpace = useCallback(function () {
    var next = COLOR_SPACES.indexOf(colorSpace) + 1;
    if (next >= COLOR_SPACES.length) next = 0;
    setColorSpace(COLOR_SPACES[next]);
    var update = (color === null || color === void 0 ? void 0 : color[COLOR_SPACES[next]]) || '';
    setValue(update);
    onChange(update);
  }, [color, colorSpace, onChange]);
  return {
    value: value,
    realValue: realValue,
    updateValue: updateValue,
    color: color,
    colorSpace: colorSpace,
    cycleColorSpace: cycleColorSpace
  };
};

var id = function id(value) {
  return value.replace(/\s*/, '').toLowerCase();
};

var usePresets = function usePresets(presetColors, currentColor, colorSpace) {
  var _useState7 = useState(currentColor !== null && currentColor !== void 0 && currentColor.valid ? [currentColor] : []),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedColors = _useState8[0],
      setSelectedColors = _useState8[1]; // Reset state when currentColor becomes undefined (when resetting controls)


  useEffect(function () {
    if (currentColor !== undefined) return;
    setSelectedColors([]);
  }, [currentColor]);
  var presets = useMemo(function () {
    var initialPresets = (presetColors || []).map(function (preset) {
      if (typeof preset === 'string') return parseValue(preset);
      if (preset.title) return Object.assign({}, parseValue(preset.color), {
        keyword: preset.title
      });
      return parseValue(preset.color);
    });
    return initialPresets.concat(selectedColors).filter(Boolean).slice(-27);
  }, [presetColors, selectedColors]);
  var addPreset = useCallback(function (color) {
    if (!(color !== null && color !== void 0 && color.valid)) return;
    if (presets.some(function (preset) {
      return id(preset[colorSpace]) === id(color[colorSpace]);
    })) return;
    setSelectedColors(function (arr) {
      return arr.concat(color);
    });
  }, [colorSpace, presets]);
  return {
    presets: presets,
    addPreset: addPreset
  };
};

export var ColorControl = function ColorControl(_ref13) {
  var name = _ref13.name,
      initialValue = _ref13.value,
      onChange = _ref13.onChange,
      onFocus = _ref13.onFocus,
      onBlur = _ref13.onBlur,
      presetColors = _ref13.presetColors,
      startOpen = _ref13.startOpen;

  var _useColorInput = useColorInput(initialValue, throttle(onChange, 200)),
      value = _useColorInput.value,
      realValue = _useColorInput.realValue,
      updateValue = _useColorInput.updateValue,
      color = _useColorInput.color,
      colorSpace = _useColorInput.colorSpace,
      cycleColorSpace = _useColorInput.cycleColorSpace;

  var _usePresets = usePresets(presetColors, color, colorSpace),
      presets = _usePresets.presets,
      addPreset = _usePresets.addPreset;

  var Picker = ColorPicker[colorSpace];
  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(PickerTooltip, {
    trigger: "click",
    startOpen: startOpen,
    closeOnClick: true,
    onVisibilityChange: function onVisibilityChange() {
      return addPreset(color);
    },
    tooltip: /*#__PURE__*/React.createElement(TooltipContent, null, /*#__PURE__*/React.createElement(Picker, {
      color: realValue === 'transparent' ? '#000000' : realValue,
      onChange: updateValue,
      onFocus: onFocus,
      onBlur: onBlur
    }), presets.length > 0 && /*#__PURE__*/React.createElement(Swatches, null, presets.map(function (preset, index) {
      return /*#__PURE__*/React.createElement(WithTooltip // eslint-disable-next-line react/no-array-index-key
      , {
        key: "".concat(preset.value, "-").concat(index),
        hasChrome: false,
        tooltip: /*#__PURE__*/React.createElement(Note, {
          note: preset.keyword || preset.value
        })
      }, /*#__PURE__*/React.createElement(Swatch, {
        value: preset[colorSpace],
        active: color && id(preset[colorSpace]) === id(color[colorSpace]),
        onClick: function onClick() {
          return updateValue(preset.value);
        }
      }));
    })))
  }, /*#__PURE__*/React.createElement(Swatch, {
    value: realValue,
    style: {
      margin: 4
    }
  })), /*#__PURE__*/React.createElement(Input, {
    id: getControlId(name),
    value: value,
    onChange: function onChange(e) {
      return updateValue(e.target.value);
    },
    onFocus: function onFocus(e) {
      return e.target.select();
    },
    placeholder: "Choose color..."
  }), value ? /*#__PURE__*/React.createElement(ToggleIcon, {
    icon: "markup",
    onClick: cycleColorSpace
  }) : null);
};
ColorControl.displayName = "ColorControl";
export default ColorControl;