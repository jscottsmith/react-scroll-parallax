import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Consumer, useStorybookApi } from '@storybook/api';
import NotificationList from '../components/notifications/NotificationList';
export var mapper = function mapper(_ref) {
  var state = _ref.state;

  var _useStorybookApi = useStorybookApi(),
      clearNotification = _useStorybookApi.clearNotification;

  var notifications = state.notifications;
  return {
    notifications: notifications,
    clearNotification: clearNotification
  };
};

var NotificationConnect = function NotificationConnect(props) {
  return /*#__PURE__*/React.createElement(Consumer, {
    filter: mapper
  }, function (fromState) {
    return /*#__PURE__*/React.createElement(NotificationList, _extends({}, props, fromState));
  });
};

NotificationConnect.displayName = "NotificationConnect";
export default NotificationConnect;