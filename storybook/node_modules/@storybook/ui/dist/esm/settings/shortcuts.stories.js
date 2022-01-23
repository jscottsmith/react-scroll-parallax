import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { actions as makeActions } from '@storybook/addon-actions';
import { ShortcutsScreen } from './shortcuts';
var defaultShortcuts = {
  fullScreen: ['F'],
  togglePanel: ['A'],
  panelPosition: ['D'],
  toggleNav: ['S'],
  toolbar: ['T'],
  search: ['/'],
  focusNav: ['1'],
  focusIframe: ['2'],
  focusPanel: ['3'],
  prevComponent: ['alt', 'ArrowUp'],
  nextComponent: ['alt', 'ArrowDown'],
  prevStory: ['alt', 'ArrowLeft'],
  nextStory: ['alt', 'ArrowRight'],
  shortcutsPage: ['ctrl', 'shift', ','],
  aboutPage: [','],
  escape: ['escape'],
  // This one is not customizable
  collapseAll: ['ctrl', 'shift', 'ArrowUp'],
  expandAll: ['ctrl', 'shift', 'ArrowDown']
};
var actions = makeActions('setShortcut', 'restoreDefaultShortcut', 'restoreAllDefaultShortcuts', 'onClose');
export default {
  component: ShortcutsScreen,
  title: 'UI/Settings/ShortcutsScreen',
  decorators: [function (StoryFn, c) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 'calc(100vh)',
        width: 'calc(100vw)'
      }
    }, /*#__PURE__*/React.createElement(StoryFn, c));
  }]
};
export var Defaults = function Defaults() {
  return /*#__PURE__*/React.createElement(ShortcutsScreen, _extends({
    shortcutKeys: defaultShortcuts
  }, actions));
};
Defaults.displayName = "Defaults";
Defaults.storyName = 'default shortcuts';