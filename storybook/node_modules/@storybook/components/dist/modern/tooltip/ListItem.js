function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import memoize from 'memoizerific';
import { transparentize } from 'polished';
const Title = styled((_ref) => {
  let rest = _objectWithoutPropertiesLoose(_ref, ["active", "loading", "disabled"]);

  return /*#__PURE__*/React.createElement("span", rest);
})(({
  theme
}) => ({
  color: theme.color.defaultText,
  // Previously was theme.typography.weight.normal but this weight does not exists in Theme
  fontWeight: theme.typography.weight.regular
}), ({
  active,
  theme
}) => active ? {
  color: theme.color.primary,
  fontWeight: theme.typography.weight.bold
} : {}, ({
  loading,
  theme
}) => loading ? Object.assign({
  display: 'inline-block',
  flex: 'none'
}, theme.animation.inlineGlow) : {}, ({
  disabled,
  theme
}) => disabled ? {
  color: transparentize(0.7, theme.color.defaultText)
} : {});
const Right = styled.span({
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
}, ({
  active,
  theme
}) => active ? {
  '& svg': {
    opacity: 1
  },
  '& path': {
    fill: theme.color.primary
  }
} : {});
const Center = styled.span({
  flex: 1,
  textAlign: 'left',
  display: 'inline-flex',
  '& > * + *': {
    paddingLeft: 10
  }
});
const CenterText = styled.span({
  flex: 1,
  textAlign: 'center'
}, ({
  active,
  theme
}) => active ? {
  color: theme.color.primary
} : {}, ({
  theme,
  disabled
}) => disabled ? {
  color: theme.color.mediumdark
} : {});
const Left = styled.span(({
  active,
  theme
}) => active ? {
  '& svg': {
    opacity: 1
  },
  '& path': {
    fill: theme.color.primary
  }
} : {});
const Item = styled.a(({
  theme
}) => ({
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
}), ({
  disabled
}) => disabled ? {
  cursor: 'not-allowed'
} : {});
const getItemProps = memoize(100)((onClick, href, LinkWrapper) => {
  const result = {};

  if (onClick) {
    Object.assign(result, {
      onClick
    });
  }

  if (href) {
    Object.assign(result, {
      href
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

const ListItem = (_ref2) => {
  let {
    loading,
    left,
    title,
    center,
    right,
    active,
    disabled,
    href,
    onClick,
    LinkWrapper
  } = _ref2,
      rest = _objectWithoutPropertiesLoose(_ref2, ["loading", "left", "title", "center", "right", "active", "disabled", "href", "onClick", "LinkWrapper"]);

  const itemProps = getItemProps(onClick, href, LinkWrapper);
  const commonProps = {
    active,
    disabled
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