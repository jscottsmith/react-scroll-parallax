"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipLinkList = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.keys.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _ListItem = _interopRequireDefault(require("./ListItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var List = _theming.styled.div({
  minWidth: 180,
  overflow: 'hidden',
  overflowY: 'auto',
  maxHeight: 13.5 * 32 // 11.5 items

}, function (_ref) {
  var theme = _ref.theme;
  return {
    borderRadius: theme.appBorderRadius * 2
  };
});

var Item = function Item(props) {
  var LinkWrapper = props.LinkWrapper,
      onClickFromProps = props.onClick,
      rest = _objectWithoutProperties(props, ["LinkWrapper", "onClick"]);

  var title = rest.title,
      href = rest.href,
      active = rest.active;
  var onClick = (0, _react.useCallback)(function (event) {
    onClickFromProps(event, rest);
  }, [onClickFromProps]);
  var hasOnClick = !!onClickFromProps;
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, _extends({
    title: title,
    active: active,
    href: href,
    LinkWrapper: LinkWrapper
  }, rest, hasOnClick ? {
    onClick: onClick
  } : {}));
};

Item.displayName = "Item";

var TooltipLinkList = function TooltipLinkList(_ref2) {
  var links = _ref2.links,
      LinkWrapper = _ref2.LinkWrapper;
  return /*#__PURE__*/_react.default.createElement(List, null, links.map(function (_ref3) {
    var isGatsby = _ref3.isGatsby,
        p = _objectWithoutProperties(_ref3, ["isGatsby"]);

    return /*#__PURE__*/_react.default.createElement(Item, _extends({
      key: p.id,
      LinkWrapper: isGatsby ? LinkWrapper : null
    }, p));
  }));
};

exports.TooltipLinkList = TooltipLinkList;
TooltipLinkList.displayName = "TooltipLinkList";
TooltipLinkList.defaultProps = {
  LinkWrapper: _ListItem.default.defaultProps.LinkWrapper
};