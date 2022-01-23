"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("@babel/runtime/helpers/inheritsLoose"), require("react"), require("@emotion/cache");

var emotionElement = require("../../dist/emotion-element-968a0f7e.cjs.prod.js");

require("@emotion/utils"), require("@emotion/serialize");

var ReactJSXRuntime = require("react/jsx-runtime"), Fragment = ReactJSXRuntime.Fragment;

function jsx(type, props, key) {
  return emotionElement.hasOwnProperty.call(props, "css") ? ReactJSXRuntime.jsx(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key) : ReactJSXRuntime.jsx(type, props, key);
}

function jsxs(type, props, key) {
  return emotionElement.hasOwnProperty.call(props, "css") ? ReactJSXRuntime.jsxs(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key) : ReactJSXRuntime.jsxs(type, props, key);
}

exports.Fragment = Fragment, exports.jsx = jsx, exports.jsxs = jsxs;
