import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";
import React, { Suspense } from 'react';
var LazyWithTooltip = /*#__PURE__*/React.lazy(function () {
  return import('./WithTooltip').then(function (mod) {
    return {
      default: mod.WithTooltip
    };
  });
});
export var WithTooltip = function WithTooltip(props) {
  return /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", null)
  }, /*#__PURE__*/React.createElement(LazyWithTooltip, props));
};
WithTooltip.displayName = "WithTooltip";
var LazyWithTooltipPure = /*#__PURE__*/React.lazy(function () {
  return import('./WithTooltip').then(function (mod) {
    return {
      default: mod.WithTooltipPure
    };
  });
});
export var WithTooltipPure = function WithTooltipPure(props) {
  return /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", null)
  }, /*#__PURE__*/React.createElement(LazyWithTooltipPure, props));
};
WithTooltipPure.displayName = "WithTooltipPure";