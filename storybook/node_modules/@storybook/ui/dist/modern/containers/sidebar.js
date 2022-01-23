import React from 'react';
import { Consumer } from '@storybook/api';
import { Sidebar as SidebarComponent } from '../components/sidebar/Sidebar';
import { useMenu } from './menu';
const Sidebar = /*#__PURE__*/React.memo(() => {
  const mapper = ({
    state,
    api
  }) => {
    const {
      ui: {
        name,
        url,
        enableShortcuts
      },
      viewMode,
      storyId,
      refId,
      layout: {
        isToolshown,
        isFullscreen,
        showPanel,
        showNav
      },
      storiesHash,
      storiesConfigured,
      storiesFailed,
      refs
    } = state;
    const menu = useMenu(api, isToolshown, isFullscreen, showPanel, showNav, enableShortcuts);
    return {
      title: name,
      url,
      stories: storiesHash,
      storiesFailed,
      storiesConfigured,
      refs,
      storyId,
      refId,
      viewMode,
      menu,
      menuHighlighted: api.versionUpdateAvailable(),
      enableShortcuts
    };
  };

  return /*#__PURE__*/React.createElement(Consumer, {
    filter: mapper
  }, fromState => {
    return /*#__PURE__*/React.createElement(SidebarComponent, fromState);
  });
});
export default Sidebar;