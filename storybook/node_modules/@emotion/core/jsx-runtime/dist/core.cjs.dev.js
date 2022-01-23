'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@babel/runtime/helpers/inheritsLoose');
require('react');
require('@emotion/cache');
var emotionElement = require('../../dist/emotion-element-c423a2c0.cjs.dev.js');
require('@emotion/utils');
require('@emotion/serialize');
var ReactJSXRuntime = require('react/jsx-runtime');

var Fragment = ReactJSXRuntime.Fragment;
function jsx(type, props, key) {
  if (!emotionElement.hasOwnProperty.call(props, 'css')) {
    return ReactJSXRuntime.jsx(type, props, key);
  }

  return ReactJSXRuntime.jsx(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
}
function jsxs(type, props, key) {
  if (!emotionElement.hasOwnProperty.call(props, 'css')) {
    return ReactJSXRuntime.jsxs(type, props, key);
  }

  return ReactJSXRuntime.jsxs(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
}

exports.Fragment = Fragment;
exports.jsx = jsx;
exports.jsxs = jsxs;
