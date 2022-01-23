import "core-js/modules/es.array.concat.js";
import global from 'global';
import React from 'react';
import copy from 'copy-to-clipboard';
import { IconButton, Icons } from '@storybook/components';
import { Consumer } from '@storybook/api';
import { stringifyQueryParams } from '../utils/stringifyQueryParams';
var PREVIEW_URL = global.PREVIEW_URL;

var copyMapper = function copyMapper(_ref) {
  var state = _ref.state;
  var storyId = state.storyId,
      refId = state.refId,
      refs = state.refs;
  var ref = refs[refId];
  return {
    refId: refId,
    baseUrl: ref ? "".concat(ref.url, "/iframe.html") : PREVIEW_URL || 'iframe.html',
    storyId: storyId,
    queryParams: state.customQueryParams
  };
};

export var copyTool = {
  title: 'copy',
  id: 'copy',
  match: function match(_ref2) {
    var viewMode = _ref2.viewMode;
    return viewMode === 'story';
  },
  render: function render() {
    return /*#__PURE__*/React.createElement(Consumer, {
      filter: copyMapper
    }, function (_ref3) {
      var baseUrl = _ref3.baseUrl,
          storyId = _ref3.storyId,
          queryParams = _ref3.queryParams;
      return storyId ? /*#__PURE__*/React.createElement(IconButton, {
        key: "copy",
        onClick: function onClick() {
          return copy("".concat(baseUrl, "?id=").concat(storyId).concat(stringifyQueryParams(queryParams)));
        },
        title: "Copy canvas link"
      }, /*#__PURE__*/React.createElement(Icons, {
        icon: "link"
      })) : null;
    });
  }
};