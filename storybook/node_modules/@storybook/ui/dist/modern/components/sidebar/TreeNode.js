function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { styled } from '@storybook/theming';
import { Icons } from '@storybook/components';
import global from 'global';
import { transparentize } from 'polished';
import React from 'react';
const {
  DOCS_MODE
} = global;
export const CollapseIcon = styled.span(({
  theme,
  isExpanded
}) => ({
  display: 'inline-block',
  width: 0,
  height: 0,
  marginTop: 6,
  marginLeft: 8,
  marginRight: 5,
  color: transparentize(0.4, theme.color.mediumdark),
  borderTop: '3px solid transparent',
  borderBottom: '3px solid transparent',
  borderLeft: `3px solid`,
  transform: isExpanded ? 'rotateZ(90deg)' : 'none',
  transition: 'transform .1s ease-out'
}));
const iconColors = {
  light: {
    document: DOCS_MODE ? 'secondary' : '#ff8300',
    bookmarkhollow: 'seafoam',
    component: 'secondary',
    folder: 'ultraviolet'
  },
  dark: {
    document: DOCS_MODE ? 'secondary' : 'gold',
    bookmarkhollow: 'seafoam',
    component: 'secondary',
    folder: 'primary'
  }
};

const isColor = (theme, color) => color in theme.color;

const TypeIcon = styled(Icons)({
  width: 12,
  height: 12,
  padding: 1,
  marginTop: 3,
  marginRight: 5,
  flex: '0 0 auto'
}, ({
  theme,
  icon,
  symbol = icon
}) => {
  const colors = theme.base === 'dark' ? iconColors.dark : iconColors.light;
  const color = colors[symbol];
  return {
    color: isColor(theme, color) ? theme.color[color] : color
  };
});
const BranchNode = styled.button(({
  theme,
  depth = 0,
  isExpandable = false
}) => ({
  width: '100%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'start',
  textAlign: 'left',
  padding: 3,
  paddingLeft: `${(isExpandable ? 2 : 18) + depth * 16}px`,
  color: 'inherit',
  fontSize: `${theme.typography.size.s2 - 1}px`,
  background: 'transparent',
  '&:hover, &:focus': {
    background: theme.background.hoverable,
    outline: 'none'
  }
}));
const LeafNode = styled.a(({
  theme,
  depth = 0
}) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'start',
  padding: 3,
  paddingLeft: `${18 + depth * 16}px`,
  fontSize: `${theme.typography.size.s2 - 1}px`,
  textDecoration: 'none',
  color: theme.color.defaultText,
  background: 'transparent',
  '&:hover, &:focus': {
    outline: 'none',
    background: theme.background.hoverable
  },
  '&[data-selected="true"]': {
    color: theme.color.lightest,
    background: theme.color.secondary,
    fontWeight: theme.typography.weight.bold,
    '&:hover, &:focus': {
      background: theme.color.secondary
    },
    svg: {
      color: theme.color.lightest
    }
  }
}));
export const Path = styled.span(({
  theme
}) => ({
  display: 'grid',
  justifyContent: 'start',
  gridAutoColumns: 'auto',
  gridAutoFlow: 'column',
  color: theme.textMutedColor,
  fontSize: `${theme.typography.size.s1 - 1}px`,
  '& > span': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  '& > span + span': {
    position: 'relative',
    marginLeft: 4,
    paddingLeft: 7,
    '&:before': {
      content: "'/'",
      position: 'absolute',
      left: 0
    }
  }
}));
export const RootNode = styled.div(({
  theme
}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  marginTop: 16,
  marginBottom: 4,
  fontSize: `${theme.typography.size.s1 - 1}px`,
  fontWeight: theme.typography.weight.black,
  lineHeight: '16px',
  minHeight: 20,
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: theme.color.mediumdark
}));
export const GroupNode = /*#__PURE__*/React.memo((_ref) => {
  let {
    children,
    isExpanded = false,
    isExpandable = false
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "isExpanded", "isExpandable"]);

  return /*#__PURE__*/React.createElement(BranchNode, _extends({
    isExpandable: isExpandable,
    tabIndex: -1
  }, props), isExpandable ? /*#__PURE__*/React.createElement(CollapseIcon, {
    isExpanded: isExpanded
  }) : null, /*#__PURE__*/React.createElement(TypeIcon, {
    symbol: "folder",
    color: "primary"
  }), children);
});
export const ComponentNode = /*#__PURE__*/React.memo((_ref2) => {
  let {
    children,
    isExpanded,
    isExpandable
  } = _ref2,
      props = _objectWithoutPropertiesLoose(_ref2, ["theme", "children", "isExpanded", "isExpandable", "isSelected"]);

  return /*#__PURE__*/React.createElement(BranchNode, _extends({
    isExpandable: isExpandable,
    tabIndex: -1
  }, props), isExpandable && /*#__PURE__*/React.createElement(CollapseIcon, {
    isExpanded: isExpanded
  }), /*#__PURE__*/React.createElement(TypeIcon, {
    symbol: "component",
    color: "secondary"
  }), children);
});
export const DocumentNode = /*#__PURE__*/React.memo((_ref3) => {
  let {
    children
  } = _ref3,
      props = _objectWithoutPropertiesLoose(_ref3, ["theme", "children"]);

  return /*#__PURE__*/React.createElement(LeafNode, _extends({
    tabIndex: -1
  }, props), /*#__PURE__*/React.createElement(TypeIcon, {
    symbol: "document"
  }), children);
});
export const StoryNode = /*#__PURE__*/React.memo((_ref4) => {
  let {
    children
  } = _ref4,
      props = _objectWithoutPropertiesLoose(_ref4, ["theme", "children"]);

  return /*#__PURE__*/React.createElement(LeafNode, _extends({
    tabIndex: -1
  }, props), /*#__PURE__*/React.createElement(TypeIcon, {
    symbol: "bookmarkhollow"
  }), children);
});