import React from 'react';
import { IconButton, IconButtonSkeleton } from './button';
import { Icons } from '../icon/icon';
export default {
  component: IconButton,
  title: 'Basics/IconButton'
};
export var Loading = function Loading() {
  return /*#__PURE__*/React.createElement(IconButtonSkeleton, null);
};
Loading.displayName = "Loading";
// eslint-disable-next-line no-underscore-dangle
export var _IconButton = function _IconButton() {
  return /*#__PURE__*/React.createElement(IconButton, null, /*#__PURE__*/React.createElement(Icons, {
    icon: "bookmark"
  }));
};
_IconButton.displayName = "_IconButton";
export var Active = function Active() {
  return /*#__PURE__*/React.createElement(IconButton, {
    active: true
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "beaker"
  }));
};
Active.displayName = "Active";
export var Disabled = function Disabled() {
  return /*#__PURE__*/React.createElement(IconButton, {
    disabled: true
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "beaker"
  }));
};
Disabled.displayName = "Disabled";
export var WithText = function WithText() {
  return /*#__PURE__*/React.createElement(IconButton, null, /*#__PURE__*/React.createElement(Icons, {
    icon: "circlehollow"
  }), "\xA0Howdy!");
};
WithText.displayName = "WithText";
export var WithTextActive = function WithTextActive() {
  return /*#__PURE__*/React.createElement(IconButton, {
    active: true
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "circlehollow"
  }), "\xA0Howdy!");
};
WithTextActive.displayName = "WithTextActive";
export var WithTextDisabled = function WithTextDisabled() {
  return /*#__PURE__*/React.createElement(IconButton, {
    disabled: true
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "circlehollow"
  }), "\xA0Howdy!");
};
WithTextDisabled.displayName = "WithTextDisabled";