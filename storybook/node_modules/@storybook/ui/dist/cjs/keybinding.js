"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchesKeyCode = exports.matchesModifiers = void 0;
var codeToKeyMap = {
  // event.code => event.key
  Space: ' ',
  Slash: '/',
  ArrowLeft: 'ArrowLeft',
  ArrowUp: 'ArrowUp',
  ArrowRight: 'ArrowRight',
  ArrowDown: 'ArrowDown',
  Escape: 'Escape',
  Enter: 'Enter'
};
var allFalse = {
  alt: false,
  ctrl: false,
  meta: false,
  shift: false
};

var matchesModifiers = function matchesModifiers(modifiers, event) {
  var _ref = modifiers === false ? allFalse : modifiers,
      alt = _ref.alt,
      ctrl = _ref.ctrl,
      meta = _ref.meta,
      shift = _ref.shift;

  if (typeof alt === 'boolean' && alt !== event.altKey) return false;
  if (typeof ctrl === 'boolean' && ctrl !== event.ctrlKey) return false;
  if (typeof meta === 'boolean' && meta !== event.metaKey) return false;
  if (typeof shift === 'boolean' && shift !== event.shiftKey) return false;
  return true;
};

exports.matchesModifiers = matchesModifiers;

var matchesKeyCode = function matchesKeyCode(code, event) {
  // event.code is preferable but not supported in IE
  return event.code ? event.code === code : event.key === codeToKeyMap[code];
};

exports.matchesKeyCode = matchesKeyCode;