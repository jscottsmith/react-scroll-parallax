import "core-js/modules/es.object.assign.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { actions as makeActions } from '@storybook/addon-actions';
import { PureReleaseNotesScreen } from './release_notes';
export default {
  component: PureReleaseNotesScreen,
  title: 'UI/Settings/ReleaseNotes'
};
var actions = makeActions('setLoaded', 'onClose');
var VERSION = '6.0.0';
export var Loading = function Loading() {
  return /*#__PURE__*/React.createElement(PureReleaseNotesScreen, _extends({
    didHitMaxWaitTime: false,
    isLoaded: false,
    version: VERSION
  }, actions));
};
Loading.displayName = "Loading";
export var DidHitMaxWaitTime = function DidHitMaxWaitTime() {
  return /*#__PURE__*/React.createElement(PureReleaseNotesScreen, _extends({
    didHitMaxWaitTime: true,
    isLoaded: false,
    version: VERSION
  }, actions));
};
DidHitMaxWaitTime.displayName = "DidHitMaxWaitTime";