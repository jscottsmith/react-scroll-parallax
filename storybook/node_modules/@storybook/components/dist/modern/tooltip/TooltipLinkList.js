function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback } from 'react';
import { styled } from '@storybook/theming';
import ListItem from './ListItem';
const List = styled.div({
  minWidth: 180,
  overflow: 'hidden',
  overflowY: 'auto',
  maxHeight: 13.5 * 32 // 11.5 items

}, ({
  theme
}) => ({
  borderRadius: theme.appBorderRadius * 2
}));

const Item = props => {
  const {
    LinkWrapper,
    onClick: onClickFromProps
  } = props,
        rest = _objectWithoutPropertiesLoose(props, ["LinkWrapper", "onClick"]);

  const {
    title,
    href,
    active
  } = rest;
  const onClick = useCallback(event => {
    onClickFromProps(event, rest);
  }, [onClickFromProps]);
  const hasOnClick = !!onClickFromProps;
  return /*#__PURE__*/React.createElement(ListItem, _extends({
    title: title,
    active: active,
    href: href,
    LinkWrapper: LinkWrapper
  }, rest, hasOnClick ? {
    onClick
  } : {}));
};

Item.displayName = "Item";
export const TooltipLinkList = ({
  links,
  LinkWrapper
}) => /*#__PURE__*/React.createElement(List, null, links.map((_ref) => {
  let {
    isGatsby
  } = _ref,
      p = _objectWithoutPropertiesLoose(_ref, ["isGatsby"]);

  return /*#__PURE__*/React.createElement(Item, _extends({
    key: p.id,
    LinkWrapper: isGatsby ? LinkWrapper : null
  }, p));
}));
TooltipLinkList.displayName = "TooltipLinkList";
TooltipLinkList.defaultProps = {
  LinkWrapper: ListItem.defaultProps.LinkWrapper
};