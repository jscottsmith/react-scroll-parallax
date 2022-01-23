import React, { useState } from 'react';
import { styled } from '@storybook/theming';
import { logger } from '@storybook/client-logger';
import { selectedKeys, selectedValues } from './helpers';
import { getControlId } from '../helpers';
const Wrapper = styled.div(({
  isInline
}) => isInline ? {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  label: {
    display: 'inline-flex',
    marginRight: 15
  }
} : {
  label: {
    display: 'flex'
  }
});
const Text = styled.span({});
const Label = styled.label({
  lineHeight: '20px',
  alignItems: 'center',
  marginBottom: 8,
  '&:last-child': {
    marginBottom: 0
  },
  input: {
    margin: 0,
    marginRight: 6
  }
});
export const CheckboxControl = ({
  name,
  options,
  value,
  onChange,
  isInline
}) => {
  if (!options) {
    logger.warn(`Checkbox with no options: ${name}`);
    return /*#__PURE__*/React.createElement(React.Fragment, null, "-");
  }

  const initial = selectedKeys(value, options);
  const [selected, setSelected] = useState(initial);

  const handleChange = e => {
    const option = e.target.value;
    const updated = [...selected];

    if (updated !== null && updated !== void 0 && updated.includes(option)) {
      updated.splice(updated.indexOf(option), 1);
    } else {
      updated.push(option);
    }

    onChange(selectedValues(updated, options));
    setSelected(updated);
  };

  const controlId = getControlId(name);
  return /*#__PURE__*/React.createElement(Wrapper, {
    isInline: isInline
  }, Object.keys(options).map((key, index) => {
    const id = `${controlId}-${index}`;
    return /*#__PURE__*/React.createElement(Label, {
      key: id,
      htmlFor: id
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: id,
      name: id,
      value: key,
      onChange: handleChange,
      checked: selected === null || selected === void 0 ? void 0 : selected.includes(key)
    }), /*#__PURE__*/React.createElement(Text, null, key));
  }));
};
CheckboxControl.displayName = "CheckboxControl";