import "core-js/modules/es.array.concat.js";
import global from 'global';
import React from 'react';
import { IconButton, Icons } from '@storybook/components';
import { Consumer } from '@storybook/api';
import { stringifyQueryParams } from '../utils/stringifyQueryParams';
var PREVIEW_URL = global.PREVIEW_URL;

var ejectMapper = function ejectMapper(_ref) {
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

export var ejectTool = {
  title: 'eject',
  id: 'eject',
  match: function match(_ref2) {
    var viewMode = _ref2.viewMode;
    return viewMode === 'story';
  },
  render: function render() {
    return /*#__PURE__*/React.createElement(Consumer, {
      filter: ejectMapper
    }, function (_ref3) {
      var baseUrl = _ref3.baseUrl,
          storyId = _ref3.storyId,
          queryParams = _ref3.queryParams;
      return storyId ? /*#__PURE__*/React.createElement(IconButton, {
        key: "opener",
        href: "".concat(baseUrl, "?id=").concat(storyId).concat(stringifyQueryParams(queryParams)),
        target: "_blank",
        title: "Open canvas in new tab"
      }, /*#__PURE__*/React.createElement(Icons, {
        icon: "sharealt"
      })) : null;
    });
  }
};