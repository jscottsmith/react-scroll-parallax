import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import memoize from 'memoizerific';
import { Consumer } from '@storybook/api';
import AddonPanel from '../components/panel/panel';
var createPanelActions = memoize(1)(function (api) {
  return {
    onSelect: function onSelect(panel) {
      return api.setSelectedPanel(panel);
    },
    toggleVisibility: function toggleVisibility() {
      return api.togglePanel();
    },
    togglePosition: function togglePosition() {
      return api.togglePanelPosition();
    }
  };
});

var mapper = function mapper(_ref) {
  var state = _ref.state,
      api = _ref.api;
  return {
    panels: api.getStoryPanels(),
    selectedPanel: api.getSelectedPanel(),
    panelPosition: state.layout.panelPosition,
    actions: createPanelActions(api),
    shortcuts: api.getShortcutKeys()
  };
};

var Panel = function Panel(props) {
  return /*#__PURE__*/React.createElement(Consumer, {
    filter: mapper
  }, function (customProps) {
    return /*#__PURE__*/React.createElement(AddonPanel, _extends({}, props, customProps));
  });
};

Panel.displayName = "Panel";
export default Panel;