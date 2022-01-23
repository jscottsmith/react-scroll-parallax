"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = exports.Panel = exports.Preview = exports.Main = exports.Sidebar = void 0;

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var persistence = _interopRequireWildcard(require("./persist"));

var _draggers = require("./draggers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var MIN_NAV_WIDTH = 200; // visually there's an additional 10px due to the canvas' left margin

var MIN_CANVAS_WIDTH = 200; // visually it's 10px less due to the canvas' left margin

var MIN_CANVAS_HEIGHT = 200; // visually it's 50px less due to the canvas toolbar and top margin

var MIN_PANEL_WIDTH = 200; // visually it's 10px less due to the canvas' right margin

var MIN_PANEL_HEIGHT = 200; // visually it's 50px less due to the panel toolbar and bottom margin

var DEFAULT_NAV_WIDTH = 220;
var DEFAULT_PANEL_WIDTH = 400;

var Pane = _theming.styled.div({
  position: 'absolute',
  boxSizing: 'border-box',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}, function (_ref) {
  var hidden = _ref.hidden;
  return hidden ? {
    opacity: 0
  } : {
    opacity: 1
  };
}, function (_ref2) {
  var top = _ref2.top;
  return top ? {
    zIndex: 9
  } : {};
}, function (_ref3) {
  var border = _ref3.border,
      theme = _ref3.theme;

  switch (border) {
    case 'left':
      {
        return {
          borderLeft: "1px solid ".concat(theme.appBorderColor)
        };
      }

    case 'right':
      {
        return {
          borderRight: "1px solid ".concat(theme.appBorderColor)
        };
      }

    case 'top':
      {
        return {
          borderTop: "1px solid ".concat(theme.appBorderColor)
        };
      }

    case 'bottom':
      {
        return {
          borderBottom: "1px solid ".concat(theme.appBorderColor)
        };
      }

    default:
      {
        return {};
      }
  }
}, function (_ref4) {
  var animate = _ref4.animate;
  return animate ? {
    transition: ['width', 'height', 'top', 'left', 'background', 'opacity', 'transform'].map(function (p) {
      return "".concat(p, " 0.1s ease-out");
    }).join(',')
  } : {};
});

var Paper = _theming.styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}, function (_ref5) {
  var isFullscreen = _ref5.isFullscreen,
      theme = _ref5.theme;
  return isFullscreen ? {
    boxShadow: 'none',
    borderRadius: 0
  } : {
    borderRadius: theme.appBorderRadius,
    overflow: 'hidden',
    boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1)'
  };
});

var Sidebar = function Sidebar(_ref6) {
  var _ref6$hidden = _ref6.hidden,
      hidden = _ref6$hidden === void 0 ? false : _ref6$hidden,
      children = _ref6.children,
      _ref6$position = _ref6.position,
      position = _ref6$position === void 0 ? undefined : _ref6$position,
      props = _objectWithoutProperties(_ref6, ["hidden", "children", "position"]);

  return hidden ? null : /*#__PURE__*/_react.default.createElement(Pane, _extends({
    style: position
  }, props), children);
};

exports.Sidebar = Sidebar;

var Main = function Main(_ref7) {
  var _ref7$isFullscreen = _ref7.isFullscreen,
      isFullscreen = _ref7$isFullscreen === void 0 ? false : _ref7$isFullscreen,
      children = _ref7.children,
      _ref7$position = _ref7.position,
      position = _ref7$position === void 0 ? undefined : _ref7$position,
      props = _objectWithoutProperties(_ref7, ["isFullscreen", "children", "position"]);

  return /*#__PURE__*/_react.default.createElement(Pane, _extends({
    style: position,
    top: true
  }, props, {
    role: "main"
  }), /*#__PURE__*/_react.default.createElement(Paper, {
    isFullscreen: isFullscreen
  }, children));
};

exports.Main = Main;
Main.displayName = "Main";

var Preview = function Preview(_ref8) {
  var _ref8$hidden = _ref8.hidden,
      hidden = _ref8$hidden === void 0 ? false : _ref8$hidden,
      children = _ref8.children,
      _ref8$position = _ref8.position,
      position = _ref8$position === void 0 ? undefined : _ref8$position,
      props = _objectWithoutProperties(_ref8, ["hidden", "children", "position"]);

  return /*#__PURE__*/_react.default.createElement(Pane, _extends({
    style: position,
    top: true,
    hidden: hidden
  }, props), children);
};

exports.Preview = Preview;
Preview.displayName = "Preview";

var Panel = function Panel(_ref9) {
  var _ref9$hidden = _ref9.hidden,
      hidden = _ref9$hidden === void 0 ? false : _ref9$hidden,
      children = _ref9.children,
      _ref9$position = _ref9.position,
      position = _ref9$position === void 0 ? undefined : _ref9$position,
      _ref9$align = _ref9.align,
      align = _ref9$align === void 0 ? 'right' : _ref9$align,
      props = _objectWithoutProperties(_ref9, ["hidden", "children", "position", "align"]);

  return /*#__PURE__*/_react.default.createElement(Pane, _extends({
    style: position,
    hidden: hidden
  }, props, {
    border: align === 'bottom' ? 'top' : 'left'
  }), children);
};

exports.Panel = Panel;
Panel.displayName = "Panel";

var HoverBlocker = _theming.styled.div({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 15,
  height: '100vh',
  width: '100vw'
});

var getPreviewPosition = function getPreviewPosition(_ref10) {
  var panelPosition = _ref10.panelPosition,
      isPanelHidden = _ref10.isPanelHidden,
      isNavHidden = _ref10.isNavHidden,
      isFullscreen = _ref10.isFullscreen,
      bounds = _ref10.bounds,
      resizerPanel = _ref10.resizerPanel,
      resizerNav = _ref10.resizerNav,
      margin = _ref10.margin;

  if (isFullscreen || isPanelHidden) {
    return {};
  }

  var navX = isNavHidden ? 0 : resizerNav.x;
  var panelX = resizerPanel.x;
  var panelY = resizerPanel.y;
  return panelPosition === 'bottom' ? {
    height: panelY - margin,
    left: 0,
    top: 0,
    width: bounds.width - navX - 2 * margin
  } : {
    height: bounds.height - 2 * margin,
    left: 0,
    top: 0,
    width: panelX - navX - margin
  };
};

var getMainPosition = function getMainPosition(_ref11) {
  var bounds = _ref11.bounds,
      resizerNav = _ref11.resizerNav,
      isNavHidden = _ref11.isNavHidden,
      isFullscreen = _ref11.isFullscreen,
      margin = _ref11.margin;

  if (isFullscreen) {
    return {};
  }

  var navX = isNavHidden ? 0 : resizerNav.x;
  return {
    height: bounds.height - margin * 2,
    left: navX + margin,
    top: margin,
    width: bounds.width - navX - margin * 2
  };
};

var getPanelPosition = function getPanelPosition(_ref12) {
  var isPanelBottom = _ref12.isPanelBottom,
      isPanelHidden = _ref12.isPanelHidden,
      isNavHidden = _ref12.isNavHidden,
      bounds = _ref12.bounds,
      resizerPanel = _ref12.resizerPanel,
      resizerNav = _ref12.resizerNav,
      margin = _ref12.margin;
  var navX = isNavHidden ? 0 : resizerNav.x;
  var panelX = resizerPanel.x;
  var panelY = resizerPanel.y;

  if (isPanelBottom && isPanelHidden) {
    return {
      height: bounds.height - panelY - margin,
      left: 0,
      top: panelY - margin,
      width: bounds.width - navX - 2 * margin
    };
  }

  if (!isPanelBottom && isPanelHidden) {
    return {
      height: bounds.height - 2 * margin,
      left: panelX - navX - margin,
      top: 0,
      width: bounds.width - panelX - margin
    };
  }

  return isPanelBottom ? {
    height: bounds.height - panelY - margin,
    left: 0,
    top: panelY - margin,
    width: bounds.width - navX - 2 * margin
  } : {
    height: bounds.height - 2 * margin,
    left: panelX - navX - margin,
    top: 0,
    width: bounds.width - panelX - margin
  };
};

var Layout = /*#__PURE__*/function (_Component) {
  _inherits(Layout, _Component);

  var _super = _createSuper(Layout);

  function Layout(props) {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.call(this, props);

    _this.resizeNav = function (e, data) {
      if (data.deltaX) {
        _this.setState({
          resizerNav: {
            x: data.x,
            y: data.y
          }
        });
      }
    };

    _this.resizePanel = function (e, data) {
      var options = _this.props.options;

      if (data.deltaY && options.panelPosition === 'bottom' || data.deltaX && options.panelPosition === 'right') {
        _this.setState({
          resizerPanel: {
            x: data.x,
            y: data.y
          }
        });
      }
    };

    _this.setDragNav = function () {
      _this.setState({
        isDragging: 'nav'
      });
    };

    _this.setDragPanel = function () {
      _this.setState({
        isDragging: 'panel'
      });
    };

    _this.unsetDrag = function () {
      _this.setState({
        isDragging: false
      });
    };

    var bounds = props.bounds,
        _options = props.options;

    var _persistence$get = persistence.get(),
        resizerNav = _persistence$get.resizerNav,
        resizerPanel = _persistence$get.resizerPanel;

    _this.state = {
      isDragging: false,
      resizerNav: resizerNav || {
        x: DEFAULT_NAV_WIDTH,
        y: 0
      },
      resizerPanel: resizerPanel || (_options.panelPosition === 'bottom' ? {
        x: 0,
        y: Math.round(bounds.height * 0.6)
      } : {
        x: bounds.width - DEFAULT_PANEL_WIDTH,
        y: 0
      })
    };
    return _this;
  }

  _createClass(Layout, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$state = this.state,
          resizerPanel = _this$state.resizerPanel,
          resizerNav = _this$state.resizerNav;
      persistence.set({
        resizerPanel: resizerPanel,
        resizerNav: resizerNav
      });
      var _prevProps$bounds = prevProps.bounds,
          prevWidth = _prevProps$bounds.width,
          prevHeight = _prevProps$bounds.height;
      var _this$props = this.props,
          bounds = _this$props.bounds,
          options = _this$props.options;
      var width = bounds.width,
          height = bounds.height;

      if (width !== prevWidth || height !== prevHeight) {
        var panelPosition = options.panelPosition;
        var isPanelBottom = panelPosition === 'bottom';

        if (isPanelBottom) {
          this.setState({
            resizerPanel: {
              x: prevState.resizerPanel.x,
              y: prevState.resizerPanel.y - (prevHeight - height)
            }
          });
        } else {
          this.setState({
            resizerPanel: {
              x: prevState.resizerPanel.x - (prevWidth - width),
              y: prevState.resizerPanel.y
            }
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          bounds = _this$props2.bounds,
          options = _this$props2.options,
          theme = _this$props2.theme,
          viewMode = _this$props2.viewMode,
          docsOnly = _this$props2.docsOnly,
          panelCount = _this$props2.panelCount;
      var _this$state2 = this.state,
          isDragging = _this$state2.isDragging,
          resizerNav = _this$state2.resizerNav,
          resizerPanel = _this$state2.resizerPanel;
      var margin = theme.layoutMargin;
      var isNavHidden = options.isFullscreen || !options.showNav;
      var isPanelHidden = options.isFullscreen || !options.showPanel || docsOnly || viewMode !== 'story' || panelCount === 0;
      var isFullscreen = options.isFullscreen || isNavHidden && isPanelHidden;
      var isToolshown = options.isToolshown;
      var panelPosition = options.panelPosition;
      var isPanelBottom = panelPosition === 'bottom';
      var isPanelRight = panelPosition === 'right';
      var panelX = resizerPanel.x;
      var navX = resizerNav.x;
      return bounds ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, isNavHidden ? null : /*#__PURE__*/_react.default.createElement(_draggers.Draggable, {
        axis: "x",
        position: resizerNav,
        bounds: {
          left: MIN_NAV_WIDTH,
          top: 0,
          right: isPanelRight && !isPanelHidden ? panelX - MIN_CANVAS_WIDTH : bounds.width - MIN_CANVAS_WIDTH,
          bottom: 0
        },
        onStart: this.setDragNav,
        onDrag: this.resizeNav,
        onStop: this.unsetDrag
      }, /*#__PURE__*/_react.default.createElement(_draggers.Handle, {
        axis: "x",
        isDragging: isDragging === 'nav'
      })), isPanelHidden ? null : /*#__PURE__*/_react.default.createElement(_draggers.Draggable, {
        axis: isPanelBottom ? 'y' : 'x',
        position: resizerPanel,
        bounds: isPanelBottom ? {
          left: 0,
          top: MIN_CANVAS_HEIGHT,
          right: 0,
          bottom: bounds.height - MIN_PANEL_HEIGHT
        } : {
          left: isNavHidden ? MIN_CANVAS_WIDTH : navX + MIN_CANVAS_WIDTH,
          top: 0,
          right: bounds.width - MIN_PANEL_WIDTH,
          bottom: 0
        },
        onStart: this.setDragPanel,
        onDrag: this.resizePanel,
        onStop: this.unsetDrag
      }, /*#__PURE__*/_react.default.createElement(_draggers.Handle, {
        isDragging: isDragging === 'panel',
        style: isPanelBottom ? {
          left: navX + margin,
          width: bounds.width - navX - 2 * margin,
          marginTop: -margin
        } : {
          marginLeft: -margin
        },
        axis: isPanelBottom ? 'y' : 'x'
      })), isDragging ? /*#__PURE__*/_react.default.createElement(HoverBlocker, null) : null, children({
        mainProps: {
          viewMode: viewMode,
          animate: !isDragging,
          isFullscreen: isFullscreen,
          position: getMainPosition({
            bounds: bounds,
            resizerNav: resizerNav,
            isNavHidden: isNavHidden,
            isFullscreen: isFullscreen,
            margin: margin
          })
        },
        previewProps: {
          viewMode: viewMode,
          docsOnly: docsOnly,
          animate: !isDragging,
          isFullscreen: isFullscreen,
          isToolshown: isToolshown,
          position: getPreviewPosition({
            isFullscreen: isFullscreen,
            isNavHidden: isNavHidden,
            isPanelHidden: isPanelHidden,
            resizerNav: resizerNav,
            resizerPanel: resizerPanel,
            bounds: bounds,
            panelPosition: panelPosition,
            margin: margin
          })
        },
        navProps: {
          viewMode: viewMode,
          animate: !isDragging,
          hidden: isNavHidden,
          position: {
            height: bounds.height,
            left: 0,
            top: 0,
            width: navX + margin
          }
        },
        panelProps: {
          viewMode: viewMode,
          animate: !isDragging,
          align: options.panelPosition,
          hidden: isPanelHidden,
          position: getPanelPosition({
            isPanelBottom: isPanelBottom,
            isPanelHidden: isPanelHidden,
            isNavHidden: isNavHidden,
            bounds: bounds,
            resizerPanel: resizerPanel,
            resizerNav: resizerNav,
            margin: margin
          })
        }
      })) : null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var bounds = props.bounds,
          options = props.options;
      var resizerPanel = state.resizerPanel,
          resizerNav = state.resizerNav;
      var isNavHidden = options.isFullscreen || !options.showNav;
      var isPanelHidden = options.isFullscreen || !options.showPanel;
      var panelPosition = options.panelPosition;
      var isPanelRight = panelPosition === 'right';
      var isPanelBottom = panelPosition === 'bottom';
      var navX = resizerNav.x;
      var panelX = resizerPanel.x;
      var panelY = resizerPanel.y;
      var mutation = {};

      if (!isNavHidden) {
        var minPanelWidth = !isPanelHidden && isPanelRight ? MIN_PANEL_WIDTH : 0;
        var minMainWidth = MIN_CANVAS_WIDTH + minPanelWidth;
        var maxNavX = bounds.width - minMainWidth;
        var minNavX = MIN_NAV_WIDTH; // coordinate translates directly to width here

        if (navX > maxNavX) {
          // upper bound
          mutation.resizerNav = {
            x: maxNavX,
            y: 0
          };
        } else if (navX < minNavX || maxNavX < minNavX) {
          // lower bound, supercedes upper bound if needed
          mutation.resizerNav = {
            x: minNavX,
            y: 0
          };
        }
      }

      if (isPanelRight && !isPanelHidden) {
        var maxPanelX = bounds.width - MIN_PANEL_WIDTH;
        var minPanelX = navX + MIN_CANVAS_WIDTH;

        if (panelX > maxPanelX || panelX === 0) {
          // upper bound or when switching orientation
          mutation.resizerPanel = {
            x: maxPanelX,
            y: 0
          };
        } else if (panelX < minPanelX) {
          // lower bound
          mutation.resizerPanel = {
            x: minPanelX,
            y: 0
          };
        }
      }

      if (isPanelBottom && !isPanelHidden) {
        var maxPanelY = bounds.height - MIN_PANEL_HEIGHT;

        if (panelY > maxPanelY || panelY === 0) {
          // lower bound or when switching orientation
          mutation.resizerPanel = {
            x: 0,
            y: bounds.height - 200
          };
        } // upper bound is enforced by the Draggable's bounds

      }

      return mutation.resizerPanel || mutation.resizerNav ? Object.assign({}, state, mutation) : state;
    }
  }]);

  return Layout;
}(_react.Component);

Layout.displayName = "Layout";
Layout.defaultProps = {
  viewMode: undefined,
  docsOnly: false
};
var ThemedLayout = (0, _theming.withTheme)(Layout);
exports.Layout = ThemedLayout;