import React from 'react';
import SettingsFooter from './SettingsFooter';
export default {
  component: SettingsFooter,
  title: 'UI/Settings/SettingsFooter',
  decorators: [(StoryFn, c) => /*#__PURE__*/React.createElement("div", {
    style: {
      width: '600px',
      margin: '2rem auto'
    }
  }, /*#__PURE__*/React.createElement(StoryFn, c))]
};
export const Basic = () => /*#__PURE__*/React.createElement(SettingsFooter, null);
Basic.displayName = "Basic";