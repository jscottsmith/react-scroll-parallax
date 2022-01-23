import React, { Component } from 'react';
import { useStorybookApi } from '@storybook/api';
import { AboutScreen } from './about'; // Clear a notification on mount. This could be exported by core/notifications.js perhaps?

class NotificationClearer extends Component {
  componentDidMount() {
    const {
      api,
      notificationId
    } = this.props;
    api.clearNotification(notificationId);
  }

  render() {
    const {
      children
    } = this.props;
    return children;
  }

}

NotificationClearer.displayName = "NotificationClearer";

const AboutPage = () => {
  const api = useStorybookApi();
  return /*#__PURE__*/React.createElement(NotificationClearer, {
    api: api,
    notificationId: "update"
  }, /*#__PURE__*/React.createElement(AboutScreen, {
    current: api.getCurrentVersion(),
    latest: api.getLatestVersion()
  }));
};

AboutPage.displayName = "AboutPage";
export { AboutPage };