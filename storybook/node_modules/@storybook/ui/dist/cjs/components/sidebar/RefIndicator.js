"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefIndicator = exports.MessageWrapper = void 0;

require("core-js/modules/es.string.bold.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

var _global = _interopRequireDefault(require("global"));

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _api = require("@storybook/api");

var _Menu = require("./Menu");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var document = _global.default.document,
    globalWindow = _global.default.window;

var IndicatorPlacement = _theming.styled.aside(function (_ref) {
  var theme = _ref.theme;
  return {
    height: 16,
    display: 'flex',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.layoutMargin
    }
  };
});

var IndicatorClickTarget = _theming.styled.button(function (_ref2) {
  var theme = _ref2.theme;
  return {
    height: 20,
    width: 20,
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    outline: 'none',
    border: '1px solid transparent',
    borderRadius: '100%',
    cursor: 'pointer',
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.3, theme.color.defaultText) : (0, _polished.transparentize)(0.6, theme.color.defaultText),
    '&:hover': {
      color: theme.barSelectedColor
    },
    '&:focus': {
      color: theme.barSelectedColor,
      borderColor: theme.color.secondary
    },
    svg: {
      height: 10,
      width: 10,
      transition: 'all 150ms ease-out',
      color: 'inherit'
    }
  };
});

var MessageTitle = _theming.styled.span(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontWeight: theme.typography.weight.bold
  };
});

var Message = _theming.styled.a(function (_ref4) {
  var theme = _ref4.theme;
  return {
    textDecoration: 'none',
    lineHeight: '16px',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    color: theme.color.defaultText,
    '&:not(:last-child)': {
      borderBottom: "1px solid ".concat(theme.appBorderColor)
    },
    '&:hover': {
      background: theme.background.hoverable,
      color: theme.color.darker
    },
    '&:link': {
      color: theme.color.darker
    },
    '&:active': {
      color: theme.color.darker
    },
    '&:focus': {
      color: theme.color.darker
    },
    '& > *': {
      flex: 1
    },
    '& > svg': {
      marginTop: 3,
      width: 16,
      height: 16,
      marginRight: 10,
      flex: 'unset'
    }
  };
});

var MessageWrapper = _theming.styled.div({
  width: 280,
  boxSizing: 'border-box',
  borderRadius: 8,
  overflow: 'hidden'
});

exports.MessageWrapper = MessageWrapper;
var BlueIcon = (0, _theming.styled)(_components.Icons)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    color: theme.color.secondary
  };
});
var YellowIcon = (0, _theming.styled)(_components.Icons)(function (_ref6) {
  var theme = _ref6.theme;
  return {
    color: theme.color.gold
  };
});
var RedIcon = (0, _theming.styled)(_components.Icons)(function (_ref7) {
  var theme = _ref7.theme;
  return {
    color: theme.color.negative
  };
});
var GreenIcon = (0, _theming.styled)(_components.Icons)(function (_ref8) {
  var theme = _ref8.theme;
  return {
    color: theme.color.green
  };
});

var Version = _theming.styled.div(function (_ref9) {
  var theme = _ref9.theme;
  return {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.size.s1,
    fontWeight: theme.typography.weight.regular,
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.3, theme.color.defaultText) : (0, _polished.transparentize)(0.6, theme.color.defaultText),
    '& > * + *': {
      marginLeft: 4
    },
    svg: {
      height: 10,
      width: 10
    }
  };
});

var CurrentVersion = function CurrentVersion(_ref10) {
  var url = _ref10.url,
      versions = _ref10.versions;
  var currentVersionId = (0, _react.useMemo)(function () {
    var c = Object.entries(versions).find(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          k = _ref12[0],
          v = _ref12[1];

      return v === url;
    });
    return c && c[0] ? c[0] : 'current';
  }, [url, versions]);
  return /*#__PURE__*/_react.default.createElement(Version, null, /*#__PURE__*/_react.default.createElement("span", null, currentVersionId), /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "chevrondown"
  }));
};

CurrentVersion.displayName = "CurrentVersion";

var RefIndicator = /*#__PURE__*/_react.default.memo( /*#__PURE__*/(0, _react.forwardRef)(function (_ref13, forwardedRef) {
  var state = _ref13.state,
      ref = _objectWithoutProperties(_ref13, ["state"]);

  var api = (0, _api.useStorybookApi)();
  var list = (0, _react.useMemo)(function () {
    return Object.values(ref.stories || {});
  }, [ref.stories]);
  var componentCount = (0, _react.useMemo)(function () {
    return list.filter(function (v) {
      return v.isComponent;
    }).length;
  }, [list]);
  var leafCount = (0, _react.useMemo)(function () {
    return list.filter(function (v) {
      return v.isLeaf;
    }).length;
  }, [list]);
  var changeVersion = (0, _react.useCallback)(function (event, item) {
    event.preventDefault();
    api.changeRefVersion(ref.id, item.href);
  }, []);
  return /*#__PURE__*/_react.default.createElement(IndicatorPlacement, {
    ref: forwardedRef
  }, /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    placement: "bottom-start",
    trigger: "click",
    tooltip: /*#__PURE__*/_react.default.createElement(MessageWrapper, null, /*#__PURE__*/_react.default.createElement(_components.Spaced, {
      row: 0
    }, state === 'loading' && /*#__PURE__*/_react.default.createElement(LoadingMessage, {
      url: ref.url
    }), (state === 'error' || state === 'empty') && /*#__PURE__*/_react.default.createElement(ErrorOccurredMessage, {
      url: ref.url
    }), state === 'ready' && /*#__PURE__*/_react.default.createElement(ReadyMessage, {
      url: ref.url,
      componentCount: componentCount,
      leafCount: leafCount
    }), state === 'auth' && /*#__PURE__*/_react.default.createElement(LoginRequiredMessage, ref), ref.type === 'auto-inject' && state !== 'error' && /*#__PURE__*/_react.default.createElement(PerformanceDegradedMessage, null), state !== 'loading' && /*#__PURE__*/_react.default.createElement(ReadDocsMessage, null)))
  }, /*#__PURE__*/_react.default.createElement(IndicatorClickTarget, {
    "data-action": "toggle-indicator",
    "aria-label": "toggle indicator"
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "globe"
  }))), ref.versions && Object.keys(ref.versions).length ? /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    placement: "bottom-start",
    trigger: "click",
    tooltip: /*#__PURE__*/_react.default.createElement(_components.TooltipLinkList, {
      links: Object.entries(ref.versions).map(function (_ref14) {
        var _ref15 = _slicedToArray(_ref14, 2),
            id = _ref15[0],
            href = _ref15[1];

        return {
          left: href === ref.url ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItemIcon, {
            icon: "check"
          }) : /*#__PURE__*/_react.default.createElement("span", null),
          id: id,
          title: id,
          href: href,
          onClick: changeVersion
        };
      })
    })
  }, /*#__PURE__*/_react.default.createElement(CurrentVersion, {
    url: ref.url,
    versions: ref.versions
  })) : null);
}));

exports.RefIndicator = RefIndicator;

var ReadyMessage = function ReadyMessage(_ref16) {
  var url = _ref16.url,
      componentCount = _ref16.componentCount,
      leafCount = _ref16.leafCount;
  return /*#__PURE__*/_react.default.createElement(Message, {
    href: url.replace(/\/?$/, '/index.html'),
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement(BlueIcon, {
    icon: "globe"
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(MessageTitle, null, "View external Storybook"), /*#__PURE__*/_react.default.createElement("div", null, "Explore ", componentCount, " components and ", leafCount, " stories in a new browser tab.")));
};

ReadyMessage.displayName = "ReadyMessage";

var LoginRequiredMessage = function LoginRequiredMessage(_ref17) {
  var loginUrl = _ref17.loginUrl,
      id = _ref17.id;
  var open = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    var childWindow = globalWindow.open(loginUrl, "storybook_auth_".concat(id), 'resizable,scrollbars'); // poll for window to close

    var timer = setInterval(function () {
      if (!childWindow) {
        clearInterval(timer);
      } else if (childWindow.closed) {
        clearInterval(timer);
        document.location.reload();
      }
    }, 1000);
  }, []);
  return /*#__PURE__*/_react.default.createElement(Message, {
    onClick: open
  }, /*#__PURE__*/_react.default.createElement(YellowIcon, {
    icon: "lock"
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(MessageTitle, null, "Log in required"), /*#__PURE__*/_react.default.createElement("div", null, "You need to authenticate to view this Storybook's components.")));
};

LoginRequiredMessage.displayName = "LoginRequiredMessage";

var ReadDocsMessage = function ReadDocsMessage() {
  return /*#__PURE__*/_react.default.createElement(Message, {
    href: "https://storybook.js.org",
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement(GreenIcon, {
    icon: "document"
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(MessageTitle, null, "Read Composition docs"), /*#__PURE__*/_react.default.createElement("div", null, "Learn how to combine multiple Storybooks into one.")));
};

ReadDocsMessage.displayName = "ReadDocsMessage";

var ErrorOccurredMessage = function ErrorOccurredMessage(_ref18) {
  var url = _ref18.url;
  return /*#__PURE__*/_react.default.createElement(Message, {
    href: url.replace(/\/?$/, '/index.html'),
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement(RedIcon, {
    icon: "alert"
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(MessageTitle, null, "Something went wrong"), /*#__PURE__*/_react.default.createElement("div", null, "This external Storybook didn't load. Debug it in a new tab now.")));
};

ErrorOccurredMessage.displayName = "ErrorOccurredMessage";

var LoadingMessage = function LoadingMessage(_ref19) {
  var url = _ref19.url;
  return /*#__PURE__*/_react.default.createElement(Message, {
    href: url.replace(/\/?$/, '/index.html'),
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement(BlueIcon, {
    icon: "time"
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(MessageTitle, null, "Please wait"), /*#__PURE__*/_react.default.createElement("div", null, "This Storybook is loading.")));
};

LoadingMessage.displayName = "LoadingMessage";

var PerformanceDegradedMessage = function PerformanceDegradedMessage() {
  return /*#__PURE__*/_react.default.createElement(Message, {
    href: "https://storybook.js.org/docs",
    target: "_blank"
  }, /*#__PURE__*/_react.default.createElement(YellowIcon, {
    icon: "lightning"
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(MessageTitle, null, "Reduce lag"), /*#__PURE__*/_react.default.createElement("div", null, "Learn how to speed up Composition performance.")));
};

PerformanceDegradedMessage.displayName = "PerformanceDegradedMessage";