function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { styled } from '@storybook/theming';
import TextareaAutoResize from 'react-textarea-autosize';
import { Button as StyledButton } from '../../Button/Button';
const styleResets = {
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

const styles = ({
  theme
}) => Object.assign({}, styleResets, {
  transition: 'box-shadow 200ms ease-out, opacity 200ms ease-out',
  color: theme.input.color || 'inherit',
  background: theme.input.background,
  boxShadow: `${theme.input.border} 0 0 0 1px inset`,
  borderRadius: theme.input.borderRadius,
  fontSize: theme.typography.size.s2 - 1,
  lineHeight: '20px',
  padding: '6px 10px',
  // 32
  '&:focus': {
    boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    outline: 'none'
  },
  '&[disabled]': {
    cursor: 'not-allowed',
    opacity: 0.5
  },
  '&:-webkit-autofill': {
    WebkitBoxShadow: `0 0 0 3em ${theme.color.lightest} inset`
  },
  '::placeholder': {
    color: theme.color.mediumdark
  }
});

const sizes = ({
  size
}) => {
  switch (size) {
    case '100%':
      {
        return {
          width: '100%'
        };
      }

    case 'flex':
      {
        return {
          flex: 1
        };
      }

    case 'auto':
    default:
      {
        return {
          display: 'inline'
        };
      }
  }
};

const alignment = ({
  align
}) => {
  switch (align) {
    case 'end':
      {
        return {
          textAlign: 'right'
        };
      }

    case 'center':
      {
        return {
          textAlign: 'center'
        };
      }

    case 'start':
    default:
      {
        return {
          textAlign: 'left'
        };
      }
  }
};

const validation = ({
  valid,
  theme
}) => {
  switch (valid) {
    case 'valid':
      {
        return {
          boxShadow: `${theme.color.positive} 0 0 0 1px inset !important`
        };
      }

    case 'error':
      {
        return {
          boxShadow: `${theme.color.negative} 0 0 0 1px inset !important`
        };
      }

    case 'warn':
      {
        return {
          boxShadow: `${theme.color.warning} 0 0 0 1px inset`
        };
      }

    case undefined:
    case null:
    default:
      {
        return {};
      }
  }
};

export const Input = Object.assign(styled( /*#__PURE__*/forwardRef((_ref, ref) => {
  let props = _objectWithoutPropertiesLoose(_ref, ["size", "valid", "align"]);

  return /*#__PURE__*/React.createElement("input", _extends({}, props, {
    ref: ref
  }));
}))(styles, sizes, alignment, validation, {
  minHeight: 32
}), {
  displayName: 'Input'
});
export const Select = Object.assign(styled( /*#__PURE__*/forwardRef((_ref2, ref) => {
  let props = _objectWithoutPropertiesLoose(_ref2, ["size", "valid", "align"]);

  return /*#__PURE__*/React.createElement("select", _extends({}, props, {
    ref: ref
  }));
}))(styles, sizes, validation, {
  height: 32,
  userSelect: 'none',
  paddingRight: 20,
  appearance: 'menulist'
}), {
  displayName: 'Select'
});
export const Textarea = Object.assign(styled( /*#__PURE__*/forwardRef((_ref3, ref) => {
  let props = _objectWithoutPropertiesLoose(_ref3, ["size", "valid", "align"]);

  return /*#__PURE__*/React.createElement(TextareaAutoResize, _extends({}, props, {
    ref: ref
  }));
}))(styles, sizes, alignment, validation, ({
  height = 400
}) => ({
  overflow: 'visible',
  maxHeight: height
})), {
  displayName: 'Textarea'
});
const ButtonStyled = styled( /*#__PURE__*/forwardRef((_ref4, ref) => {
  let props = _objectWithoutPropertiesLoose(_ref4, ["size", "valid", "align"]);

  return /*#__PURE__*/React.createElement(StyledButton, _extends({}, props, {
    ref: ref
  }));
}))(sizes, validation, {
  // Custom styling for color widget nested in buttons
  userSelect: 'none',
  overflow: 'visible',
  zIndex: 2,
  // overrides the default hover from Button
  '&:hover': {
    transform: 'none'
  }
});
export const Button = Object.assign( /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(ButtonStyled, _extends({}, props, {
  tertiary: true,
  small: true,
  inForm: true,
  ref: ref
}))), {
  displayName: 'Button'
});