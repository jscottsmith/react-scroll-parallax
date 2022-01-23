"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideBySide = void 0;

var _theming = require("@storybook/theming");

var SideBySide = _theming.styled.div({
  display: 'grid',
  gridColumnGap: 30,
  gridTemplateColumns: '1fr 1fr',
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  overflow: 'auto',
  top: 0,
  left: 0,
  '& > *': {
    padding: 20
  }
});

exports.SideBySide = SideBySide;