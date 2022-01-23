import React, { Suspense } from 'react';
const LazyWithTooltip = /*#__PURE__*/React.lazy(() => import('./WithTooltip').then(mod => ({
  default: mod.WithTooltip
})));
export const WithTooltip = props => /*#__PURE__*/React.createElement(Suspense, {
  fallback: /*#__PURE__*/React.createElement("div", null)
}, /*#__PURE__*/React.createElement(LazyWithTooltip, props));
WithTooltip.displayName = "WithTooltip";
const LazyWithTooltipPure = /*#__PURE__*/React.lazy(() => import('./WithTooltip').then(mod => ({
  default: mod.WithTooltipPure
})));
export const WithTooltipPure = props => /*#__PURE__*/React.createElement(Suspense, {
  fallback: /*#__PURE__*/React.createElement("div", null)
}, /*#__PURE__*/React.createElement(LazyWithTooltipPure, props));
WithTooltipPure.displayName = "WithTooltipPure";