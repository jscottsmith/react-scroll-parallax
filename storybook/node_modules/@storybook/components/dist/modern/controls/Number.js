import React, { useState, useCallback, useEffect, useRef } from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
import { getControlId, getControlSetterButtonId } from './helpers';
const Wrapper = styled.label({
  display: 'flex'
});
export const parse = value => {
  const result = parseFloat(value);
  return Number.isNaN(result) ? undefined : result;
};
export const format = value => value != null ? String(value) : '';
export const NumberControl = ({
  name,
  value,
  onChange,
  min,
  max,
  step,
  onBlur,
  onFocus
}) => {
  const [inputValue, setInputValue] = useState(typeof value === 'number' ? value : '');
  const [forceVisible, setForceVisible] = useState(false);
  const [parseError, setParseError] = useState(null);
  const handleChange = useCallback(event => {
    setInputValue(event.target.value);
    const result = parseFloat(event.target.value);

    if (Number.isNaN(result)) {
      setParseError(new Error(`'${event.target.value}' is not a number`));
    } else {
      onChange(result);
      setParseError(null);
    }
  }, [onChange, setParseError]);
  const onForceVisible = useCallback(() => {
    setInputValue('0');
    onChange(0);
    setForceVisible(true);
  }, [setForceVisible]);
  const htmlElRef = useRef(null);
  useEffect(() => {
    if (forceVisible && htmlElRef.current) htmlElRef.current.select();
  }, [forceVisible]);

  if (!forceVisible && value === undefined) {
    return /*#__PURE__*/React.createElement(Form.Button, {
      id: getControlSetterButtonId(name),
      onClick: onForceVisible
    }, "Set number");
  }

  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Form.Input, {
    ref: htmlElRef,
    id: getControlId(name),
    type: "number",
    onChange: handleChange,
    size: "flex",
    placeholder: "Edit number...",
    value: inputValue,
    valid: parseError ? 'error' : null,
    autoFocus: forceVisible,
    name,
    min,
    max,
    step,
    onFocus,
    onBlur
  }));
};
NumberControl.displayName = "NumberControl";