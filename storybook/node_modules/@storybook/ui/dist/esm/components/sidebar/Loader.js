import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.fill.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.map.js";
import React, { Fragment } from 'react';
import { styled } from '@storybook/theming';
var LOADER_SEQUENCE = [0, 0, 1, 1, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3];
var Loadingitem = styled.div({
  cursor: 'progress',
  fontSize: 13,
  height: '16px',
  marginTop: 4,
  marginBottom: 4,
  alignItems: 'center',
  overflow: 'hidden'
}, function (_ref) {
  var _ref$depth = _ref.depth,
      depth = _ref$depth === void 0 ? 0 : _ref$depth;
  return {
    marginLeft: depth * 15,
    maxWidth: 85 - depth * 5
  };
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.animation.inlineGlow;
}, function (_ref3) {
  var theme = _ref3.theme;
  return {
    background: theme.appBorderColor
  };
});
export var Contained = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 20,
  paddingRight: 20
});
export var Loader = function Loader(_ref4) {
  var size = _ref4.size;
  var repeats = Math.ceil(size / LOADER_SEQUENCE.length); // Creates an array that repeats LOADER_SEQUENCE depths in order, until the size is reached.

  var sequence = Array.from(Array(repeats)).fill(LOADER_SEQUENCE).flat().slice(0, size);
  return /*#__PURE__*/React.createElement(Fragment, null, sequence.map(function (depth, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Loadingitem, {
        depth: depth,
        key: index
      })
    );
  }));
};
Loader.displayName = "Loader";