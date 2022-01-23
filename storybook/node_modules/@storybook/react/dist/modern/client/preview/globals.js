import global from 'global';
const {
  window: globalWindow
} = global;

if (globalWindow) {
  globalWindow.STORYBOOK_ENV = 'react';
}