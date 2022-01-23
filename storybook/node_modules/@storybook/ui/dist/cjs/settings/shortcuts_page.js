"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortcutsPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _shortcuts = require("./shortcuts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShortcutsPage = function ShortcutsPage() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref) {
    var _ref$api = _ref.api,
        getShortcutKeys = _ref$api.getShortcutKeys,
        getAddonsShortcutLabels = _ref$api.getAddonsShortcutLabels,
        setShortcut = _ref$api.setShortcut,
        restoreDefaultShortcut = _ref$api.restoreDefaultShortcut,
        restoreAllDefaultShortcuts = _ref$api.restoreAllDefaultShortcuts;
    return /*#__PURE__*/_react.default.createElement(_shortcuts.ShortcutsScreen, {
      shortcutKeys: getShortcutKeys(),
      addonsShortcutLabels: getAddonsShortcutLabels(),
      setShortcut: setShortcut,
      restoreDefaultShortcut: restoreDefaultShortcut,
      restoreAllDefaultShortcuts: restoreAllDefaultShortcuts
    });
  });
};

exports.ShortcutsPage = ShortcutsPage;
ShortcutsPage.displayName = "ShortcutsPage";