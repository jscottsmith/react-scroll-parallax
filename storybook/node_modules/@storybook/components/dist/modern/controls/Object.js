import global from 'global';
import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { styled, useTheme } from '@storybook/theming'; // @ts-ignore

import { JsonTree, getObjectType } from './react-editable-json-tree';
import { getControlId, getControlSetterButtonId } from './helpers';
import { Form } from '../form';
import { Icons } from '../icon/icon';
import { IconButton } from '../bar/button';
const {
  window: globalWindow
} = global;
const Wrapper = styled.div(({
  theme
}) => ({
  position: 'relative',
  display: 'flex',
  '.rejt-tree': {
    marginLeft: '1rem',
    fontSize: '13px'
  },
  '.rejt-value-node, .rejt-object-node > .rejt-collapsed, .rejt-array-node > .rejt-collapsed, .rejt-object-node > .rejt-not-collapsed, .rejt-array-node > .rejt-not-collapsed': {
    '& > svg': {
      opacity: 0,
      transition: 'opacity 0.2s'
    }
  },
  '.rejt-value-node:hover, .rejt-object-node:hover > .rejt-collapsed, .rejt-array-node:hover > .rejt-collapsed, .rejt-object-node:hover > .rejt-not-collapsed, .rejt-array-node:hover > .rejt-not-collapsed': {
    '& > svg': {
      opacity: 1
    }
  },
  '.rejt-edit-form button': {
    display: 'none'
  },
  '.rejt-add-form': {
    marginLeft: 10
  },
  '.rejt-add-value-node': {
    display: 'inline-flex',
    alignItems: 'center'
  },
  '.rejt-name': {
    lineHeight: '22px'
  },
  '.rejt-not-collapsed-delimiter': {
    lineHeight: '22px'
  },
  '.rejt-plus-menu': {
    marginLeft: 5
  },
  '.rejt-object-node > span > *': {
    position: 'relative',
    zIndex: 2
  },
  '.rejt-object-node, .rejt-array-node': {
    position: 'relative'
  },
  '.rejt-object-node > span:first-of-type::after, .rejt-array-node > span:first-of-type::after, .rejt-collapsed::before, .rejt-not-collapsed::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    display: 'block',
    width: '100%',
    marginLeft: '-1rem',
    padding: '0 4px 0 1rem',
    height: 22
  },
  '.rejt-collapsed::before, .rejt-not-collapsed::before': {
    zIndex: 1,
    background: 'transparent',
    borderRadius: 4,
    transition: 'background 0.2s',
    pointerEvents: 'none',
    opacity: 0.1
  },
  '.rejt-object-node:hover, .rejt-array-node:hover': {
    '& > .rejt-collapsed::before, & > .rejt-not-collapsed::before': {
      background: theme.color.secondary
    }
  },
  '.rejt-collapsed::after, .rejt-not-collapsed::after': {
    content: '""',
    position: 'absolute',
    display: 'inline-block',
    pointerEvents: 'none',
    width: 0,
    height: 0
  },
  '.rejt-collapsed::after': {
    left: -8,
    top: 8,
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    borderLeft: '3px solid rgba(153,153,153,0.6)'
  },
  '.rejt-not-collapsed::after': {
    left: -10,
    top: 10,
    borderTop: '3px solid rgba(153,153,153,0.6)',
    borderLeft: '3px solid transparent',
    borderRight: '3px solid transparent'
  },
  '.rejt-value': {
    display: 'inline-block',
    border: '1px solid transparent',
    borderRadius: 4,
    margin: '1px 0',
    padding: '0 4px',
    cursor: 'text',
    color: theme.color.defaultText
  },
  '.rejt-value-node:hover > .rejt-value': {
    background: theme.background.app,
    borderColor: theme.color.border
  }
}));
const Button = styled.button(({
  theme,
  primary
}) => ({
  border: 0,
  height: 20,
  margin: 1,
  borderRadius: 4,
  background: primary ? theme.color.secondary : 'transparent',
  color: primary ? theme.color.lightest : theme.color.dark,
  fontWeight: primary ? 'bold' : 'normal',
  cursor: 'pointer',
  order: primary ? 'initial' : 9
}));
const ActionIcon = styled(Icons)(({
  theme,
  icon,
  disabled
}) => ({
  display: 'inline-block',
  verticalAlign: 'middle',
  width: 15,
  height: 15,
  padding: 3,
  marginLeft: 5,
  cursor: disabled ? 'not-allowed' : 'pointer',
  color: theme.color.mediumdark,
  '&:hover': disabled ? {} : {
    color: icon === 'subtract' ? theme.color.negative : theme.color.ancillary
  },
  'svg + &': {
    marginLeft: 0
  }
}));
const Input = styled.input(({
  theme,
  placeholder
}) => ({
  outline: 0,
  margin: placeholder ? 1 : '1px 0',
  padding: '3px 4px',
  color: theme.color.defaultText,
  background: theme.background.app,
  border: `1px solid ${theme.color.border}`,
  borderRadius: 4,
  lineHeight: '14px',
  width: placeholder === 'Key' ? 80 : 120,
  '&:focus': {
    border: `1px solid ${theme.color.secondary}`
  }
}));
const RawButton = styled(IconButton)(({
  theme
}) => ({
  position: 'absolute',
  zIndex: 2,
  top: 2,
  right: 2,
  height: 21,
  padding: '0 3px',
  background: theme.background.bar,
  border: `1px solid ${theme.color.border}`,
  borderRadius: 3,
  color: theme.color.mediumdark,
  fontSize: '9px',
  fontWeight: 'bold',
  span: {
    marginLeft: 3,
    marginTop: 1
  }
}));
const RawInput = styled(Form.Textarea)(({
  theme
}) => ({
  flex: 1,
  padding: '7px 6px',
  fontFamily: theme.typography.fonts.mono,
  fontSize: '12px',
  lineHeight: '18px',
  '&::placeholder': {
    fontFamily: theme.typography.fonts.base,
    fontSize: '13px'
  },
  '&:placeholder-shown': {
    padding: '7px 10px'
  }
}));
const ENTER_EVENT = {
  bubbles: true,
  cancelable: true,
  key: 'Enter',
  code: 'Enter',
  keyCode: 13
};

const dispatchEnterKey = event => {
  event.currentTarget.dispatchEvent(new globalWindow.KeyboardEvent('keydown', ENTER_EVENT));
};

const selectValue = event => {
  event.currentTarget.select();
};

const getCustomStyleFunction = theme => () => ({
  name: {
    color: theme.color.secondary
  },
  collapsed: {
    color: theme.color.dark
  },
  ul: {
    listStyle: 'none',
    margin: '0 0 0 1rem',
    padding: 0
  },
  li: {
    outline: 0
  }
});

export const ObjectControl = ({
  name,
  value,
  onChange
}) => {
  const theme = useTheme();
  const data = useMemo(() => value && cloneDeep(value), [value]);
  const hasData = data !== null && data !== undefined;
  const [showRaw, setShowRaw] = useState(!hasData);
  const [parseError, setParseError] = useState(null);
  const updateRaw = useCallback(raw => {
    try {
      if (raw) onChange(JSON.parse(raw));
      setParseError(undefined);
    } catch (e) {
      setParseError(e);
    }
  }, [onChange]);
  const [forceVisible, setForceVisible] = useState(false);
  const onForceVisible = useCallback(() => {
    onChange({});
    setForceVisible(true);
  }, [setForceVisible]);
  const htmlElRef = useRef(null);
  useEffect(() => {
    if (forceVisible && htmlElRef.current) htmlElRef.current.select();
  }, [forceVisible]);

  if (!hasData) {
    return /*#__PURE__*/React.createElement(Form.Button, {
      id: getControlSetterButtonId(name),
      onClick: onForceVisible
    }, "Set object");
  }

  const rawJSONForm = /*#__PURE__*/React.createElement(RawInput, {
    ref: htmlElRef,
    id: getControlId(name),
    name: name,
    defaultValue: value === null ? '' : JSON.stringify(value, null, 2),
    onBlur: event => updateRaw(event.target.value),
    placeholder: "Edit JSON string...",
    autoFocus: forceVisible,
    valid: parseError ? 'error' : null
  });
  return /*#__PURE__*/React.createElement(Wrapper, null, ['Object', 'Array'].includes(getObjectType(data)) && /*#__PURE__*/React.createElement(RawButton, {
    onClick: () => setShowRaw(v => !v)
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: showRaw ? 'eyeclose' : 'eye'
  }), /*#__PURE__*/React.createElement("span", null, "RAW")), !showRaw ? /*#__PURE__*/React.createElement(JsonTree, {
    data: data,
    rootName: name,
    onFullyUpdate: onChange,
    getStyle: getCustomStyleFunction(theme),
    cancelButtonElement: /*#__PURE__*/React.createElement(Button, {
      type: "button"
    }, "Cancel"),
    editButtonElement: /*#__PURE__*/React.createElement(Button, {
      type: "submit"
    }, "Save"),
    addButtonElement: /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      primary: true
    }, "Save"),
    plusMenuElement: /*#__PURE__*/React.createElement(ActionIcon, {
      icon: "add"
    }),
    minusMenuElement: /*#__PURE__*/React.createElement(ActionIcon, {
      icon: "subtract"
    }),
    inputElement: (_, __, ___, key) => key ? /*#__PURE__*/React.createElement(Input, {
      onFocus: selectValue,
      onBlur: dispatchEnterKey
    }) : /*#__PURE__*/React.createElement(Input, null),
    fallback: rawJSONForm
  }) : rawJSONForm);
};
ObjectControl.displayName = "ObjectControl";