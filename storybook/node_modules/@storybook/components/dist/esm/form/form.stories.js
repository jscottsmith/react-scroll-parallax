function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.fill.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Input, Button, Select, Textarea } from './input/input';
import { Field } from './field/field';
import { Spaced } from '../spaced/Spaced';
var Flexed = styled(Field)({
  display: 'flex'
});
storiesOf('Basics/Form/Field', module).add('field', function () {
  return /*#__PURE__*/React.createElement(Field, {
    key: "key",
    label: "label"
  }, /*#__PURE__*/React.createElement(Select, {
    value: "val2",
    onChange: action('onChange'),
    size: 1
  }, /*#__PURE__*/React.createElement("option", {
    value: "val1"
  }, "Value 1"), /*#__PURE__*/React.createElement("option", {
    value: "val2"
  }, "Value 2"), /*#__PURE__*/React.createElement("option", {
    value: "val3"
  }, "Value 3")));
});
storiesOf('Basics/Form/Select', module).add('sizes', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, ['auto', 'flex', '100%'].map(function (size) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: size,
      label: size
    }, /*#__PURE__*/React.createElement(Select, {
      value: "val2",
      onChange: action('onChange'),
      size: size
    }, /*#__PURE__*/React.createElement("option", {
      value: "val1"
    }, "Value 1"), /*#__PURE__*/React.createElement("option", {
      value: "val2"
    }, "Value 2"), /*#__PURE__*/React.createElement("option", {
      value: "val3"
    }, "Value 3")));
  }));
}).add('validations', function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Spaced, null, ['error', 'warn', 'valid', null].map(function (valid) {
    return /*#__PURE__*/React.createElement(Field, {
      label: String(valid)
    }, /*#__PURE__*/React.createElement(Select, {
      key: valid,
      value: "val2",
      onChange: action('onChange'),
      size: "100%",
      valid: valid
    }, /*#__PURE__*/React.createElement("option", {
      value: "val1"
    }, "Value 1"), /*#__PURE__*/React.createElement("option", {
      value: "val2"
    }, "Value 2"), /*#__PURE__*/React.createElement("option", {
      value: "val3"
    }, "Value 3")));
  })), /*#__PURE__*/React.createElement(Field, {
    label: "select"
  }, /*#__PURE__*/React.createElement(Select, {
    value: "val2",
    onChange: action('onChange'),
    size: "100%",
    disabled: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "val1"
  }, "Value 1"), /*#__PURE__*/React.createElement("option", {
    value: "val2"
  }, "Value 2"), /*#__PURE__*/React.createElement("option", {
    value: "val3"
  }, "Value 3"))));
});
storiesOf('Basics/Form/Button', module).add('sizes', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, ['auto', 'flex', '100%'].map(function (size) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: size,
      label: size
    }, /*#__PURE__*/React.createElement(Button, {
      size: size
    }, "click this button"));
  }));
}).add('validations', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, ['error', 'warn', 'valid', null].map(function (valid) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: valid,
      label: String(valid)
    }, /*#__PURE__*/React.createElement(Button, {
      size: "100%",
      valid: valid
    }, "click this button"));
  }));
});
storiesOf('Basics/Form/Textarea', module).add('sizes', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, ['auto', 'flex', '100%'].map(function (size) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: size,
      label: size
    }, /*#__PURE__*/React.createElement(Textarea, {
      defaultValue: "textarea",
      size: size
    }));
  }));
}).add('validations', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, ['error', 'warn', 'valid', null].map(function (valid) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: valid,
      label: String(valid)
    }, /*#__PURE__*/React.createElement(Textarea, {
      defaultValue: "textarea",
      size: "100%",
      valid: valid
    }));
  }));
}).add('alignment', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, ['end', 'center', 'start'].map(function (align) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: align,
      label: align
    }, /*#__PURE__*/React.createElement(Textarea, {
      defaultValue: "textarea",
      size: "100%",
      align: align
    }));
  }));
}).add('height', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, [100, 200, undefined].map(function (height) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: (height || 'undefined').toString(),
      label: (height || 'undefined').toString()
    }, /*#__PURE__*/React.createElement(Textarea, {
      defaultValue: _toConsumableArray(new Array(650)).fill('textarea textvalue').join(' '),
      size: "100%",
      height: height
    }));
  }));
});
storiesOf('Basics/Form/Input', module).add('sizes', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, ['auto', 'flex', '100%'].map(function (size) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: size,
      label: size
    }, /*#__PURE__*/React.createElement(Input, {
      defaultValue: "text",
      size: size
    }));
  }));
}).add('validations', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, ['error', 'warn', 'valid', null].map(function (valid) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: valid,
      label: String(valid)
    }, /*#__PURE__*/React.createElement(Input, {
      defaultValue: "text",
      size: "100%",
      valid: valid
    }));
  }));
}).add('alignment', function () {
  return /*#__PURE__*/React.createElement(Spaced, null, ['end', 'center', 'start'].map(function (align) {
    return /*#__PURE__*/React.createElement(Flexed, {
      key: align,
      label: align
    }, /*#__PURE__*/React.createElement(Input, {
      defaultValue: "text",
      size: "100%",
      align: align
    }));
  }));
});