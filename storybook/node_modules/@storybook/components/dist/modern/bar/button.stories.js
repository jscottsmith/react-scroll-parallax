import React from 'react';
import { IconButton, IconButtonSkeleton } from './button';
import { Icons } from '../icon/icon';
export default {
  component: IconButton,
  title: 'Basics/IconButton'
};
export const Loading = () => /*#__PURE__*/React.createElement(IconButtonSkeleton, null);
Loading.displayName = "Loading";
// eslint-disable-next-line no-underscore-dangle
export const _IconButton = () => /*#__PURE__*/React.createElement(IconButton, null, /*#__PURE__*/React.createElement(Icons, {
  icon: "bookmark"
}));
_IconButton.displayName = "_IconButton";
export const Active = () => /*#__PURE__*/React.createElement(IconButton, {
  active: true
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "beaker"
}));
Active.displayName = "Active";
export const Disabled = () => /*#__PURE__*/React.createElement(IconButton, {
  disabled: true
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "beaker"
}));
Disabled.displayName = "Disabled";
export const WithText = () => /*#__PURE__*/React.createElement(IconButton, null, /*#__PURE__*/React.createElement(Icons, {
  icon: "circlehollow"
}), "\xA0Howdy!");
WithText.displayName = "WithText";
export const WithTextActive = () => /*#__PURE__*/React.createElement(IconButton, {
  active: true
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "circlehollow"
}), "\xA0Howdy!");
WithTextActive.displayName = "WithTextActive";
export const WithTextDisabled = () => /*#__PURE__*/React.createElement(IconButton, {
  disabled: true
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "circlehollow"
}), "\xA0Howdy!");
WithTextDisabled.displayName = "WithTextDisabled";