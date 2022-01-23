"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mobile = void 0;

require("core-js/modules/es.array.map.js");

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _Root = require("./Root");

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

var SIDEBAR = _api.ActiveTabs.SIDEBAR,
    CANVAS = _api.ActiveTabs.CANVAS,
    ADDONS = _api.ActiveTabs.ADDONS;

var Pane = _theming.styled.div({
  transition: 'transform .2s ease',
  position: 'absolute',
  top: 0,
  height: '100%',
  overflow: 'auto'
}, function (_ref) {
  var theme = _ref.theme;
  return {
    background: theme.background.content,
    '&:nth-of-type(1)': {
      borderRight: "1px solid ".concat(theme.appBorderColor)
    },
    '&:nth-of-type(3)': {
      borderLeft: "1px solid ".concat(theme.appBorderColor)
    }
  };
}, function (_ref2) {
  var index = _ref2.index;

  switch (index) {
    case 0:
      {
        return {
          width: '80vw',
          transform: 'translateX(-80vw)',
          left: 0
        };
      }

    case 1:
      {
        return {
          width: '100%',
          transform: 'translateX(0) scale(1)',
          left: 0
        };
      }

    case 2:
      {
        return {
          width: '80vw',
          transform: 'translateX(80vw)',
          right: 0
        };
      }

    default:
      {
        return {};
      }
  }
}, function (_ref3) {
  var active = _ref3.active,
      index = _ref3.index;

  switch (true) {
    case index === 0 && active === SIDEBAR:
      {
        return {
          transform: 'translateX(-0px)'
        };
      }

    case index === 1 && active === SIDEBAR:
      {
        return {
          transform: 'translateX(40vw) translateY(-42.5vh) translateY(40px) scale(0.2)'
        };
      }

    case index === 1 && active === ADDONS:
      {
        return {
          transform: 'translateX(-40vw) translateY(-42.5vh) translateY(40px) scale(0.2)'
        };
      }

    case index === 2 && active === ADDONS:
      {
        return {
          transform: 'translateX(0px)'
        };
      }

    default:
      {
        return {};
      }
  }
});

var Panels = /*#__PURE__*/_react.default.memo(function (_ref4) {
  var children = _ref4.children,
      active = _ref4.active;
  return /*#__PURE__*/_react.default.createElement(PanelsContainer, null, _react.Children.toArray(children).map(function (item, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react.default.createElement(Pane, {
        key: index,
        index: index,
        active: active
      }, item)
    );
  }));
});

Panels.displayName = 'Panels';

var PanelsContainer = _theming.styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: 'calc(100% - 40px)'
});

var Bar = _theming.styled.nav({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100vw',
  height: 40,
  display: 'flex',
  boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1)',
  '& > *': {
    flex: 1
  }
}, function (_ref5) {
  var theme = _ref5.theme;
  return {
    background: theme.barBg
  };
});

var Mobile = /*#__PURE__*/function (_Component) {
  _inherits(Mobile, _Component);

  var _super = _createSuper(Mobile);

  function Mobile(props) {
    var _this;

    _classCallCheck(this, Mobile);

    _this = _super.call(this, props);
    var options = props.options;
    _this.state = {
      active: options.initialActive || SIDEBAR
    };
    return _this;
  }

  _createClass(Mobile, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          Sidebar = _this$props.Sidebar,
          Preview = _this$props.Preview,
          Panel = _this$props.Panel,
          Notifications = _this$props.Notifications,
          pages = _this$props.pages,
          viewMode = _this$props.viewMode,
          options = _this$props.options,
          docsOnly = _this$props.docsOnly;
      var active = this.state.active;
      return /*#__PURE__*/_react.default.createElement(_Root.Root, null, /*#__PURE__*/_react.default.createElement(Notifications, {
        placement: {
          position: 'fixed',
          bottom: 60,
          left: 20,
          right: 20
        }
      }), /*#__PURE__*/_react.default.createElement(Panels, {
        active: active
      }, /*#__PURE__*/_react.default.createElement(Sidebar, null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        hidden: !viewMode
      }, /*#__PURE__*/_react.default.createElement(Preview, {
        isToolshown: options.isToolshown,
        id: "main",
        viewMode: viewMode
      })), pages.map(function (_ref6) {
        var key = _ref6.key,
            Route = _ref6.route,
            Content = _ref6.render;
        return /*#__PURE__*/_react.default.createElement(Route, {
          key: key
        }, /*#__PURE__*/_react.default.createElement(Content, null));
      })), /*#__PURE__*/_react.default.createElement(Panel, {
        hidden: !viewMode
      })), /*#__PURE__*/_react.default.createElement(Bar, null, /*#__PURE__*/_react.default.createElement(_components.TabButton, {
        onClick: function onClick() {
          return _this2.setState({
            active: SIDEBAR
          });
        },
        active: active === SIDEBAR
      }, "Sidebar"), /*#__PURE__*/_react.default.createElement(_components.TabButton, {
        onClick: function onClick() {
          return _this2.setState({
            active: CANVAS
          });
        },
        active: active === CANVAS
      }, viewMode ? 'Canvas' : null, pages.map(function (_ref7) {
        var key = _ref7.key,
            Route = _ref7.route;
        return /*#__PURE__*/_react.default.createElement(Route, {
          key: key
        }, key);
      })), viewMode && !docsOnly ? /*#__PURE__*/_react.default.createElement(_components.TabButton, {
        onClick: function onClick() {
          return _this2.setState({
            active: ADDONS
          });
        },
        active: active === ADDONS
      }, "Addons") : null));
    }
  }]);

  return Mobile;
}(_react.Component);

exports.Mobile = Mobile;
Mobile.displayName = "Mobile";