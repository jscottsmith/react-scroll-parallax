"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioControl = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.concat.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _clientLogger = require("@storybook/client-logger");

var _helpers = require("./helpers");

var _helpers2 = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Wrapper = _theming.styled.div(function (_ref) {
  var isInline = _ref.isInline;
  return isInline ? {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    label: {
      display: 'inline-flex',
      marginRight: 15
    }
  } : {
    label: {
      display: 'flex'
    }
  };
});

var Fieldset = _theming.styled.fieldset({
  border: 0,
  padding: 0,
  margin: 0
});

var Text = _theming.styled.span({});

var Label = _theming.styled.label({
  lineHeight: '20px',
  alignItems: 'center',
  marginBottom: 8,
  '&:last-child': {
    marginBottom: 0
  },
  input: {
    margin: 0,
    marginRight: 6
  }
});

var RadioControl = function RadioControl(_ref2) {
  var name = _ref2.name,
      options = _ref2.options,
      value = _ref2.value,
      _onChange = _ref2.onChange,
      isInline = _ref2.isInline;

  if (!options) {
    _clientLogger.logger.warn("Radio with no options: ".concat(name));

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "-");
  }

  var selection = (0, _helpers.selectedKey)(value, options);
  var controlId = (0, _helpers2.getControlId)(name);
  return /*#__PURE__*/_react.default.createElement(Wrapper, {
    isInline: isInline
  }, Object.keys(options).map(function (key, index) {
    var id = "".concat(controlId, "-").concat(index);
    return /*#__PURE__*/_react.default.createElement(Label, {
      key: id,
      htmlFor: id
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "radio",
      id: id,
      name: id,
      value: key,
      onChange: function onChange(e) {
        return _onChange(options[e.currentTarget.value]);
      },
      checked: key === selection
    }), /*#__PURE__*/_react.default.createElement(Text, null, key));
  }));
};

exports.RadioControl = RadioControl;
RadioControl.displayName = "RadioControl";