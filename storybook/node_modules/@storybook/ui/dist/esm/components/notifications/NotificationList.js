import "core-js/modules/es.array.map.js";
import React from 'react';
import { styled } from '@storybook/theming';
import NotificationItem from './NotificationItem';
var List = styled.div({
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
  return /*#__PURE__*/React.createElement(List, {
    placement: placement
  }, notifications.map(function (notification) {
    return /*#__PURE__*/React.createElement(NotificationItem, {
      key: notification.id,
      onDismissNotification: function onDismissNotification(id) {
        return clearNotification(id);
      },
      notification: notification
    });
  }));
};

NotificationList.displayName = "NotificationList";
export default NotificationList;