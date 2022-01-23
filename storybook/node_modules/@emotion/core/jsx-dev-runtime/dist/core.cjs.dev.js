'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('@babel/runtime/helpers/inheritsLoose');
require('react');
require('@emotion/cache');
var emotionElement = require('../../dist/emotion-element-c423a2c0.cjs.dev.js');
require('@emotion/utils');
require('@emotion/serialize');
var ReactJSXRuntimeDev = require('react/jsx-dev-runtime');

var Fragment = ReactJSXRuntimeDev.Fragment;
function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (!emotionElement.hasOwnProperty.call(props, 'css')) {
    return ReactJSXRuntimeDev.jsxDEV(type, props, key, isStaticChildren, source, self);
  }

  return ReactJSXRuntimeDev.jsxDEV(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key, isStaticChildren, source, self);
}

exports.Fragment = Fragment;
exports.jsxDEV = jsxDEV;
