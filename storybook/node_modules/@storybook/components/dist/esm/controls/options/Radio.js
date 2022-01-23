import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.concat.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { logger } from '@storybook/client-logger';
import { selectedKey } from './helpers';
import { getControlId } from '../helpers';
var Wrapper = styled.div(function (_ref) {
  var isInline = _ref.isInline;
  return isInline ? {
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
  };
});
var Fieldset = styled.fieldset({
  border: 0,
  padding: 0,
  margin: 0
});
var Text = styled.span({});
var Label = styled.label({
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
export var RadioControl = function RadioControl(_ref2) {
  var name = _ref2.name,
      options = _ref2.options,
      value = _ref2.value,
      _onChange = _ref2.onChange,
      isInline = _ref2.isInline;

  if (!options) {
    logger.warn("Radio with no options: ".concat(name));
    return /*#__PURE__*/React.createElement(React.Fragment, null, "-");
  }

  var selection = selectedKey(value, options);
  var controlId = getControlId(name);
  return /*#__PURE__*/React.createElement(Wrapper, {
    isInline: isInline
  }, Object.keys(options).map(function (key, index) {
    var id = "".concat(controlId, "-").concat(index);
    return /*#__PURE__*/React.createElement(Label, {
      key: id,
      htmlFor: id
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      id: id,
      name: id,
      value: key,
      onChange: function onChange(e) {
        return _onChange(options[e.currentTarget.value]);
      },
      checked: key === selection
    }), /*#__PURE__*/React.createElement(Text, null, key));
  }));
};
RadioControl.displayName = "RadioControl";