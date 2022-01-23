function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";

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

import React, { Component, Fragment } from 'react';
import { shortcutToHumanString } from '@storybook/api/shortcut';
import { styled } from '@storybook/theming';
import { Tabs, Icons, IconButton } from '@storybook/components';
var DesktopOnlyIconButton = styled(IconButton)({
  // Hides full screen icon at mobile breakpoint defined in app.js
  '@media (max-width: 599px)': {
    display: 'none'
  }
});
var SafeTabContent = /*#__PURE__*/React.memo(function (_ref) {
  var children = _ref.children;
  return children;
});

var SafeTab = /*#__PURE__*/function (_Component) {
  _inherits(SafeTab, _Component);

  var _super = _createSuper(SafeTab);

  function SafeTab(props) {
    var _this;

    _classCallCheck(this, SafeTab);

    _this = _super.call(this, props);
    _this.state = {
      hasError: false
    };
    return _this;
  }

  _createClass(SafeTab, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({
        hasError: true
      }); // eslint-disable-next-line no-console

      console.error(error, info);
    }
  }, {
    key: "render",
    value: function render() {
      var hasError = this.state.hasError;
      var _this$props = this.props,
          children = _this$props.children,
          title = _this$props.title,
          id = _this$props.id;

      if (hasError) {
        return /*#__PURE__*/React.createElement("h1", null, "Something went wrong.");
      }

      return /*#__PURE__*/React.createElement(SafeTabContent, {
        id: id,
        title: title
      }, children);
    }
  }]);

  return SafeTab;
}(Component);

SafeTab.displayName = "SafeTab";
var AddonPanel = /*#__PURE__*/React.memo(function (_ref2) {
  var panels = _ref2.panels,
      shortcuts = _ref2.shortcuts,
      actions = _ref2.actions,
      _ref2$selectedPanel = _ref2.selectedPanel,
      selectedPanel = _ref2$selectedPanel === void 0 ? null : _ref2$selectedPanel,
      _ref2$panelPosition = _ref2.panelPosition,
      panelPosition = _ref2$panelPosition === void 0 ? 'right' : _ref2$panelPosition,
      _ref2$absolute = _ref2.absolute,
      absolute = _ref2$absolute === void 0 ? true : _ref2$absolute;
  return /*#__PURE__*/React.createElement(Tabs, {
    absolute: absolute,
    selected: selectedPanel,
    actions: actions,
    tools: /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(DesktopOnlyIconButton, {
      key: "position",
      onClick: actions.togglePosition,
      title: "Change addon orientation [".concat(shortcutToHumanString(shortcuts.panelPosition), "]")
    }, /*#__PURE__*/React.createElement(Icons, {
      icon: panelPosition === 'bottom' ? 'sidebaralt' : 'bottombar'
    })), /*#__PURE__*/React.createElement(DesktopOnlyIconButton, {
      key: "visibility",
      onClick: actions.toggleVisibility,
      title: "Hide addons [".concat(shortcutToHumanString(shortcuts.togglePanel), "]")
    }, /*#__PURE__*/React.createElement(Icons, {
      icon: "close"
    }))),
    id: "storybook-panel-root"
  }, Object.entries(panels).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return /*#__PURE__*/React.createElement(SafeTab, {
      key: k,
      id: k,
      title: v.title
    }, v.render);
  }));
});
AddonPanel.displayName = 'AddonPanel';
export default AddonPanel;