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
exports.AboutScreen = void 0;

require("core-js/modules/es.string.bold.js");

var _react = _interopRequireWildcard(require("react"));

var _semver = _interopRequireDefault(require("@storybook/semver"));

var _theming = require("@storybook/theming");

var _markdownToJsx = _interopRequireDefault(require("markdown-to-jsx"));

var _components = require("@storybook/components");

var _SettingsFooter = _interopRequireDefault(require("./SettingsFooter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Header = _theming.styled.header(function (_ref) {
  var theme = _ref.theme;
  return {
    marginBottom: 20,
    fontSize: theme.typography.size.m3,
    fontWeight: theme.typography.weight.black,
    alignItems: 'center',
    display: 'flex',
    '> svg': {
      height: 32,
      width: 'auto',
      marginRight: 8
    }
  };
});

var Subheading = _theming.styled.span(function (_ref2) {
  var theme = _ref2.theme;
  return {
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    fontWeight: theme.typography.weight.black,
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '24px',
    color: theme.color.mediumdark
  };
});

var SubheadingLink = (0, _theming.styled)(_components.Link)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontSize: theme.typography.size.s1
  };
});

var Subheader = _theming.styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '.75rem'
});

var UpdateMessage = _theming.styled.div(function (_ref4) {
  var status = _ref4.status,
      theme = _ref4.theme;

  if (status === 'positive') {
    return {
      background: theme.background.positive,
      color: theme.color.positive
    };
  }

  if (status === 'negative') {
    return {
      background: theme.background.negative,
      color: theme.color.negative
    };
  }

  return {
    background: '#EAF3FC',
    color: theme.color.darkest
  };
}, function (_ref5) {
  var theme = _ref5.theme;
  return {
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s2,
    padding: '10px 20px',
    marginBottom: 24,
    borderRadius: theme.appBorderRadius,
    border: "1px solid ".concat(theme.appBorderColor),
    textAlign: 'center'
  };
});

var ErrorMessage = _theming.styled.div(function (_ref6) {
  var theme = _ref6.theme;
  return {
    fontWeight: theme.typography.weight.bold,
    textAlign: 'center'
  };
});

var Upgrade = _theming.styled.div(function (_ref7) {
  var theme = _ref7.theme;
  return {
    marginTop: 20,
    borderTop: "1px solid ".concat(theme.appBorderColor)
  };
});

var Container = _theming.styled.div({
  padding: "3rem 20px",
  maxWidth: 600,
  margin: '0 auto'
});

var AboutScreen = function AboutScreen(_ref8) {
  var _ref8$latest = _ref8.latest,
      latest = _ref8$latest === void 0 ? null : _ref8$latest,
      current = _ref8.current;

  var canUpdate = latest && _semver.default.gt(latest.version, current.version);

  var updateMessage;

  if (latest) {
    if (canUpdate) {
      updateMessage = /*#__PURE__*/_react.default.createElement(UpdateMessage, {
        status: "positive"
      }, "Storybook ", latest.version, " is available. Upgrade from ", current.version, " now.");
    } else {
      updateMessage = /*#__PURE__*/_react.default.createElement(UpdateMessage, {
        status: "neutral"
      }, "Looking good! You're up to date.");
    }
  } else {
    updateMessage = /*#__PURE__*/_react.default.createElement(UpdateMessage, {
      status: "negative"
    }, "Oops! The latest version of Storybook couldn't be fetched.");
  }

  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(Header, null, /*#__PURE__*/_react.default.createElement(_components.StorybookIcon, null), "Storybook ", current.version), updateMessage, latest ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(Subheader, null, /*#__PURE__*/_react.default.createElement(Subheading, null, latest.version, " Changelog"), /*#__PURE__*/_react.default.createElement(SubheadingLink, {
    secondary: true,
    href: "https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md",
    withArrow: true,
    cancel: false,
    target: "_blank"
  }, "Read full changelog")), /*#__PURE__*/_react.default.createElement(_components.DocumentWrapper, null, /*#__PURE__*/_react.default.createElement(_markdownToJsx.default, null, latest.info.plain))) : /*#__PURE__*/_react.default.createElement(ErrorMessage, null, /*#__PURE__*/_react.default.createElement(_components.Link, {
    href: "https://github.com/storybookjs/storybook/releases",
    target: "_blank",
    withArrow: true,
    secondary: true,
    cancel: false
  }, "Check Storybook's release history")), canUpdate && /*#__PURE__*/_react.default.createElement(Upgrade, null, /*#__PURE__*/_react.default.createElement(_components.DocumentWrapper, null, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("b", null, "Upgrade all Storybook packages to latest:")), /*#__PURE__*/_react.default.createElement(_components.SyntaxHighlighter, {
    language: "bash",
    copyable: true,
    padded: true,
    bordered: true
  }, "npx sb upgrade"))), /*#__PURE__*/_react.default.createElement(_SettingsFooter.default, null));
};

exports.AboutScreen = AboutScreen;
AboutScreen.displayName = "AboutScreen";