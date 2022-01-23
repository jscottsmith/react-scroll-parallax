import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useCallback } from 'react';
import { styled } from '@storybook/theming';
import ListItem from './ListItem';
var List = styled.div({
  minWidth: 180,
  overflow: 'hidden',
  overflowY: 'auto',
  maxHeight: 13.5 * 32 // 11.5 items

}, function (_ref) {
  var theme = _ref.theme;
  return {
    borderRadius: theme.appBorderRadius * 2
  };
});

var Item = function Item(props) {
  var LinkWrapper = props.LinkWrapper,
      onClickFromProps = props.onClick,
      rest = _objectWithoutProperties(props, ["LinkWrapper", "onClick"]);

  var title = rest.title,
      href = rest.href,
      active = rest.active;
  var onClick = useCallback(function (event) {
    onClickFromProps(event, rest);
  }, [onClickFromProps]);
  var hasOnClick = !!onClickFromProps;
  return /*#__PURE__*/React.createElement(ListItem, _extends({
    title: title,
    active: active,
    href: href,
    LinkWrapper: LinkWrapper
  }, rest, hasOnClick ? {
    onClick: onClick
  } : {}));
};

Item.displayName = "Item";
export var TooltipLinkList = function TooltipLinkList(_ref2) {
  var links = _ref2.links,
      LinkWrapper = _ref2.LinkWrapper;
  return /*#__PURE__*/React.createElement(List, null, links.map(function (_ref3) {
    var isGatsby = _ref3.isGatsby,
        p = _objectWithoutProperties(_ref3, ["isGatsby"]);

    return /*#__PURE__*/React.createElement(Item, _extends({
      key: p.id,
      LinkWrapper: isGatsby ? LinkWrapper : null
    }, p));
  }));
};
TooltipLinkList.displayName = "TooltipLinkList";
TooltipLinkList.defaultProps = {
  LinkWrapper: ListItem.defaultProps.LinkWrapper
};