function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.string.bold.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";
import { styled } from '@storybook/theming';
import { Icons } from '@storybook/components';
import global from 'global';
import { transparentize } from 'polished';
import React from 'react';
var DOCS_MODE = global.DOCS_MODE;
export var CollapseIcon = styled.span(function (_ref) {
  var theme = _ref.theme,
      isExpanded = _ref.isExpanded;
  return {
    display: 'inline-block',
    width: 0,
    height: 0,
    marginTop: 6,
    marginLeft: 8,
    marginRight: 5,
    color: transparentize(0.4, theme.color.mediumdark),
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    borderLeft: "3px solid",
    transform: isExpanded ? 'rotateZ(90deg)' : 'none',
    transition: 'transform .1s ease-out'
  };
});
var iconColors = {
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

var isColor = function isColor(theme, color) {
  return color in theme.color;
};

var TypeIcon = styled(Icons)({
  width: 12,
  height: 12,
  padding: 1,
  marginTop: 3,
  marginRight: 5,
  flex: '0 0 auto'
}, function (_ref2) {
  var theme = _ref2.theme,
      icon = _ref2.icon,
      _ref2$symbol = _ref2.symbol,
      symbol = _ref2$symbol === void 0 ? icon : _ref2$symbol;
  var colors = theme.base === 'dark' ? iconColors.dark : iconColors.light;
  var color = colors[symbol];
  return {
    color: isColor(theme, color) ? theme.color[color] : color
  };
});
var BranchNode = styled.button(function (_ref3) {
  var theme = _ref3.theme,
      _ref3$depth = _ref3.depth,
      depth = _ref3$depth === void 0 ? 0 : _ref3$depth,
      _ref3$isExpandable = _ref3.isExpandable,
      isExpandable = _ref3$isExpandable === void 0 ? false : _ref3$isExpandable;
  return {
    width: '100%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'start',
    textAlign: 'left',
    padding: 3,
    paddingLeft: "".concat((isExpandable ? 2 : 18) + depth * 16, "px"),
    color: 'inherit',
    fontSize: "".concat(theme.typography.size.s2 - 1, "px"),
    background: 'transparent',
    '&:hover, &:focus': {
      background: theme.background.hoverable,
      outline: 'none'
    }
  };
});
var LeafNode = styled.a(function (_ref4) {
  var theme = _ref4.theme,
      _ref4$depth = _ref4.depth,
      depth = _ref4$depth === void 0 ? 0 : _ref4$depth;
  return {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'start',
    padding: 3,
    paddingLeft: "".concat(18 + depth * 16, "px"),
    fontSize: "".concat(theme.typography.size.s2 - 1, "px"),
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
  };
});
export var Path = styled.span(function (_ref5) {
  var theme = _ref5.theme;
  return {
    display: 'grid',
    justifyContent: 'start',
    gridAutoColumns: 'auto',
    gridAutoFlow: 'column',
    color: theme.textMutedColor,
    fontSize: "".concat(theme.typography.size.s1 - 1, "px"),
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
  };
});
export var RootNode = styled.div(function (_ref6) {
  var theme = _ref6.theme;
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    marginTop: 16,
    marginBottom: 4,
    fontSize: "".concat(theme.typography.size.s1 - 1, "px"),
    fontWeight: theme.typography.weight.black,
    lineHeight: '16px',
    minHeight: 20,
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: theme.color.mediumdark
  };
});
export var GroupNode = /*#__PURE__*/React.memo(function (_ref7) {
  var children = _ref7.children,
      _ref7$isExpanded = _ref7.isExpanded,
      isExpanded = _ref7$isExpanded === void 0 ? false : _ref7$isExpanded,
      _ref7$isExpandable = _ref7.isExpandable,
      isExpandable = _ref7$isExpandable === void 0 ? false : _ref7$isExpandable,
      props = _objectWithoutProperties(_ref7, ["children", "isExpanded", "isExpandable"]);

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
export var ComponentNode = /*#__PURE__*/React.memo(function (_ref8) {
  var theme = _ref8.theme,
      children = _ref8.children,
      isExpanded = _ref8.isExpanded,
      isExpandable = _ref8.isExpandable,
      isSelected = _ref8.isSelected,
      props = _objectWithoutProperties(_ref8, ["theme", "children", "isExpanded", "isExpandable", "isSelected"]);

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
export var DocumentNode = /*#__PURE__*/React.memo(function (_ref9) {
  var theme = _ref9.theme,
      children = _ref9.children,
      props = _objectWithoutProperties(_ref9, ["theme", "children"]);

  return /*#__PURE__*/React.createElement(LeafNode, _extends({
    tabIndex: -1
  }, props), /*#__PURE__*/React.createElement(TypeIcon, {
    symbol: "document"
  }), children);
});
export var StoryNode = /*#__PURE__*/React.memo(function (_ref10) {
  var theme = _ref10.theme,
      children = _ref10.children,
      props = _objectWithoutProperties(_ref10, ["theme", "children"]);

  return /*#__PURE__*/React.createElement(LeafNode, _extends({
    tabIndex: -1
  }, props), /*#__PURE__*/React.createElement(TypeIcon, {
    symbol: "bookmarkhollow"
  }), children);
});