import React from 'react';
import { storiesOf } from '@storybook/react';
import { styled } from '@storybook/theming';
import { Spaced } from './Spaced';
const PlaceholderBlock = styled.div(({
  color
}) => ({
  background: color || 'hotpink',
  padding: 20
}));
const PlaceholderInline = styled.span(({
  color
}) => ({
  background: color || 'hotpink',
  display: 'inline-block',
  padding: 20
}));
storiesOf('Basics/Spaced', module).add('row', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderBlock, {
  color: "silver"
}), /*#__PURE__*/React.createElement(Spaced, {
  row: 1
}, /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null)), /*#__PURE__*/React.createElement(PlaceholderBlock, {
  color: "silver"
}))).add('row outer', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderBlock, {
  color: "silver"
}), /*#__PURE__*/React.createElement(Spaced, {
  row: 1,
  outer: true
}, /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null)), /*#__PURE__*/React.createElement(PlaceholderBlock, {
  color: "silver"
}))).add('row multiply', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderBlock, {
  color: "silver"
}), /*#__PURE__*/React.createElement(Spaced, {
  row: 3,
  outer: 0.5
}, /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null), /*#__PURE__*/React.createElement(PlaceholderBlock, null)), /*#__PURE__*/React.createElement(PlaceholderBlock, {
  color: "silver"
}))).add('col', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderInline, {
  color: "silver"
}), /*#__PURE__*/React.createElement(Spaced, {
  col: 1
}, /*#__PURE__*/React.createElement(PlaceholderInline, null), /*#__PURE__*/React.createElement(PlaceholderInline, null), /*#__PURE__*/React.createElement(PlaceholderInline, null)), /*#__PURE__*/React.createElement(PlaceholderInline, {
  color: "silver"
}))).add('col outer', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PlaceholderInline, {
  color: "silver"
}), /*#__PURE__*/React.createElement(Spaced, {
  col: 1,
  outer: true
}, /*#__PURE__*/React.createElement(PlaceholderInline, null), /*#__PURE__*/React.createElement(PlaceholderInline, null), /*#__PURE__*/React.createElement(PlaceholderInline, null)), /*#__PURE__*/React.createElement(PlaceholderInline, {
  color: "silver"
})));