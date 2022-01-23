import React, { useState } from 'react';
import { NumberControl } from './Number';
export default {
  title: 'Controls/Number',
  component: NumberControl
};

const Template = initialValue => {
  const [value, setValue] = useState(initialValue);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NumberControl, {
    name: "number",
    value: value,
    onChange: newVal => setValue(newVal)
  }), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(value) || 'undefined'));
};

export const Basic = () => Template(10);
export const Zero = () => Template(0);
export const Undefined = () => Template(undefined);