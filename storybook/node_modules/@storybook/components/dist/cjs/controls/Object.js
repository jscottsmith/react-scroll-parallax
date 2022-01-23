"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectControl = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.includes.js");

var _global = _interopRequireDefault(require("global"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _reactEditableJsonTree = require("./react-editable-json-tree");

var _helpers = require("./helpers");

var _form = require("../form");

var _icon = require("../icon/icon");

var _button = require("../bar/button");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var globalWindow = _global.default.window;

var Wrapper = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    position: 'relative',
    display: 'flex',
    '.rejt-tree': {
      marginLeft: '1rem',
      fontSize: '13px'
    },
    '.rejt-value-node, .rejt-object-node > .rejt-collapsed, .rejt-array-node > .rejt-collapsed, .rejt-object-node > .rejt-not-collapsed, .rejt-array-node > .rejt-not-collapsed': {
      '& > svg': {
        opacity: 0,
        transition: 'opacity 0.2s'
      }
    },
    '.rejt-value-node:hover, .rejt-object-node:hover > .rejt-collapsed, .rejt-array-node:hover > .rejt-collapsed, .rejt-object-node:hover > .rejt-not-collapsed, .rejt-array-node:hover > .rejt-not-collapsed': {
      '& > svg': {
        opacity: 1
      }
    },
    '.rejt-edit-form button': {
      display: 'none'
    },
    '.rejt-add-form': {
      marginLeft: 10
    },
    '.rejt-add-value-node': {
      display: 'inline-flex',
      alignItems: 'center'
    },
    '.rejt-name': {
      lineHeight: '22px'
    },
    '.rejt-not-collapsed-delimiter': {
      lineHeight: '22px'
    },
    '.rejt-plus-menu': {
      marginLeft: 5
    },
    '.rejt-object-node > span > *': {
      position: 'relative',
      zIndex: 2
    },
    '.rejt-object-node, .rejt-array-node': {
      position: 'relative'
    },
    '.rejt-object-node > span:first-of-type::after, .rejt-array-node > span:first-of-type::after, .rejt-collapsed::before, .rejt-not-collapsed::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      display: 'block',
      width: '100%',
      marginLeft: '-1rem',
      padding: '0 4px 0 1rem',
      height: 22
    },
    '.rejt-collapsed::before, .rejt-not-collapsed::before': {
      zIndex: 1,
      background: 'transparent',
      borderRadius: 4,
      transition: 'background 0.2s',
      pointerEvents: 'none',
      opacity: 0.1
    },
    '.rejt-object-node:hover, .rejt-array-node:hover': {
      '& > .rejt-collapsed::before, & > .rejt-not-collapsed::before': {
        background: theme.color.secondary
      }
    },
    '.rejt-collapsed::after, .rejt-not-collapsed::after': {
      content: '""',
      position: 'absolute',
      display: 'inline-block',
      pointerEvents: 'none',
      width: 0,
      height: 0
    },
    '.rejt-collapsed::after': {
      left: -8,
      top: 8,
      borderTop: '3px solid transparent',
      borderBottom: '3px solid transparent',
      borderLeft: '3px solid rgba(153,153,153,0.6)'
    },
    '.rejt-not-collapsed::after': {
      left: -10,
      top: 10,
      borderTop: '3px solid rgba(153,153,153,0.6)',
      borderLeft: '3px solid transparent',
      borderRight: '3px solid transparent'
    },
    '.rejt-value': {
      display: 'inline-block',
      border: '1px solid transparent',
      borderRadius: 4,
      margin: '1px 0',
      padding: '0 4px',
      cursor: 'text',
      color: theme.color.defaultText
    },
    '.rejt-value-node:hover > .rejt-value': {
      background: theme.background.app,
      borderColor: theme.color.border
    }
  };
});

var Button = _theming.styled.button(function (_ref2) {
  var theme = _ref2.theme,
      primary = _ref2.primary;
  return {
    border: 0,
    height: 20,
    margin: 1,
    borderRadius: 4,
    background: primary ? theme.color.secondary : 'transparent',
    color: primary ? theme.color.lightest : theme.color.dark,
    fontWeight: primary ? 'bold' : 'normal',
    cursor: 'pointer',
    order: primary ? 'initial' : 9
  };
});

var ActionIcon = (0, _theming.styled)(_icon.Icons)(function (_ref3) {
  var theme = _ref3.theme,
      icon = _ref3.icon,
      disabled = _ref3.disabled;
  return {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: 15,
    height: 15,
    padding: 3,
    marginLeft: 5,
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: theme.color.mediumdark,
    '&:hover': disabled ? {} : {
      color: icon === 'subtract' ? theme.color.negative : theme.color.ancillary
    },
    'svg + &': {
      marginLeft: 0
    }
  };
});

var Input = _theming.styled.input(function (_ref4) {
  var theme = _ref4.theme,
      placeholder = _ref4.placeholder;
  return {
    outline: 0,
    margin: placeholder ? 1 : '1px 0',
    padding: '3px 4px',
    color: theme.color.defaultText,
    background: theme.background.app,
    border: "1px solid ".concat(theme.color.border),
    borderRadius: 4,
    lineHeight: '14px',
    width: placeholder === 'Key' ? 80 : 120,
    '&:focus': {
      border: "1px solid ".concat(theme.color.secondary)
    }
  };
});

var RawButton = (0, _theming.styled)(_button.IconButton)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    position: 'absolute',
    zIndex: 2,
    top: 2,
    right: 2,
    height: 21,
    padding: '0 3px',
    background: theme.background.bar,
    border: "1px solid ".concat(theme.color.border),
    borderRadius: 3,
    color: theme.color.mediumdark,
    fontSize: '9px',
    fontWeight: 'bold',
    span: {
      marginLeft: 3,
      marginTop: 1
    }
  };
});
var RawInput = (0, _theming.styled)(_form.Form.Textarea)(function (_ref6) {
  var theme = _ref6.theme;
  return {
    flex: 1,
    padding: '7px 6px',
    fontFamily: theme.typography.fonts.mono,
    fontSize: '12px',
    lineHeight: '18px',
    '&::placeholder': {
      fontFamily: theme.typography.fonts.base,
      fontSize: '13px'
    },
    '&:placeholder-shown': {
      padding: '7px 10px'
    }
  };
});
var ENTER_EVENT = {
  bubbles: true,
  cancelable: true,
  key: 'Enter',
  code: 'Enter',
  keyCode: 13
};

var dispatchEnterKey = function dispatchEnterKey(event) {
  event.currentTarget.dispatchEvent(new globalWindow.KeyboardEvent('keydown', ENTER_EVENT));
};

var selectValue = function selectValue(event) {
  event.currentTarget.select();
};

var getCustomStyleFunction = function getCustomStyleFunction(theme) {
  return function () {
    return {
      name: {
        color: theme.color.secondary
      },
      collapsed: {
        color: theme.color.dark
      },
      ul: {
        listStyle: 'none',
        margin: '0 0 0 1rem',
        padding: 0
      },
      li: {
        outline: 0
      }
    };
  };
};

var ObjectControl = function ObjectControl(_ref7) {
  var name = _ref7.name,
      value = _ref7.value,
      onChange = _ref7.onChange;
  var theme = (0, _theming.useTheme)();
  var data = (0, _react.useMemo)(function () {
    return value && (0, _cloneDeep.default)(value);
  }, [value]);
  var hasData = data !== null && data !== undefined;

  var _useState = (0, _react.useState)(!hasData),
      _useState2 = _slicedToArray(_useState, 2),
      showRaw = _useState2[0],
      setShowRaw = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      parseError = _useState4[0],
      setParseError = _useState4[1];

  var updateRaw = (0, _react.useCallback)(function (raw) {
    try {
      if (raw) onChange(JSON.parse(raw));
      setParseError(undefined);
    } catch (e) {
      setParseError(e);
    }
  }, [onChange]);

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      forceVisible = _useState6[0],
      setForceVisible = _useState6[1];

  var onForceVisible = (0, _react.useCallback)(function () {
    onChange({});
    setForceVisible(true);
  }, [setForceVisible]);
  var htmlElRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (forceVisible && htmlElRef.current) htmlElRef.current.select();
  }, [forceVisible]);

  if (!hasData) {
    return /*#__PURE__*/_react.default.createElement(_form.Form.Button, {
      id: (0, _helpers.getControlSetterButtonId)(name),
      onClick: onForceVisible
    }, "Set object");
  }

  var rawJSONForm = /*#__PURE__*/_react.default.createElement(RawInput, {
    ref: htmlElRef,
    id: (0, _helpers.getControlId)(name),
    name: name,
    defaultValue: value === null ? '' : JSON.stringify(value, null, 2),
    onBlur: function onBlur(event) {
      return updateRaw(event.target.value);
    },
    placeholder: "Edit JSON string...",
    autoFocus: forceVisible,
    valid: parseError ? 'error' : null
  });

  return /*#__PURE__*/_react.default.createElement(Wrapper, null, ['Object', 'Array'].includes((0, _reactEditableJsonTree.getObjectType)(data)) && /*#__PURE__*/_react.default.createElement(RawButton, {
    onClick: function onClick() {
      return setShowRaw(function (v) {
        return !v;
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: showRaw ? 'eyeclose' : 'eye'
  }), /*#__PURE__*/_react.default.createElement("span", null, "RAW")), !showRaw ? /*#__PURE__*/_react.default.createElement(_reactEditableJsonTree.JsonTree, {
    data: data,
    rootName: name,
    onFullyUpdate: onChange,
    getStyle: getCustomStyleFunction(theme),
    cancelButtonElement: /*#__PURE__*/_react.default.createElement(Button, {
      type: "button"
    }, "Cancel"),
    editButtonElement: /*#__PURE__*/_react.default.createElement(Button, {
      type: "submit"
    }, "Save"),
    addButtonElement: /*#__PURE__*/_react.default.createElement(Button, {
      type: "submit",
      primary: true
    }, "Save"),
    plusMenuElement: /*#__PURE__*/_react.default.createElement(ActionIcon, {
      icon: "add"
    }),
    minusMenuElement: /*#__PURE__*/_react.default.createElement(ActionIcon, {
      icon: "subtract"
    }),
    inputElement: function inputElement(_, __, ___, key) {
      return key ? /*#__PURE__*/_react.default.createElement(Input, {
        onFocus: selectValue,
        onBlur: dispatchEnterKey
      }) : /*#__PURE__*/_react.default.createElement(Input, null);
    },
    fallback: rawJSONForm
  }) : rawJSONForm);
};

exports.ObjectControl = ObjectControl;
ObjectControl.displayName = "ObjectControl";