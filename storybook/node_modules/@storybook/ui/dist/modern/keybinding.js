const codeToKeyMap = {
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
const allFalse = {
  alt: false,
  ctrl: false,
  meta: false,
  shift: false
};
export const matchesModifiers = (modifiers, event) => {
  const {
    alt,
    ctrl,
    meta,
    shift
  } = modifiers === false ? allFalse : modifiers;
  if (typeof alt === 'boolean' && alt !== event.altKey) return false;
  if (typeof ctrl === 'boolean' && ctrl !== event.ctrlKey) return false;
  if (typeof meta === 'boolean' && meta !== event.metaKey) return false;
  if (typeof shift === 'boolean' && shift !== event.shiftKey) return false;
  return true;
};
export const matchesKeyCode = (code, event) => {
  // event.code is preferable but not supported in IE
  return event.code ? event.code === code : event.key === codeToKeyMap[code];
};