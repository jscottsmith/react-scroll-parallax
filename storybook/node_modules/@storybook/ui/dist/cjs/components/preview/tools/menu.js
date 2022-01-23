"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuTool = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _api = require("@storybook/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menuMapper = function menuMapper(_ref) {
  var api = _ref.api,
      state = _ref.state;
  return {
    isVisible: state.layout.showNav,
    singleStory: state.singleStory,
    toggle: function toggle() {
      return api.toggleNav();
    }
  };
};

var menuTool = {
  title: 'menu',
  id: 'menu',
  match: function match(_ref2) {
    var viewMode = _ref2.viewMode;
    return viewMode === 'story';
  },
  render: function render() {
    return /*#__PURE__*/_react.default.createElement(_api.Consumer, {
      filter: menuMapper
    }, function (_ref3) {
      var isVisible = _ref3.isVisible,
          toggle = _ref3.toggle,
          singleStory = _ref3.singleStory;
      return !singleStory && !isVisible && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_components.IconButton, {
        "aria-label": "Show sidebar",
        key: "menu",
        onClick: toggle,
        title: "Show sidebar"
      }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
        icon: "menu"
      })), /*#__PURE__*/_react.default.createElement(_components.Separator, null));
    });
  }
};
exports.menuTool = menuTool;