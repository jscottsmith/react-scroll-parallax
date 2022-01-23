"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.freeze.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectControl = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _clientLogger = require("@storybook/client-logger");

var _helpers = require("./helpers");

var _icon = require("../../icon/icon");

var _helpers2 = require("../helpers");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var styleResets = {
  // resets
  appearance: 'none',
  border: '0 none',
  boxSizing: 'inherit',
  display: ' block',
  margin: ' 0',
  background: 'transparent',
  padding: 0,
  fontSize: 'inherit',
  position: 'relative'
};

var OptionsSelect = _theming.styled.select(function (_ref) {
  var theme = _ref.theme;
  return Object.assign({}, styleResets, {
    boxSizing: 'border-box',
    position: 'relative',
    padding: '6px 10px',
    width: '100%',
    color: theme.input.color || 'inherit',
    background: theme.input.background,
    borderRadius: theme.input.borderRadius,
    boxShadow: "".concat(theme.input.border, " 0 0 0 1px inset"),
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '20px',
    '&:focus': {
      boxShadow: "".concat(theme.color.secondary, " 0 0 0 1px inset"),
      outline: 'none'
    },
    '&[disabled]': {
      cursor: 'not-allowed',
      opacity: 0.5
    },
    '::placeholder': {
      color: theme.color.mediumdark
    },
    '&[multiple]': {
      overflow: 'auto',
      padding: 0,
      option: {
        display: 'block',
        padding: '6px 10px',
        marginLeft: 1,
        marginRight: 1
      }
    }
  });
});

var SelectWrapper = _theming.styled.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: inline-block;\n  line-height: normal;\n  overflow: hidden;\n  position: relative;\n  vertical-align: top;\n  width: 100%;\n\n  svg {\n    position: absolute;\n    z-index: 1;\n    pointer-events: none;\n    height: 12px;\n    margin-top: -6px;\n    right: 12px;\n    top: 50%;\n\n    path {\n      fill: currentColor;\n    }\n  }\n"])));

var NO_SELECTION = 'Choose option...';

var SingleSelect = function SingleSelect(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      options = _ref2.options,
      onChange = _ref2.onChange;

  var handleChange = function handleChange(e) {
    onChange(options[e.currentTarget.value]);
  };

  var selection = (0, _helpers.selectedKey)(value, options) || NO_SELECTION;
  var controlId = (0, _helpers2.getControlId)(name);
  return /*#__PURE__*/_react.default.createElement(SelectWrapper, null, /*#__PURE__*/_react.default.createElement(_icon.Icons, {
    icon: "arrowdown"
  }), /*#__PURE__*/_react.default.createElement(OptionsSelect, {
    id: controlId,
    value: selection,
    onChange: handleChange
  }, /*#__PURE__*/_react.default.createElement("option", {
    key: "no-selection",
    disabled: true
  }, NO_SELECTION), Object.keys(options).map(function (key) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: key
    }, key);
  })));
};

SingleSelect.displayName = "SingleSelect";

var MultiSelect = function MultiSelect(_ref3) {
  var name = _ref3.name,
      value = _ref3.value,
      options = _ref3.options,
      onChange = _ref3.onChange;

  var handleChange = function handleChange(e) {
    var selection = Array.from(e.currentTarget.options).filter(function (option) {
      return option.selected;
    }).map(function (option) {
      return option.value;
    });
    onChange((0, _helpers.selectedValues)(selection, options));
  };

  var selection = (0, _helpers.selectedKeys)(value, options);
  var controlId = (0, _helpers2.getControlId)(name);
  return /*#__PURE__*/_react.default.createElement(SelectWrapper, null, /*#__PURE__*/_react.default.createElement(OptionsSelect, {
    id: controlId,
    multiple: true,
    value: selection,
    onChange: handleChange
  }, Object.keys(options).map(function (key) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: key
    }, key);
  })));
};

MultiSelect.displayName = "MultiSelect";

var SelectControl = function SelectControl(props) {
  var name = props.name,
      options = props.options;

  if (!options) {
    _clientLogger.logger.warn("Select with no options: ".concat(name));

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "-");
  } // eslint-disable-next-line react/destructuring-assignment


  return props.isMulti ? /*#__PURE__*/_react.default.createElement(MultiSelect, props) : /*#__PURE__*/_react.default.createElement(SingleSelect, props);
};

exports.SelectControl = SelectControl;