function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.string.bold.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import memoize from 'memoizerific';
import { transparentize } from 'polished';
var Title = styled(function (_ref) {
  var active = _ref.active,
      loading = _ref.loading,
      disabled = _ref.disabled,
      rest = _objectWithoutProperties(_ref, ["active", "loading", "disabled"]);

  return /*#__PURE__*/React.createElement("span", rest);
})(function (_ref2) {
  var theme = _ref2.theme;
  return {
    color: theme.color.defaultText,
    // Previously was theme.typography.weight.normal but this weight does not exists in Theme
    fontWeight: theme.typography.weight.regular
  };
}, function (_ref3) {
  var active = _ref3.active,
      theme = _ref3.theme;
  return active ? {
    color: theme.color.primary,
    fontWeight: theme.typography.weight.bold
  } : {};
}, function (_ref4) {
  var loading = _ref4.loading,
      theme = _ref4.theme;
  return loading ? Object.assign({
    display: 'inline-block',
    flex: 'none'
  }, theme.animation.inlineGlow) : {};
}, function (_ref5) {
  var disabled = _ref5.disabled,
      theme = _ref5.theme;
  return disabled ? {
    color: transparentize(0.7, theme.color.defaultText)
  } : {};
});
var Right = styled.span({
  '& svg': {
    transition: 'all 200ms ease-out',
    opacity: 0,
    height: 12,
    width: 12,
    margin: '3px 0',
    verticalAlign: 'top'
  },
  '& path': {
    fill: 'inherit'
  }
}, function (_ref6) {
  var active = _ref6.active,
      theme = _ref6.theme;
  return active ? {
    '& svg': {
      opacity: 1
    },
    '& path': {
      fill: theme.color.primary
    }
  } : {};
});
var Center = styled.span({
  flex: 1,
  textAlign: 'left',
  display: 'inline-flex',
  '& > * + *': {
    paddingLeft: 10
  }
});
var CenterText = styled.span({
  flex: 1,
  textAlign: 'center'
}, function (_ref7) {
  var active = _ref7.active,
      theme = _ref7.theme;
  return active ? {
    color: theme.color.primary
  } : {};
}, function (_ref8) {
  var theme = _ref8.theme,
      disabled = _ref8.disabled;
  return disabled ? {
    color: theme.color.mediumdark
  } : {};
});
var Left = styled.span(function (_ref9) {
  var active = _ref9.active,
      theme = _ref9.theme;
  return active ? {
    '& svg': {
      opacity: 1
    },
    '& path': {
      fill: theme.color.primary
    }
  } : {};
});
var Item = styled.a(function (_ref10) {
  var theme = _ref10.theme;
  return {
    fontSize: theme.typography.size.s1,
    transition: 'all 150ms ease-out',
    color: transparentize(0.5, theme.color.defaultText),
    textDecoration: 'none',
    cursor: 'pointer',
    justifyContent: 'space-between',
    lineHeight: '18px',
    padding: '7px 15px',
    display: 'flex',
    alignItems: 'center',
    '& > * + *': {
      paddingLeft: 10
    },
    '&:hover': {
      background: theme.background.hoverable
    },
    '&:hover svg': {
      opacity: 1
    }
  };
}, function (_ref11) {
  var disabled = _ref11.disabled;
  return disabled ? {
    cursor: 'not-allowed'
  } : {};
});
var getItemProps = memoize(100)(function (onClick, href, LinkWrapper) {
  var result = {};

  if (onClick) {
    Object.assign(result, {
      onClick: onClick
    });
  }

  if (href) {
    Object.assign(result, {
      href: href
    });
  }

  if (LinkWrapper && href) {
    Object.assign(result, {
      to: href,
      as: LinkWrapper
    });
  }

  return result;
});

var ListItem = function ListItem(_ref12) {
  var loading = _ref12.loading,
      left = _ref12.left,
      title = _ref12.title,
      center = _ref12.center,
      right = _ref12.right,
      active = _ref12.active,
      disabled = _ref12.disabled,
      href = _ref12.href,
      onClick = _ref12.onClick,
      LinkWrapper = _ref12.LinkWrapper,
      rest = _objectWithoutProperties(_ref12, ["loading", "left", "title", "center", "right", "active", "disabled", "href", "onClick", "LinkWrapper"]);

  var itemProps = getItemProps(onClick, href, LinkWrapper);
  var commonProps = {
    active: active,
    disabled: disabled
  };
  return /*#__PURE__*/React.createElement(Item, _extends({}, commonProps, rest, itemProps), left && /*#__PURE__*/React.createElement(Left, commonProps, left), title || center ? /*#__PURE__*/React.createElement(Center, null, title && /*#__PURE__*/React.createElement(Title, _extends({}, commonProps, {
    loading: loading
  }), title), center && /*#__PURE__*/React.createElement(CenterText, commonProps, center)) : null, right && /*#__PURE__*/React.createElement(Right, commonProps, right));
};

ListItem.displayName = "ListItem";
ListItem.defaultProps = {
  loading: false,
  left: null,
  title: /*#__PURE__*/React.createElement("span", null, "Loading state"),
  center: null,
  right: null,
  active: false,
  disabled: false,
  href: null,
  LinkWrapper: null,
  onClick: null
};
export default ListItem;