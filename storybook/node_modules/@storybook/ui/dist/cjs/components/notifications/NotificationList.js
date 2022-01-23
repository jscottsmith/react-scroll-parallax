"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.map.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _NotificationItem = _interopRequireDefault(require("./NotificationItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = _theming.styled.div({
  zIndex: 10,
  '> * + *': {
    marginTop: 10
  },
  '&:empty': {
    display: 'none'
  }
}, function (_ref) {
  var placement = _ref.placement;
  return placement || {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'fixed'
  };
});

var NotificationList = function NotificationList(_ref2) {
  var notifications = _ref2.notifications,
      clearNotification = _ref2.clearNotification,
      _ref2$placement = _ref2.placement,
      placement = _ref2$placement === void 0 ? undefined : _ref2$placement;
  return /*#__PURE__*/_react.default.createElement(List, {
    placement: placement
  }, notifications.map(function (notification) {
    return /*#__PURE__*/_react.default.createElement(_NotificationItem.default, {
      key: notification.id,
      onDismissNotification: function onDismissNotification(id) {
        return clearNotification(id);
      },
      notification: notification
    });
  }));
};

NotificationList.displayName = "NotificationList";
var _default = NotificationList;
exports.default = _default;