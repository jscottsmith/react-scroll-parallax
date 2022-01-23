import React from 'react';
import { styled } from '@storybook/theming';
import NotificationItem from './NotificationItem';
const List = styled.div({
  zIndex: 10,
  '> * + *': {
    marginTop: 10
  },
  '&:empty': {
    display: 'none'
  }
}, ({
  placement
}) => placement || {
  bottom: 0,
  left: 0,
  right: 0,
  position: 'fixed'
});

const NotificationList = ({
  notifications,
  clearNotification,
  placement = undefined
}) => /*#__PURE__*/React.createElement(List, {
  placement: placement
}, notifications.map(notification => /*#__PURE__*/React.createElement(NotificationItem, {
  key: notification.id,
  onDismissNotification: id => clearNotification(id),
  notification: notification
})));

NotificationList.displayName = "NotificationList";
export default NotificationList;