import "core-js/modules/es.function.name.js";
import React from 'react';
import { Consumer } from '@storybook/api';
import { Sidebar as SidebarComponent } from '../components/sidebar/Sidebar';
import { useMenu } from './menu';
var Sidebar = /*#__PURE__*/React.memo(function () {
  var mapper = function mapper(_ref) {
    var state = _ref.state,
        api = _ref.api;
    var _state$ui = state.ui,
        name = _state$ui.name,
        url = _state$ui.url,
        enableShortcuts = _state$ui.enableShortcuts,
        viewMode = state.viewMode,
        storyId = state.storyId,
        refId = state.refId,
        _state$layout = state.layout,
        isToolshown = _state$layout.isToolshown,
        isFullscreen = _state$layout.isFullscreen,
        showPanel = _state$layout.showPanel,
        showNav = _state$layout.showNav,
        storiesHash = state.storiesHash,
        storiesConfigured = state.storiesConfigured,
        storiesFailed = state.storiesFailed,
        refs = state.refs;
    var menu = useMenu(api, isToolshown, isFullscreen, showPanel, showNav, enableShortcuts);
    return {
      title: name,
      url: url,
      stories: storiesHash,
      storiesFailed: storiesFailed,
      storiesConfigured: storiesConfigured,
      refs: refs,
      storyId: storyId,
      refId: refId,
      viewMode: viewMode,
      menu: menu,
      menuHighlighted: api.versionUpdateAvailable(),
      enableShortcuts: enableShortcuts
    };
  };

  return /*#__PURE__*/React.createElement(Consumer, {
    filter: mapper
  }, function (fromState) {
    return /*#__PURE__*/React.createElement(SidebarComponent, fromState);
  });
});
export default Sidebar;