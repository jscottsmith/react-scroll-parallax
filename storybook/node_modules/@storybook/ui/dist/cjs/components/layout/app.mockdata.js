"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
exports.realProps = exports.mockProps = exports.MockPage = exports.panels = exports.shortcuts = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _global = _interopRequireDefault(require("global"));

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _Sidebar2 = require("../sidebar/Sidebar");

var _panel = _interopRequireDefault(require("../panel/panel"));

var _preview = require("../preview/preview");

var _preview2 = require("../preview/preview.mockdata");

var _mockdata = require("../sidebar/mockdata");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var setInterval = _global.default.setInterval;
var shortcuts = {
  fullScreen: ['F'],
  togglePanel: ['A'],
  panelPosition: ['D'],
  toggleNav: ['S'],
  toolbar: ['T'],
  search: ['/'],
  focusNav: ['1'],
  focusIframe: ['2'],
  focusPanel: ['3'],
  prevComponent: ['alt', 'ArrowUp'],
  nextComponent: ['alt', 'ArrowDown'],
  prevStory: ['alt', 'ArrowLeft'],
  nextStory: ['alt', 'ArrowRight'],
  shortcutsPage: ['ctrl', 'shift', ','],
  aboutPage: [','],
  escape: ['escape'],
  collapseAll: ['ctrl', 'shift', 'ArrowUp'],
  expandAll: ['ctrl', 'shift', 'ArrowDown']
};
exports.shortcuts = shortcuts;
var panels = {
  test1: {
    title: 'Test 1',
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return active ? /*#__PURE__*/_react.default.createElement("div", {
        id: "test1",
        key: key
      }, "TEST 1") : null;
    }
  },
  test2: {
    title: 'Test 2',
    render: function render(_ref2) {
      var active = _ref2.active,
          key = _ref2.key;
      return active ? /*#__PURE__*/_react.default.createElement("div", {
        id: "test2",
        key: key
      }, "TEST 2") : null;
    }
  }
};
exports.panels = panels;
var realSidebarProps = {
  stories: _mockdata.mockDataset.withRoot,
  menu: [],
  refs: {},
  storiesConfigured: true
};

var PlaceholderBlock = _theming.styled.div(function (_ref3) {
  var color = _ref3.color;
  return {
    background: color || 'hotpink',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  };
});

var PlaceholderClock = /*#__PURE__*/function (_Component) {
  _inherits(PlaceholderClock, _Component);

  var _super = _createSuper(PlaceholderClock);

  function PlaceholderClock() {
    var _this;

    _classCallCheck(this, PlaceholderClock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      count: 1
    };
    _this.interval = void 0;
    return _this;
  }

  _createClass(PlaceholderClock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        var count = _this2.state.count;

        _this2.setState({
          count: count + 1
        });
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var interval = this.interval;
      clearInterval(interval);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          color = _this$props.color;
      var count = this.state.count;
      return /*#__PURE__*/_react.default.createElement(PlaceholderBlock, {
        color: color
      }, /*#__PURE__*/_react.default.createElement("h2", {
        style: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          color: 'rgba(0,0,0,0.2)',
          fontSize: '150px',
          lineHeight: '150px',
          margin: '-20px'
        }
      }, count), children);
    }
  }]);

  return PlaceholderClock;
}(_react.Component);

PlaceholderClock.displayName = "PlaceholderClock";

var MockSidebar = function MockSidebar(props) {
  return /*#__PURE__*/_react.default.createElement(PlaceholderClock, {
    color: "hotpink"
  }, /*#__PURE__*/_react.default.createElement("pre", null, JSON.stringify(props, null, 2)));
};

MockSidebar.displayName = "MockSidebar";

var MockPreview = function MockPreview(props) {
  return /*#__PURE__*/_react.default.createElement(PlaceholderClock, {
    color: "deepskyblue"
  }, /*#__PURE__*/_react.default.createElement("pre", null, JSON.stringify(props, null, 2)));
};

MockPreview.displayName = "MockPreview";

var MockPanel = function MockPanel(props) {
  return /*#__PURE__*/_react.default.createElement(PlaceholderClock, {
    color: "orangered"
  }, /*#__PURE__*/_react.default.createElement("pre", null, JSON.stringify(props, null, 2)));
};

MockPanel.displayName = "MockPanel";

var MockPage = function MockPage(props) {
  return /*#__PURE__*/_react.default.createElement(PlaceholderClock, {
    color: "cyan"
  }, /*#__PURE__*/_react.default.createElement("pre", null, JSON.stringify(props, null, 2)));
};

exports.MockPage = MockPage;
MockPage.displayName = "MockPage";
var mockProps = {
  Sidebar: MockSidebar,
  Preview: MockPreview,
  Panel: MockPanel,
  Notifications: function Notifications() {
    return null;
  },
  pages: [],
  options: {
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    isToolshown: true,
    initialActive: 'canvas'
  },
  viewMode: 'story',
  panelCount: 2,
  width: 900,
  height: 600,
  docsOnly: false
};
exports.mockProps = mockProps;
var realProps = {
  Sidebar: function Sidebar() {
    return /*#__PURE__*/_react.default.createElement(_Sidebar2.Sidebar, realSidebarProps);
  },
  Preview: function Preview() {
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _preview2.previewProps);
  },
  Notifications: function Notifications() {
    return null;
  },
  Panel: function Panel() {
    return /*#__PURE__*/_react.default.createElement(_panel.default, {
      panels: panels,
      actions: {
        onSelect: function onSelect() {},
        toggleVisibility: function toggleVisibility() {},
        togglePosition: function togglePosition() {}
      },
      selectedPanel: "test2",
      panelPosition: "bottom",
      shortcuts: shortcuts,
      absolute: false
    });
  },
  pages: [],
  options: {
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    isToolshown: true,
    initialActive: 'canvas'
  },
  viewMode: 'story',
  panelCount: 2,
  width: 900,
  height: 600,
  docsOnly: false
};
exports.realProps = realProps;