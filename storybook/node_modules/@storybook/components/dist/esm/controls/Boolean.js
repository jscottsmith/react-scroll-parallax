import "core-js/modules/es.string.bold.js";
import "core-js/modules/es.function.name.js";
import React, { useCallback } from 'react';
import { opacify, transparentize } from 'polished';
import { styled } from '@storybook/theming';
import { getControlId, getControlSetterButtonId } from './helpers';
import { Form } from '../form';
var Label = styled.label(function (_ref) {
  var theme = _ref.theme;
  return {
    lineHeight: '18px',
    alignItems: 'center',
    marginBottom: 8,
    display: 'inline-block',
    position: 'relative',
    whiteSpace: 'nowrap',
    background: "".concat(opacify(0.05, theme.appBorderColor)),
    borderRadius: '3em',
    padding: 1,
    input: {
      appearance: 'none',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      borderRadius: '3em',
      '&:focus': {
        outline: 'none',
        boxShadow: "".concat(theme.color.secondary, " 0 0 0 1px inset !important")
      }
    },
    span: {
      textAlign: 'center',
      fontSize: theme.typography.size.s1,
      fontWeight: theme.typography.weight.bold,
      lineHeight: '1',
      cursor: 'pointer',
      display: 'inline-block',
      padding: '7px 15px',
      transition: 'all 100ms ease-out',
      userSelect: 'none',
      borderRadius: '3em',
      color: transparentize(0.4, theme.color.defaultText),
      background: 'transparent',
      '&:hover': {
        boxShadow: "".concat(opacify(0.3, theme.appBorderColor), " 0 0 0 1px inset")
      },
      '&:active': {
        boxShadow: "".concat(opacify(0.05, theme.appBorderColor), " 0 0 0 2px inset"),
        color: opacify(1, theme.appBorderColor)
      },
      '&:first-of-type': {
        paddingRight: 8
      },
      '&:last-of-type': {
        paddingLeft: 8
      }
    },
    'input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type': {
      background: theme.background.app,
      boxShadow: "".concat(opacify(0.1, theme.appBorderColor), " 0 0 2px"),
      color: theme.color.defaultText,
      padding: '7px 15px'
    }
  };
});

var format = function format(value) {
  return value ? String(value) : null;
};

var parse = function parse(value) {
  return value === 'true';
};

export var BooleanControl = function BooleanControl(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      _onChange = _ref2.onChange,
      onBlur = _ref2.onBlur,
      onFocus = _ref2.onFocus;
  var onSetFalse = useCallback(function () {
    return _onChange(false);
  }, [_onChange]);

  if (value === undefined) {
    return /*#__PURE__*/React.createElement(Form.Button, {
      id: getControlSetterButtonId(name),
      onClick: onSetFalse
    }, "Set boolean");
  }

  return /*#__PURE__*/React.createElement(Label, {
    htmlFor: name,
    title: value ? 'Change to false' : 'Change to true'
  }, /*#__PURE__*/React.createElement("input", {
    id: getControlId(name),
    type: "checkbox",
    onChange: function onChange(e) {
      return _onChange(e.target.checked);
    },
    checked: value || false,
    name: name,
    onBlur: onBlur,
    onFocus: onFocus
  }), /*#__PURE__*/React.createElement("span", null, "False"), /*#__PURE__*/React.createElement("span", null, "True"));
};
BooleanControl.displayName = "BooleanControl";