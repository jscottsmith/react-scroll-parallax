import React, { useState } from 'react';
import { DateControl } from './Date';
export default {
  title: 'Controls/Date',
  component: DateControl
};

const Template = initialValue => {
  const [value, setValue] = useState(initialValue);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DateControl, {
    name: "date",
    value: value,
    onChange: newVal => setValue(newVal)
  }), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(value) || 'undefined'));
};

export const Basic = () => Template(new Date(2020, 4, 20));
export const Undefined = () => Template(undefined);