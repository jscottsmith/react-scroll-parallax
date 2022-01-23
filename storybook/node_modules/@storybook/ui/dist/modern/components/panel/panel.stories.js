import React from 'react';
import { action } from '@storybook/addon-actions';
import Panel from './panel';
import { panels, shortcuts } from '../layout/app.mockdata';
const onSelect = action('onSelect');
const toggleVisibility = action('toggleVisibility');
const togglePosition = action('togglePosition');
export default {
  title: 'UI/Panel',
  component: Panel
};
export const Default = () => /*#__PURE__*/React.createElement(Panel, {
  absolute: false,
  panels: panels,
  actions: {
    onSelect,
    toggleVisibility,
    togglePosition
  },
  selectedPanel: "test2",
  shortcuts: shortcuts
});
Default.displayName = "Default";
export const NoPanels = () => /*#__PURE__*/React.createElement(Panel, {
  panels: {},
  actions: {
    onSelect,
    toggleVisibility,
    togglePosition
  },
  shortcuts: shortcuts
});
NoPanels.displayName = "NoPanels";