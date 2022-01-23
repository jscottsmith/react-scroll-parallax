import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { logger } from '@storybook/client-logger';
import { selectedKey, selectedKeys, selectedValues } from './helpers';
import { Icons } from '../../icon/icon';
import { getControlId } from '../helpers';
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
var OptionsSelect = styled.select(function (_ref) {
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
var SelectWrapper = styled.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: inline-block;\n  line-height: normal;\n  overflow: hidden;\n  position: relative;\n  vertical-align: top;\n  width: 100%;\n\n  svg {\n    position: absolute;\n    z-index: 1;\n    pointer-events: none;\n    height: 12px;\n    margin-top: -6px;\n    right: 12px;\n    top: 50%;\n\n    path {\n      fill: currentColor;\n    }\n  }\n"])));
var NO_SELECTION = 'Choose option...';

var SingleSelect = function SingleSelect(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      options = _ref2.options,
      onChange = _ref2.onChange;

  var handleChange = function handleChange(e) {
    onChange(options[e.currentTarget.value]);
  };

  var selection = selectedKey(value, options) || NO_SELECTION;
  var controlId = getControlId(name);
  return /*#__PURE__*/React.createElement(SelectWrapper, null, /*#__PURE__*/React.createElement(Icons, {
    icon: "arrowdown"
  }), /*#__PURE__*/React.createElement(OptionsSelect, {
    id: controlId,
    value: selection,
    onChange: handleChange
  }, /*#__PURE__*/React.createElement("option", {
    key: "no-selection",
    disabled: true
  }, NO_SELECTION), Object.keys(options).map(function (key) {
    return /*#__PURE__*/React.createElement("option", {
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
    onChange(selectedValues(selection, options));
  };

  var selection = selectedKeys(value, options);
  var controlId = getControlId(name);
  return /*#__PURE__*/React.createElement(SelectWrapper, null, /*#__PURE__*/React.createElement(OptionsSelect, {
    id: controlId,
    multiple: true,
    value: selection,
    onChange: handleChange
  }, Object.keys(options).map(function (key) {
    return /*#__PURE__*/React.createElement("option", {
      key: key
    }, key);
  })));
};

MultiSelect.displayName = "MultiSelect";
export var SelectControl = function SelectControl(props) {
  var name = props.name,
      options = props.options;

  if (!options) {
    logger.warn("Select with no options: ".concat(name));
    return /*#__PURE__*/React.createElement(React.Fragment, null, "-");
  } // eslint-disable-next-line react/destructuring-assignment


  return props.isMulti ? /*#__PURE__*/React.createElement(MultiSelect, props) : /*#__PURE__*/React.createElement(SingleSelect, props);
};