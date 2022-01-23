import React from 'react';
import { Consumer } from '@storybook/api';
import { ShortcutsScreen } from './shortcuts';

const ShortcutsPage = () => /*#__PURE__*/React.createElement(Consumer, null, ({
  api: {
    getShortcutKeys,
    getAddonsShortcutLabels,
    setShortcut,
    restoreDefaultShortcut,
    restoreAllDefaultShortcuts
  }
}) => /*#__PURE__*/React.createElement(ShortcutsScreen, {
  shortcutKeys: getShortcutKeys(),
  addonsShortcutLabels: getAddonsShortcutLabels(),
  setShortcut,
  restoreDefaultShortcut,
  restoreAllDefaultShortcuts
}));

ShortcutsPage.displayName = "ShortcutsPage";
export { ShortcutsPage };