import React, { useState } from 'react';
import { BooleanControl } from './Boolean';
export default {
  title: 'Controls/Boolean',
  component: BooleanControl
};

const Template = initialValue => {
  const [value, setValue] = useState(initialValue);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BooleanControl, {
    name: "boolean",
    value: value,
    onChange: newVal => setValue(newVal)
  }), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(value) || 'undefined'));
};

export const True = () => Template(true);
export const False = () => Template(false);
export const Undefined = () => Template(undefined);