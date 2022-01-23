import "core-js/modules/es.object.assign.js";
import { styled } from '@storybook/theming';
import { Field } from './field/field'; // InputStyleProps import is for TS

import { Input, Select, Textarea, Button } from './input/input';
export var Form = Object.assign(styled.form({
  boxSizing: 'border-box',
  width: '100%'
}), {
  Field: Field,
  Input: Input,
  Select: Select,
  Textarea: Textarea,
  Button: Button
});