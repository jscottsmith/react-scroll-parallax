function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import memoize from 'memoizerific';
import { Consumer } from '@storybook/api';
import AddonPanel from '../components/panel/panel';
const createPanelActions = memoize(1)(api => ({
  onSelect: panel => api.setSelectedPanel(panel),
  toggleVisibility: () => api.togglePanel(),
  togglePosition: () => api.togglePanelPosition()
}));

const mapper = ({
  state,
  api
}) => ({
  panels: api.getStoryPanels(),
  selectedPanel: api.getSelectedPanel(),
  panelPosition: state.layout.panelPosition,
  actions: createPanelActions(api),
  shortcuts: api.getShortcutKeys()
});

const Panel = props => /*#__PURE__*/React.createElement(Consumer, {
  filter: mapper
}, customProps => /*#__PURE__*/React.createElement(AddonPanel, _extends({}, props, customProps)));

Panel.displayName = "Panel";
export default Panel;