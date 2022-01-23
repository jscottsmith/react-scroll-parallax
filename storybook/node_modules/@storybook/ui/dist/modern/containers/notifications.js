function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Consumer, useStorybookApi } from '@storybook/api';
import NotificationList from '../components/notifications/NotificationList';
export const mapper = ({
  state
}) => {
  const {
    clearNotification
  } = useStorybookApi();
  const {
    notifications
  } = state;
  return {
    notifications,
    clearNotification
  };
};

const NotificationConnect = props => /*#__PURE__*/React.createElement(Consumer, {
  filter: mapper
}, fromState => /*#__PURE__*/React.createElement(NotificationList, _extends({}, props, fromState)));

NotificationConnect.displayName = "NotificationConnect";
export default NotificationConnect;