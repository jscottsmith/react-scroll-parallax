function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

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

import global from 'global';
import React, { Component } from 'react';
import { styled } from '@storybook/theming';
import { Sidebar as _Sidebar } from '../sidebar/Sidebar';
import _Panel from '../panel/panel';
import { Preview as _Preview } from '../preview/preview';
import { previewProps } from '../preview/preview.mockdata';
import { mockDataset } from '../sidebar/mockdata';
var setInterval = global.setInterval;
export var shortcuts = {
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
export var panels = {
  test1: {
    title: 'Test 1',
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return active ? /*#__PURE__*/React.createElement("div", {
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
      return active ? /*#__PURE__*/React.createElement("div", {
        id: "test2",
        key: key
      }, "TEST 2") : null;
    }
  }
};
var realSidebarProps = {
  stories: mockDataset.withRoot,
  menu: [],
  refs: {},
  storiesConfigured: true
};
var PlaceholderBlock = styled.div(function (_ref3) {
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
      return /*#__PURE__*/React.createElement(PlaceholderBlock, {
        color: color
      }, /*#__PURE__*/React.createElement("h2", {
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
}(Component);

PlaceholderClock.displayName = "PlaceholderClock";

var MockSidebar = function MockSidebar(props) {
  return /*#__PURE__*/React.createElement(PlaceholderClock, {
    color: "hotpink"
  }, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(props, null, 2)));
};

MockSidebar.displayName = "MockSidebar";

var MockPreview = function MockPreview(props) {
  return /*#__PURE__*/React.createElement(PlaceholderClock, {
    color: "deepskyblue"
  }, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(props, null, 2)));
};

MockPreview.displayName = "MockPreview";

var MockPanel = function MockPanel(props) {
  return /*#__PURE__*/React.createElement(PlaceholderClock, {
    color: "orangered"
  }, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(props, null, 2)));
};

MockPanel.displayName = "MockPanel";
export var MockPage = function MockPage(props) {
  return /*#__PURE__*/React.createElement(PlaceholderClock, {
    color: "cyan"
  }, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(props, null, 2)));
};
MockPage.displayName = "MockPage";
export var mockProps = {
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
export var realProps = {
  Sidebar: function Sidebar() {
    return /*#__PURE__*/React.createElement(_Sidebar, realSidebarProps);
  },
  Preview: function Preview() {
    return /*#__PURE__*/React.createElement(_Preview, previewProps);
  },
  Notifications: function Notifications() {
    return null;
  },
  Panel: function Panel() {
    return /*#__PURE__*/React.createElement(_Panel, {
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