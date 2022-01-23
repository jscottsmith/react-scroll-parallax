import global from 'global';
var globalWindow = global.window;

if (globalWindow) {
  globalWindow.STORYBOOK_ENV = 'react';
}