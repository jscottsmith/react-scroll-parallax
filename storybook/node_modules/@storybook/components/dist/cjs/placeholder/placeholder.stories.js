"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwoChildren = exports.SingleChild = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _placeholder = require("./placeholder");

var _link = require("../typography/link/link");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = {
  component: _placeholder.Placeholder,
  title: 'Basics/Placeholder'
};
exports.default = _default;

var SingleChild = function SingleChild() {
  return /*#__PURE__*/_react.default.createElement(_placeholder.Placeholder, null, "This is a placeholder with single child, it's bolded");
};

exports.SingleChild = SingleChild;
SingleChild.displayName = "SingleChild";

var TwoChildren = function TwoChildren() {
  return /*#__PURE__*/_react.default.createElement(_placeholder.Placeholder, null, /*#__PURE__*/_react.default.createElement(_react.Fragment, {
    key: "title"
  }, "This has two children, the first bold"), /*#__PURE__*/_react.default.createElement(_react.Fragment, {
    key: "desc"
  }, "The second normal weight. Here's a\xA0", /*#__PURE__*/_react.default.createElement(_link.Link, {
    href: "https://storybook.js.org",
    secondary: true,
    cancel: false
  }, "link")));
};

exports.TwoChildren = TwoChildren;
TwoChildren.displayName = "TwoChildren";