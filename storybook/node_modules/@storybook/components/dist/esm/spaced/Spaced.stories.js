import React from 'react';
import { storiesOf } from '@storybook/react';
import { styled } from '@storybook/theming';
import { Spaced } from './Spaced';
var PlaceholderBlock = styled.div(function (_ref) {
  var color = _ref.color;
  return {
    background: color || 'hotpink',
    padding: 20
  };
});
var PlaceholderInline = styled.span(function (_ref2) {
  var color = _ref2.color;
  return {
    background: color || 'hotpink',
    display: 'inline-block',
    padding: 20
  };
});
storiesOf('Basics/Spaced', module).add('row', function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderBlock, {
    color: "silver"
  }), /*#__PURE__*/React.createElement(Spaced, {
    row: 1
  }, /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null)), /*#__PURE__*/React.createElement(PlaceholderBlock, {
    color: "silver"
  }));
}).add('row outer', function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderBlock, {
    color: "silver"
  }), /*#__PURE__*/React.createElement(Spaced, {
    row: 1,
    outer: true
  }, /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null)), /*#__PURE__*/React.createElement(PlaceholderBlock, {
    color: "silver"
  }));
}).add('row multiply', function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderBlock, {
    color: "silver"
  }), /*#__PURE__*/React.createElement(Spaced, {
    row: 3,
    outer: 0.5
  }, /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null)), /*#__PURE__*/React.createElement(PlaceholderBlock, {
    color: "silver"
  }));
}).add('col', function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderInline, {
    color: "silver"
  }), /*#__PURE__*/React.createElement(Spaced, {
    col: 1
  }, /*#__PURE__*/React.createElement(PlaceholderInline, null), /*#__PURE__*/React.createElement(PlaceholderInline, null), /*#__PURE__*/React.createElement(PlaceholderInline, null)), /*#__PURE__*/React.createElement(PlaceholderInline, {
    color: "silver"
  }));
}).add('col outer', function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderInline, {
    color: "silver"
  }), /*#__PURE__*/React.createElement(Spaced, {
    col: 1,
    outer: true
  }, /*#__PURE__*/React.createElement(PlaceholderInline, null), /*#__PURE__*/React.createElement(PlaceholderInline, null), /*#__PURE__*/React.createElement(PlaceholderInline, null)), /*#__PURE__*/React.createElement(PlaceholderInline, {
    color: "silver"
  }));
});