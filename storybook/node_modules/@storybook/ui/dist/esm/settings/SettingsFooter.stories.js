import React from 'react';
import SettingsFooter from './SettingsFooter';
export default {
  component: SettingsFooter,
  title: 'UI/Settings/SettingsFooter',
  decorators: [function (StoryFn, c) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '600px',
        margin: '2rem auto'
      }
    }, /*#__PURE__*/React.createElement(StoryFn, c));
  }]
};
export var Basic = function Basic() {
  return /*#__PURE__*/React.createElement(SettingsFooter, null);
};
Basic.displayName = "Basic";