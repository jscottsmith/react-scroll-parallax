import React, { useState } from 'react';
import { ObjectControl } from './Object';
export default {
  title: 'Controls/Object',
  component: ObjectControl
};

const Template = initialValue => {
  const [value, setValue] = useState(initialValue);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ObjectControl, {
    name: "object",
    value: value,
    onChange: newVal => setValue(newVal)
  }), /*#__PURE__*/React.createElement("pre", null, JSON.stringify(value) || 'undefined'));
};

export const Basic = () => Template({
  name: 'Michael',
  nested: {
    something: true
  }
});
export const Empty = () => Template({});
export const Null = () => Template(null);
export const Undefined = () => Template(undefined);
export const ValidatedAsArray = () => {
  const [value, setValue] = useState([]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ObjectControl, {
    name: "object",
    argType: {
      type: {
        name: 'array'
      }
    },
    value: value,
    onChange: newVal => setValue(newVal)
  }), /*#__PURE__*/React.createElement("p", null, value && JSON.stringify(value)));
};