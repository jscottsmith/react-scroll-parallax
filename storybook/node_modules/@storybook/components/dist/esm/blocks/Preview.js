import "regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import React, { Children, useCallback, useState } from 'react';
import { darken } from 'polished';
import { styled } from '@storybook/theming';
import global from 'global';
import { getBlockBackgroundStyle } from './BlockBackgroundStyles';
import { Source } from './Source';
import { ActionBar } from '../ActionBar/ActionBar';
import { Toolbar } from './Toolbar';
import { ZoomContext } from './ZoomContext';
import { Zoom } from '../Zoom/Zoom';
import { StorySkeleton } from '.';
var ChildrenContainer = styled.div(function (_ref) {
  var isColumn = _ref.isColumn,
      columns = _ref.columns,
      layout = _ref.layout;
  return {
    display: isColumn || !columns ? 'block' : 'flex',
    position: 'relative',
    flexWrap: 'wrap',
    overflow: 'auto',
    flexDirection: isColumn ? 'column' : 'row',
    '& .innerZoomElementWrapper > *': isColumn ? {
      width: layout !== 'fullscreen' ? 'calc(100% - 20px)' : '100%',
      display: 'block'
    } : {
      maxWidth: layout !== 'fullscreen' ? 'calc(100% - 20px)' : '100%',
      display: 'inline-block'
    }
  };
}, function (_ref2) {
  var _ref2$layout = _ref2.layout,
      layout = _ref2$layout === void 0 ? 'padded' : _ref2$layout;
  return layout === 'centered' || layout === 'padded' ? {
    padding: '30px 20px',
    margin: -10,
    '& .innerZoomElementWrapper > *': {
      width: 'auto',
      border: '10px solid transparent!important'
    }
  } : {};
}, function (_ref3) {
  var _ref3$layout = _ref3.layout,
      layout = _ref3$layout === void 0 ? 'padded' : _ref3$layout;
  return layout === 'centered' ? {
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    alignContent: 'center',
    alignItems: 'center'
  } : {};
}, function (_ref4) {
  var columns = _ref4.columns;
  return columns && columns > 1 ? {
    '.innerZoomElementWrapper > *': {
      minWidth: "calc(100% / ".concat(columns, " - 20px)")
    }
  } : {};
});
var StyledSource = styled(Source)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    margin: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.appBorderRadius,
    borderBottomRightRadius: theme.appBorderRadius,
    border: 'none',
    background: theme.base === 'light' ? 'rgba(0, 0, 0, 0.85)' : darken(0.05, theme.background.content),
    color: theme.color.lightest,
    button: {
      background: theme.base === 'light' ? 'rgba(0, 0, 0, 0.85)' : darken(0.05, theme.background.content)
    }
  };
});
var PreviewContainer = styled.div(function (_ref6) {
  var theme = _ref6.theme,
      withSource = _ref6.withSource,
      isExpanded = _ref6.isExpanded;
  return Object.assign({
    position: 'relative',
    overflow: 'hidden',
    margin: '25px 0 40px'
  }, getBlockBackgroundStyle(theme), {
    borderBottomLeftRadius: withSource && isExpanded && 0,
    borderBottomRightRadius: withSource && isExpanded && 0,
    borderBottomWidth: isExpanded && 0
  });
}, function (_ref7) {
  var withToolbar = _ref7.withToolbar;
  return withToolbar && {
    paddingTop: 40
  };
});

var getSource = function getSource(withSource, expanded, setExpanded) {
  switch (true) {
    case !!(withSource && withSource.error):
      {
        return {
          source: null,
          actionItem: {
            title: 'No code available',
            className: 'docblock-code-toggle docblock-code-toggle--disabled',
            disabled: true,
            onClick: function onClick() {
              return setExpanded(false);
            }
          }
        };
      }

    case expanded:
      {
        return {
          source: /*#__PURE__*/React.createElement(StyledSource, _extends({}, withSource, {
            dark: true
          })),
          actionItem: {
            title: 'Hide code',
            className: 'docblock-code-toggle docblock-code-toggle--expanded',
            onClick: function onClick() {
              return setExpanded(false);
            }
          }
        };
      }

    default:
      {
        return {
          source: /*#__PURE__*/React.createElement(StyledSource, _extends({}, withSource, {
            dark: true
          })),
          actionItem: {
            title: 'Show code',
            className: 'docblock-code-toggle',
            onClick: function onClick() {
              return setExpanded(true);
            }
          }
        };
      }
  }
};

function getStoryId(children) {
  if (Children.count(children) === 1) {
    var elt = children;

    if (elt.props) {
      return elt.props.id;
    }
  }

  return null;
}

var PositionedToolbar = styled(Toolbar)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 40
});
var Relative = styled.div({
  overflow: 'hidden',
  position: 'relative'
});

var getLayout = function getLayout(children) {
  return children.reduce(function (result, c) {
    if (result) {
      return result;
    }

    if (typeof c === 'string' || typeof c === 'number') {
      return 'padded';
    }

    return c.props && c.props.parameters && c.props.parameters.layout || 'padded';
  }, undefined);
};
/**
 * A preview component for showing one or more component `Story`
 * items. The preview also shows the source for the component
 * as a drop-down.
 */


export var Preview = function Preview(_ref8) {
  var isLoading = _ref8.isLoading,
      isColumn = _ref8.isColumn,
      columns = _ref8.columns,
      children = _ref8.children,
      withSource = _ref8.withSource,
      _ref8$withToolbar = _ref8.withToolbar,
      withToolbar = _ref8$withToolbar === void 0 ? false : _ref8$withToolbar,
      _ref8$isExpanded = _ref8.isExpanded,
      isExpanded = _ref8$isExpanded === void 0 ? false : _ref8$isExpanded,
      additionalActions = _ref8.additionalActions,
      className = _ref8.className,
      props = _objectWithoutProperties(_ref8, ["isLoading", "isColumn", "columns", "children", "withSource", "withToolbar", "isExpanded", "additionalActions", "className"]);

  var _useState = useState(isExpanded),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var _getSource = getSource(withSource, expanded, setExpanded),
      source = _getSource.source,
      actionItem = _getSource.actionItem;

  var _useState3 = useState(1),
      _useState4 = _slicedToArray(_useState3, 2),
      scale = _useState4[0],
      setScale = _useState4[1];

  var previewClasses = [className].concat(['sbdocs', 'sbdocs-preview']);
  var defaultActionItems = withSource ? [actionItem] : [];

  var _useState5 = useState(additionalActions ? _toConsumableArray(additionalActions) : []),
      _useState6 = _slicedToArray(_useState5, 2),
      additionalActionItems = _useState6[0],
      setAdditionalActionItems = _useState6[1];

  var actionItems = [].concat(defaultActionItems, _toConsumableArray(additionalActionItems)); // @ts-ignore

  var layout = getLayout(Children.count(children) === 1 ? [children] : children);
  var globalWindow = global.window;
  var copyToClipboard = useCallback( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(text) {
      var _yield$import, createCopyToClipboardFunction;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return import('../syntaxhighlighter/syntaxhighlighter');

            case 2:
              _yield$import = _context.sent;
              createCopyToClipboardFunction = _yield$import.createCopyToClipboardFunction;
              createCopyToClipboardFunction();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref9.apply(this, arguments);
    };
  }(), []);

  var onCopyCapture = function onCopyCapture(e) {
    e.preventDefault();

    if (additionalActionItems.filter(function (item) {
      return item.title === 'Copied';
    }).length === 0) {
      copyToClipboard(source.props.code).then(function () {
        setAdditionalActionItems([].concat(_toConsumableArray(additionalActionItems), [{
          title: 'Copied',
          onClick: function onClick() {}
        }]));
        globalWindow.setTimeout(function () {
          return setAdditionalActionItems(additionalActionItems.filter(function (item) {
            return item.title !== 'Copied';
          }));
        }, 1500);
      });
    }
  };

  return /*#__PURE__*/React.createElement(PreviewContainer, _extends({
    withSource: withSource,
    withToolbar: withToolbar
  }, props, {
    className: previewClasses.join(' ')
  }), withToolbar && /*#__PURE__*/React.createElement(PositionedToolbar, {
    isLoading: isLoading,
    border: true,
    zoom: function zoom(z) {
      return setScale(scale * z);
    },
    resetZoom: function resetZoom() {
      return setScale(1);
    },
    storyId: getStoryId(children),
    baseUrl: "./iframe.html"
  }), /*#__PURE__*/React.createElement(ZoomContext.Provider, {
    value: {
      scale: scale
    }
  }, /*#__PURE__*/React.createElement(Relative, {
    className: "docs-story",
    onCopyCapture: withSource && onCopyCapture
  }, /*#__PURE__*/React.createElement(ChildrenContainer, {
    isColumn: isColumn || !Array.isArray(children),
    columns: columns,
    layout: layout
  }, /*#__PURE__*/React.createElement(Zoom.Element, {
    scale: scale
  }, Array.isArray(children) ? // eslint-disable-next-line react/no-array-index-key
  children.map(function (child, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i
    }, child);
  }) : /*#__PURE__*/React.createElement("div", null, children))), /*#__PURE__*/React.createElement(ActionBar, {
    actionItems: actionItems
  }))), withSource && expanded && source);
};
Preview.displayName = "Preview";
var StyledPreview = styled(Preview)(function () {
  return {
    '.docs-story': {
      paddingTop: 32,
      paddingBottom: 40
    }
  };
});
export var PreviewSkeleton = function PreviewSkeleton() {
  return /*#__PURE__*/React.createElement(StyledPreview, {
    isLoading: true,
    withToolbar: true
  }, /*#__PURE__*/React.createElement(StorySkeleton, null));
};
PreviewSkeleton.displayName = "PreviewSkeleton";