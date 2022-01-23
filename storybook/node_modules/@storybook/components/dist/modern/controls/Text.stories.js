import React, { useState } from 'react';
import { TextControl } from './Text';
export default {
  title: 'Controls/Text',
  component: TextControl
};

const Template = initialValue => {
  const [value, setValue] = useState(initialValue);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextControl, {
    name: "Text",
    value: value,
    onChange: newVal => setValue(newVal)
  }), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(value) || 'undefined'));
};

export const Basic = () => Template('Hello text');
export const Empty = () => Template('');
export const Undefined = () => Template(undefined);