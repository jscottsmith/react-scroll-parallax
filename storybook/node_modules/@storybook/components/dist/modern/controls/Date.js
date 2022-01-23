import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
import { getControlId } from './helpers';

const parseDate = value => {
  const [year, month, day] = value.split('-');
  const result = new Date();
  result.setFullYear(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  return result;
};

const parseTime = value => {
  const [hours, minutes] = value.split(':');
  const result = new Date();
  result.setHours(parseInt(hours, 10));
  result.setMinutes(parseInt(minutes, 10));
  return result;
};

const formatDate = value => {
  const date = new Date(value);
  const year = `000${date.getFullYear()}`.slice(-4);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

const formatTime = value => {
  const date = new Date(value);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${hours}:${minutes}`;
};

const FlexSpaced = styled.div(({
  theme
}) => ({
  flex: 1,
  display: 'flex',
  input: {
    marginLeft: 10,
    flex: 1,
    height: 32,
    // hardcode height bc Chromium bug https://bugs.chromium.org/p/chromium/issues/detail?id=417606
    '&::-webkit-calendar-picker-indicator': {
      opacity: 0.5,
      height: 12,
      filter: theme.base === 'light' ? undefined : 'invert(1)'
    }
  },
  'input:first-of-type': {
    marginLeft: 0
  }
}));
export const DateControl = ({
  name,
  value,
  onChange,
  onFocus,
  onBlur
}) => {
  const [valid, setValid] = useState(true);
  const dateRef = useRef();
  const timeRef = useRef();
  useEffect(() => {
    if (valid !== false) {
      if (dateRef && dateRef.current) {
        dateRef.current.value = formatDate(value);
      }

      if (timeRef && timeRef.current) {
        timeRef.current.value = formatTime(value);
      }
    }
  }, [value]);

  const onDateChange = e => {
    const parsed = parseDate(e.target.value);
    const result = new Date(value);
    result.setFullYear(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    const time = result.getTime();
    if (time) onChange(time);
    setValid(!!time);
  };

  const onTimeChange = e => {
    const parsed = parseTime(e.target.value);
    const result = new Date(value);
    result.setHours(parsed.getHours());
    result.setMinutes(parsed.getMinutes());
    const time = result.getTime();
    if (time) onChange(time);
    setValid(!!time);
  };

  const controlId = getControlId(name);
  return /*#__PURE__*/React.createElement(FlexSpaced, null, /*#__PURE__*/React.createElement(Form.Input, {
    type: "date",
    max: "9999-12-31" // I do this because of a rendering bug in chrome
    ,
    ref: dateRef,
    id: `${controlId}-date`,
    name: `${controlId}-date`,
    onChange: onDateChange,
    onFocus,
    onBlur
  }), /*#__PURE__*/React.createElement(Form.Input, {
    type: "time",
    id: `${controlId}-time`,
    name: `${controlId}-time`,
    ref: timeRef,
    onChange: onTimeChange,
    onFocus,
    onBlur
  }), !valid ? /*#__PURE__*/React.createElement("div", null, "invalid") : null);
};
DateControl.displayName = "DateControl";