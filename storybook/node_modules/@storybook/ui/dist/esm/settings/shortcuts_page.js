import React from 'react';
import { Consumer } from '@storybook/api';
import { ShortcutsScreen } from './shortcuts';

var ShortcutsPage = function ShortcutsPage() {
  return /*#__PURE__*/React.createElement(Consumer, null, function (_ref) {
    var _ref$api = _ref.api,
        getShortcutKeys = _ref$api.getShortcutKeys,
        getAddonsShortcutLabels = _ref$api.getAddonsShortcutLabels,
        setShortcut = _ref$api.setShortcut,
        restoreDefaultShortcut = _ref$api.restoreDefaultShortcut,
        restoreAllDefaultShortcuts = _ref$api.restoreAllDefaultShortcuts;
    return /*#__PURE__*/React.createElement(ShortcutsScreen, {
      shortcutKeys: getShortcutKeys(),
      addonsShortcutLabels: getAddonsShortcutLabels(),
      setShortcut: setShortcut,
      restoreDefaultShortcut: restoreDefaultShortcut,
      restoreAllDefaultShortcuts: restoreAllDefaultShortcuts
    });
  });
};

ShortcutsPage.displayName = "ShortcutsPage";
export { ShortcutsPage };