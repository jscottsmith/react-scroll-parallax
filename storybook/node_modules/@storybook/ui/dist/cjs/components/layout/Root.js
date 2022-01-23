"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Root = void 0;

var _theming = require("@storybook/theming");

var Root = _theming.styled.div({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden'
});

exports.Root = Root;