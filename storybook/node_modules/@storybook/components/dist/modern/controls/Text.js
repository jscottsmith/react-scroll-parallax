import React, { useCallback, useState } from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
import { getControlId, getControlSetterButtonId } from './helpers';
const Wrapper = styled.label({
  display: 'flex'
});
export const TextControl = ({
  name,
  value,
  onChange,
  onFocus,
  onBlur
}) => {
  const handleChange = event => {
    onChange(event.target.value);
  };

  const [forceVisible, setForceVisible] = useState(false);
  const onForceVisible = useCallback(() => {
    onChange('');
    setForceVisible(true);
  }, [setForceVisible]);

  if (value === undefined) {
    return /*#__PURE__*/React.createElement(Form.Button, {
      id: getControlSetterButtonId(name),
      onClick: onForceVisible
    }, "Set string");
  }

  const isValid = typeof value === 'string';
  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Form.Textarea, {
    id: getControlId(name),
    onChange: handleChange,
    size: "flex",
    placeholder: "Edit string...",
    autoFocus: forceVisible,
    valid: isValid ? null : 'error',
    name,
    value: isValid ? value : '',
    onFocus,
    onBlur
  }));
};
TextControl.displayName = "TextControl";