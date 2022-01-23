"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _theming = require("@storybook/theming");

var _Spaced = require("./Spaced");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlaceholderBlock = _theming.styled.div(function (_ref) {
  var color = _ref.color;
  return {
    background: color || 'hotpink',
    padding: 20
  };
});

var PlaceholderInline = _theming.styled.span(function (_ref2) {
  var color = _ref2.color;
  return {
    background: color || 'hotpink',
    display: 'inline-block',
    padding: 20
  };
});

(0, _react2.storiesOf)('Basics/Spaced', module).add('row', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(PlaceholderBlock, {
    color: "silver"
  }), /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, {
    row: 1
  }, /*#__PURE__*/_react.default.createElement(PlaceholderBlock, null), /*#__PURE__*/_react.default.createElement(PlaceholderBlock, null), /*#__PURE__*/_react.default.createElement(PlaceholderBlock, null)), /*#__PURE__*/_react.default.createElement(PlaceholderBlock, {
    color: "silver"
  }));
}).add('row outer', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(PlaceholderBlock, {
    color: "silver"
  }), /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, {
    row: 1,
    outer: true
  }, /*#__PURE__*/_react.default.createElement(PlaceholderBlock, null), /*#__PURE__*/_react.default.createElement(PlaceholderBlock, null), /*#__PURE__*/_react.default.createElement(PlaceholderBlock, null)), /*#__PURE__*/_react.default.createElement(PlaceholderBlock, {
    color: "silver"
  }));
}).add('row multiply', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(PlaceholderBlock, {
    color: "silver"
  }), /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, {
    row: 3,
    outer: 0.5
  }, /*#__PURE__*/_react.default.createElement(PlaceholderBlock, null), /*#__PURE__*/_react.default.createElement(PlaceholderBlock, null), /*#__PURE__*/_react.default.createElement(PlaceholderBlock, null)), /*#__PURE__*/_react.default.createElement(PlaceholderBlock, {
    color: "silver"
  }));
}).add('col', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(PlaceholderInline, {
    color: "silver"
  }), /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, {
    col: 1
  }, /*#__PURE__*/_react.default.createElement(PlaceholderInline, null), /*#__PURE__*/_react.default.createElement(PlaceholderInline, null), /*#__PURE__*/_react.default.createElement(PlaceholderInline, null)), /*#__PURE__*/_react.default.createElement(PlaceholderInline, {
    color: "silver"
  }));
}).add('col outer', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(PlaceholderInline, {
    color: "silver"
  }), /*#__PURE__*/_react.default.createElement(_Spaced.Spaced, {
    col: 1,
    outer: true
  }, /*#__PURE__*/_react.default.createElement(PlaceholderInline, null), /*#__PURE__*/_react.default.createElement(PlaceholderInline, null), /*#__PURE__*/_react.default.createElement(PlaceholderInline, null)), /*#__PURE__*/_react.default.createElement(PlaceholderInline, {
    color: "silver"
  }));
});