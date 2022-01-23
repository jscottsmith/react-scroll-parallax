function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.assign.js";
import global from 'global';
import React from 'react';
import { Consumer, isRoot, isGroup, isStory } from '@storybook/api';
import { Preview } from '../components/preview/preview';
var PREVIEW_URL = global.PREVIEW_URL;

var splitTitleAddExtraSpace = function splitTitleAddExtraSpace(input) {
  return input.split('/').join(' / ').replace(/\s\s/, ' ');
};

var getDescription = function getDescription(item) {
  if (isRoot(item)) {
    return item.name ? "".concat(item.name, " \u22C5 Storybook") : 'Storybook';
  }

  if (isGroup(item)) {
    return item.name ? "".concat(item.name, " \u22C5 Storybook") : 'Storybook';
  }

  if (isStory(item)) {
    var kind = item.kind,
        name = item.name;
    return kind && name ? splitTitleAddExtraSpace("".concat(kind, " - ").concat(name, " \u22C5 Storybook")) : 'Storybook';
  }

  return 'Storybook';
};

var mapper = function mapper(_ref) {
  var api = _ref.api,
      state = _ref.state;
  var layout = state.layout,
      location = state.location,
      customQueryParams = state.customQueryParams,
      storyId = state.storyId,
      refs = state.refs,
      viewMode = state.viewMode,
      path = state.path,
      refId = state.refId;
  var story = api.getData(storyId, refId);
  var docsOnly = story && story.parameters ? !!story.parameters.docsOnly : false;
  return {
    api: api,
    story: story,
    options: layout,
    description: getDescription(story),
    viewMode: viewMode,
    path: path,
    refs: refs,
    storyId: storyId,
    baseUrl: PREVIEW_URL || 'iframe.html',
    queryParams: customQueryParams,
    docsOnly: docsOnly,
    location: location
  };
};

var PreviewConnected = /*#__PURE__*/React.memo(function (props) {
  return /*#__PURE__*/React.createElement(Consumer, {
    filter: mapper
  }, function (fromState) {
    return /*#__PURE__*/React.createElement(Preview, _extends({}, props, fromState));
  });
});
export default PreviewConnected;