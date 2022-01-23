import React, { Suspense } from 'react';
export * from './types';
export * from './Boolean';
const LazyColorControl = /*#__PURE__*/React.lazy(() => import('./Color'));
export const ColorControl = props => /*#__PURE__*/React.createElement(Suspense, {
  fallback: /*#__PURE__*/React.createElement("div", null)
}, /*#__PURE__*/React.createElement(LazyColorControl, props));
ColorControl.displayName = "ColorControl";
export * from './Date';
export * from './Number';
export * from './options';
export * from './Object';
export * from './Range';
export * from './Text';
export * from './Files';