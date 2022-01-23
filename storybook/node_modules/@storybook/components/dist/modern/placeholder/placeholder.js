function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Children } from 'react';
import { styled } from '@storybook/theming';
const Title = styled.div(({
  theme
}) => ({
  fontWeight: theme.typography.weight.bold
}));
const Desc = styled.div();
const Message = styled.div(({
  theme
}) => ({
  padding: 30,
  textAlign: 'center',
  color: theme.color.defaultText,
  fontSize: theme.typography.size.s2 - 1
}));
export const Placeholder = (_ref) => {
  let {
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  const [title, desc] = Children.toArray(children);
  return /*#__PURE__*/React.createElement(Message, props, /*#__PURE__*/React.createElement(Title, null, title), desc && /*#__PURE__*/React.createElement(Desc, null, desc));
};
Placeholder.displayName = "Placeholder";