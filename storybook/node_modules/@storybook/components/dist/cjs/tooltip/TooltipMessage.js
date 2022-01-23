"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipMessage = void 0;

require("core-js/modules/es.array.map.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _link = require("../typography/link/link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Title = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    fontWeight: theme.typography.weight.black
  };
});

var Desc = _theming.styled.span();

var Links = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    marginTop: 8,
    textAlign: 'center',
    '> *': {
      margin: '0 8px',
      fontWeight: theme.typography.weight.black
    }
  };
});

var Message = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    color: theme.textColor,
    lineHeight: '18px'
  };
});

var MessageWrapper = _theming.styled.div({
  padding: 15,
  width: 280,
  boxSizing: 'border-box'
});

var TooltipMessage = function TooltipMessage(_ref4) {
  var title = _ref4.title,
      desc = _ref4.desc,
      links = _ref4.links;
  return /*#__PURE__*/_react.default.createElement(MessageWrapper, null, /*#__PURE__*/_react.default.createElement(Message, null, title && /*#__PURE__*/_react.default.createElement(Title, null, title), desc && /*#__PURE__*/_react.default.createElement(Desc, null, desc)), links && /*#__PURE__*/_react.default.createElement(Links, null, links.map(function (_ref5) {
    var linkTitle = _ref5.title,
        other = _objectWithoutProperties(_ref5, ["title"]);

    return /*#__PURE__*/_react.default.createElement(_link.Link, _extends({}, other, {
      key: linkTitle
    }), linkTitle);
  })));
};

exports.TooltipMessage = TooltipMessage;
TooltipMessage.displayName = "TooltipMessage";
TooltipMessage.defaultProps = {
  title: null,
  desc: null,
  links: null
};