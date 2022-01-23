import React from 'react';
import { action } from '@storybook/addon-actions';
import Panel from './panel';
import { panels, shortcuts } from '../layout/app.mockdata';
var onSelect = action('onSelect');
var toggleVisibility = action('toggleVisibility');
var togglePosition = action('togglePosition');
export default {
  title: 'UI/Panel',
  component: Panel
};
export var Default = function Default() {
  return /*#__PURE__*/React.createElement(Panel, {
    absolute: false,
    panels: panels,
    actions: {
      onSelect: onSelect,
      toggleVisibility: toggleVisibility,
      togglePosition: togglePosition
    },
    selectedPanel: "test2",
    shortcuts: shortcuts
  });
};
Default.displayName = "Default";
export var NoPanels = function NoPanels() {
  return /*#__PURE__*/React.createElement(Panel, {
    panels: {},
    actions: {
      onSelect: onSelect,
      toggleVisibility: toggleVisibility,
      togglePosition: togglePosition
    },
    shortcuts: shortcuts
  });
};
NoPanels.displayName = "NoPanels";