function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import { Link } from '../typography/link/link';
const Title = styled.div(({
  theme
}) => ({
  fontWeight: theme.typography.weight.black
}));
const Desc = styled.span();
const Links = styled.div(({
  theme
}) => ({
  marginTop: 8,
  textAlign: 'center',
  '> *': {
    margin: '0 8px',
    fontWeight: theme.typography.weight.black
  }
}));
const Message = styled.div(({
  theme
}) => ({
  color: theme.textColor,
  lineHeight: '18px'
}));
const MessageWrapper = styled.div({
  padding: 15,
  width: 280,
  boxSizing: 'border-box'
});
export const TooltipMessage = ({
  title,
  desc,
  links
}) => {
  return /*#__PURE__*/React.createElement(MessageWrapper, null, /*#__PURE__*/React.createElement(Message, null, title && /*#__PURE__*/React.createElement(Title, null, title), desc && /*#__PURE__*/React.createElement(Desc, null, desc)), links && /*#__PURE__*/React.createElement(Links, null, links.map((_ref) => {
    let {
      title: linkTitle
    } = _ref,
        other = _objectWithoutPropertiesLoose(_ref, ["title"]);

    return /*#__PURE__*/React.createElement(Link, _extends({}, other, {
      key: linkTitle
    }), linkTitle);
  })));
};
TooltipMessage.displayName = "TooltipMessage";
TooltipMessage.defaultProps = {
  title: null,
  desc: null,
  links: null
};