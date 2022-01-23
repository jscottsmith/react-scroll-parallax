import React from 'react';
import { styled } from '@storybook/theming';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Input, Button, Select, Textarea } from './input/input';
import { Field } from './field/field';
import { Spaced } from '../spaced/Spaced';
const Flexed = styled(Field)({
  display: 'flex'
});
storiesOf('Basics/Form/Field', module).add('field', () => /*#__PURE__*/React.createElement(Field, {
  key: "key",
  label: "label"
}, /*#__PURE__*/React.createElement(Select, {
  value: "val2",
  onChange: action('onChange'),
  size: 1
}, /*#__PURE__*/React.createElement("option", {
  value: "val1"
}, "Value 1"), /*#__PURE__*/React.createElement("option", {
  value: "val2"
}, "Value 2"), /*#__PURE__*/React.createElement("option", {
  value: "val3"
}, "Value 3"))));
storiesOf('Basics/Form/Select', module).add('sizes', () => /*#__PURE__*/React.createElement(Spaced, null, ['auto', 'flex', '100%'].map(size => /*#__PURE__*/React.createElement(Flexed, {
  key: size,
  label: size
}, /*#__PURE__*/React.createElement(Select, {
  value: "val2",
  onChange: action('onChange'),
  size: size
}, /*#__PURE__*/React.createElement("option", {
  value: "val1"
}, "Value 1"), /*#__PURE__*/React.createElement("option", {
  value: "val2"
}, "Value 2"), /*#__PURE__*/React.createElement("option", {
  value: "val3"
}, "Value 3")))))).add('validations', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Spaced, null, ['error', 'warn', 'valid', null].map(valid => /*#__PURE__*/React.createElement(Field, {
  label: String(valid)
}, /*#__PURE__*/React.createElement(Select, {
  key: valid,
  value: "val2",
  onChange: action('onChange'),
  size: "100%",
  valid: valid
}, /*#__PURE__*/React.createElement("option", {
  value: "val1"
}, "Value 1"), /*#__PURE__*/React.createElement("option", {
  value: "val2"
}, "Value 2"), /*#__PURE__*/React.createElement("option", {
  value: "val3"
}, "Value 3"))))), /*#__PURE__*/React.createElement(Field, {
  label: "select"
}, /*#__PURE__*/React.createElement(Select, {
  value: "val2",
  onChange: action('onChange'),
  size: "100%",
  disabled: true
}, /*#__PURE__*/React.createElement("option", {
  value: "val1"
}, "Value 1"), /*#__PURE__*/React.createElement("option", {
  value: "val2"
}, "Value 2"), /*#__PURE__*/React.createElement("option", {
  value: "val3"
}, "Value 3")))));
storiesOf('Basics/Form/Button', module).add('sizes', () => /*#__PURE__*/React.createElement(Spaced, null, ['auto', 'flex', '100%'].map(size => /*#__PURE__*/React.createElement(Flexed, {
  key: size,
  label: size
}, /*#__PURE__*/React.createElement(Button, {
  size: size
}, "click this button"))))).add('validations', () => /*#__PURE__*/React.createElement(Spaced, null, ['error', 'warn', 'valid', null].map(valid => /*#__PURE__*/React.createElement(Flexed, {
  key: valid,
  label: String(valid)
}, /*#__PURE__*/React.createElement(Button, {
  size: "100%",
  valid: valid
}, "click this button")))));
storiesOf('Basics/Form/Textarea', module).add('sizes', () => /*#__PURE__*/React.createElement(Spaced, null, ['auto', 'flex', '100%'].map(size => /*#__PURE__*/React.createElement(Flexed, {
  key: size,
  label: size
}, /*#__PURE__*/React.createElement(Textarea, {
  defaultValue: "textarea",
  size: size
}))))).add('validations', () => /*#__PURE__*/React.createElement(Spaced, null, ['error', 'warn', 'valid', null].map(valid => /*#__PURE__*/React.createElement(Flexed, {
  key: valid,
  label: String(valid)
}, /*#__PURE__*/React.createElement(Textarea, {
  defaultValue: "textarea",
  size: "100%",
  valid: valid
}))))).add('alignment', () => /*#__PURE__*/React.createElement(Spaced, null, ['end', 'center', 'start'].map(align => /*#__PURE__*/React.createElement(Flexed, {
  key: align,
  label: align
}, /*#__PURE__*/React.createElement(Textarea, {
  defaultValue: "textarea",
  size: "100%",
  align: align
}))))).add('height', () => /*#__PURE__*/React.createElement(Spaced, null, [100, 200, undefined].map(height => /*#__PURE__*/React.createElement(Flexed, {
  key: (height || 'undefined').toString(),
  label: (height || 'undefined').toString()
}, /*#__PURE__*/React.createElement(Textarea, {
  defaultValue: [...new Array(650)].fill('textarea textvalue').join(' '),
  size: "100%",
  height: height
})))));
storiesOf('Basics/Form/Input', module).add('sizes', () => /*#__PURE__*/React.createElement(Spaced, null, ['auto', 'flex', '100%'].map(size => /*#__PURE__*/React.createElement(Flexed, {
  key: size,
  label: size
}, /*#__PURE__*/React.createElement(Input, {
  defaultValue: "text",
  size: size
}))))).add('validations', () => /*#__PURE__*/React.createElement(Spaced, null, ['error', 'warn', 'valid', null].map(valid => /*#__PURE__*/React.createElement(Flexed, {
  key: valid,
  label: String(valid)
}, /*#__PURE__*/React.createElement(Input, {
  defaultValue: "text",
  size: "100%",
  valid: valid
}))))).add('alignment', () => /*#__PURE__*/React.createElement(Spaced, null, ['end', 'center', 'start'].map(align => /*#__PURE__*/React.createElement(Flexed, {
  key: align,
  label: align
}, /*#__PURE__*/React.createElement(Input, {
  defaultValue: "text",
  size: "100%",
  align: align
})))));