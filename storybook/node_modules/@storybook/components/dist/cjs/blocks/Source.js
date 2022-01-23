"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledSyntaxHighlighter = exports.Source = exports.SourceError = void 0;

require("core-js/modules/es.object.keys.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _EmptyBlock = require("./EmptyBlock");

var _lazySyntaxhighlighter = require("../syntaxhighlighter/lazy-syntaxhighlighter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var StyledSyntaxHighlighter = (0, _theming.styled)(_lazySyntaxhighlighter.SyntaxHighlighter)(function (_ref) {
  var theme = _ref.theme;
  return {
    // DocBlocks-specific styling and overrides
    fontSize: "".concat(theme.typography.size.s2 - 1, "px"),
    lineHeight: '19px',
    margin: '25px 0 40px',
    borderRadius: theme.appBorderRadius,
    boxShadow: theme.base === 'light' ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0' : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
    'pre.prismjs': {
      padding: 20,
      background: 'inherit'
    }
  };
});
exports.StyledSyntaxHighlighter = StyledSyntaxHighlighter;
var SourceError;
exports.SourceError = SourceError;

(function (SourceError) {
  SourceError["NO_STORY"] = "There\u2019s no story here.";
  SourceError["SOURCE_UNAVAILABLE"] = "Oh no! The source is not available.";
})(SourceError || (exports.SourceError = SourceError = {}));

var SourceSkeletonWrapper = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    background: theme.background.content,
    borderRadius: theme.appBorderRadius,
    border: "1px solid ".concat(theme.appBorderColor),
    boxShadow: theme.base === 'light' ? 'rgba(0, 0, 0, 0.10) 0 1px 3px 0' : 'rgba(0, 0, 0, 0.20) 0 2px 5px 0',
    margin: '25px 0 40px',
    padding: '20px 20px 20px 22px'
  };
});

var SourceSkeletonPlaceholder = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    animation: "".concat(theme.animation.glow, " 1.5s ease-in-out infinite"),
    background: theme.appBorderColor,
    height: 17,
    marginTop: 1,
    width: '60%',
    '&:first-child': {
      margin: 0
    }
  };
});

var SourceSkeleton = function SourceSkeleton() {
  return /*#__PURE__*/_react.default.createElement(SourceSkeletonWrapper, null, /*#__PURE__*/_react.default.createElement(SourceSkeletonPlaceholder, null), /*#__PURE__*/_react.default.createElement(SourceSkeletonPlaceholder, {
    style: {
      width: '80%'
    }
  }), /*#__PURE__*/_react.default.createElement(SourceSkeletonPlaceholder, {
    style: {
      width: '30%'
    }
  }), /*#__PURE__*/_react.default.createElement(SourceSkeletonPlaceholder, {
    style: {
      width: '80%'
    }
  }));
};

SourceSkeleton.displayName = "SourceSkeleton";

/**
 * Syntax-highlighted source code for a component (or anything!)
 */
var Source = function Source(props) {
  var _ref4 = props,
      isLoading = _ref4.isLoading,
      error = _ref4.error;

  if (isLoading) {
    return /*#__PURE__*/_react.default.createElement(SourceSkeleton, null);
  }

  if (error) {
    return /*#__PURE__*/_react.default.createElement(_EmptyBlock.EmptyBlock, null, error);
  }

  var _ref5 = props,
      language = _ref5.language,
      code = _ref5.code,
      dark = _ref5.dark,
      format = _ref5.format,
      rest = _objectWithoutProperties(_ref5, ["language", "code", "dark", "format"]);

  var syntaxHighlighter = /*#__PURE__*/_react.default.createElement(StyledSyntaxHighlighter, _extends({
    bordered: true,
    copyable: true,
    format: format,
    language: language,
    className: "docblock-source"
  }, rest), code);

  if (typeof dark === 'undefined') {
    return syntaxHighlighter;
  }

  var overrideTheme = dark ? _theming.themes.dark : _theming.themes.light;
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: (0, _theming.convert)(overrideTheme)
  }, syntaxHighlighter);
};

exports.Source = Source;
Source.displayName = "Source";
Source.defaultProps = {
  format: false
};