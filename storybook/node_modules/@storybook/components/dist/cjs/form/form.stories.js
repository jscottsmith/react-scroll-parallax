"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.fill.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _input = require("./input/input");

var _field = require("./field/field");

var _Spaced = require("../spaced/Spaced");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Flexed = (0, _theming.styled)(_field.Field)({
  display: 'flex'
});
(0, _react2.storiesOf)('Basics/Form/Field', module).add('field', function () {
  return /*#__PURE__*/_react.default.createElement(_field.Field, {
    key: "key",
    label: "label"
  }, /*#__PURE__*/_react.default.createElement(_input.Select, {
    value: "val2",
    onChange: (0, _addonActions.action)('onChange'),
    size: 1
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "val1"
  }, "Value 1"), /*#__PURE__*/_react.default.createElement("option", {
    value: "val2"
  }, "Value 2"), /*#__PURE__*/_react.default.createElement("option", {
    value: "val3"
  }, "Value 3")));
});
(0, _react2.storiesOf)('Basics/Form/Select', module).add('sizes', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['auto', 'flex', '100%'].map(function (size) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: size,
      label: size
    }, /*#__PURE__*/_react.default.createElement(_input.Select, {
      value: "val2",
      onChange: (0, _addonActions.action)('onChange'),
      size: size
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: "val1"
    }, "Value 1"), /*#__PURE__*/_react.default.createElement("option", {
      value: "val2"
    }, "Value 2"), /*#__PURE__*/_react.default.createElement("option", {
      value: "val3"
    }, "Value 3")));
  }));
}).add('validations', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['error', 'warn', 'valid', null].map(function (valid) {
    return /*#__PURE__*/_react.default.createElement(_field.Field, {
      label: String(valid)
    }, /*#__PURE__*/_react.default.createElement(_input.Select, {
      key: valid,
      value: "val2",
      onChange: (0, _addonActions.action)('onChange'),
      size: "100%",
      valid: valid
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: "val1"
    }, "Value 1"), /*#__PURE__*/_react.default.createElement("option", {
      value: "val2"
    }, "Value 2"), /*#__PURE__*/_react.default.createElement("option", {
      value: "val3"
    }, "Value 3")));
  })), /*#__PURE__*/_react.default.createElement(_field.Field, {
    label: "select"
  }, /*#__PURE__*/_react.default.createElement(_input.Select, {
    value: "val2",
    onChange: (0, _addonActions.action)('onChange'),
    size: "100%",
    disabled: true
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "val1"
  }, "Value 1"), /*#__PURE__*/_react.default.createElement("option", {
    value: "val2"
  }, "Value 2"), /*#__PURE__*/_react.default.createElement("option", {
    value: "val3"
  }, "Value 3"))));
});
(0, _react2.storiesOf)('Basics/Form/Button', module).add('sizes', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['auto', 'flex', '100%'].map(function (size) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: size,
      label: size
    }, /*#__PURE__*/_react.default.createElement(_input.Button, {
      size: size
    }, "click this button"));
  }));
}).add('validations', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['error', 'warn', 'valid', null].map(function (valid) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: valid,
      label: String(valid)
    }, /*#__PURE__*/_react.default.createElement(_input.Button, {
      size: "100%",
      valid: valid
    }, "click this button"));
  }));
});
(0, _react2.storiesOf)('Basics/Form/Textarea', module).add('sizes', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['auto', 'flex', '100%'].map(function (size) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: size,
      label: size
    }, /*#__PURE__*/_react.default.createElement(_input.Textarea, {
      defaultValue: "textarea",
      size: size
    }));
  }));
}).add('validations', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['error', 'warn', 'valid', null].map(function (valid) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: valid,
      label: String(valid)
    }, /*#__PURE__*/_react.default.createElement(_input.Textarea, {
      defaultValue: "textarea",
      size: "100%",
      valid: valid
    }));
  }));
}).add('alignment', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['end', 'center', 'start'].map(function (align) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: align,
      label: align
    }, /*#__PURE__*/_react.default.createElement(_input.Textarea, {
      defaultValue: "textarea",
      size: "100%",
      align: align
    }));
  }));
}).add('height', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, [100, 200, undefined].map(function (height) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: (height || 'undefined').toString(),
      label: (height || 'undefined').toString()
    }, /*#__PURE__*/_react.default.createElement(_input.Textarea, {
      defaultValue: _toConsumableArray(new Array(650)).fill('textarea textvalue').join(' '),
      size: "100%",
      height: height
    }));
  }));
});
(0, _react2.storiesOf)('Basics/Form/Input', module).add('sizes', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['auto', 'flex', '100%'].map(function (size) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: size,
      label: size
    }, /*#__PURE__*/_react.default.createElement(_input.Input, {
      defaultValue: "text",
      size: size
    }));
  }));
}).add('validations', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['error', 'warn', 'valid', null].map(function (valid) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: valid,
      label: String(valid)
    }, /*#__PURE__*/_react.default.createElement(_input.Input, {
      defaultValue: "text",
      size: "100%",
      valid: valid
    }));
  }));
}).add('alignment', function () {
  return /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, null, ['end', 'center', 'start'].map(function (align) {
    return /*#__PURE__*/_react.default.createElement(Flexed, {
      key: align,
      label: align
    }, /*#__PURE__*/_react.default.createElement(_input.Input, {
      defaultValue: "text",
      size: "100%",
      align: align
    }));
  }));
});