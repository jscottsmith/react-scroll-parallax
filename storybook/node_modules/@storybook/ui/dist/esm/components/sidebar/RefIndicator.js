function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.string.bold.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import global from 'global';
import React, { useMemo, useCallback, forwardRef } from 'react';
import { Icons, WithTooltip, Spaced, TooltipLinkList } from '@storybook/components';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { useStorybookApi } from '@storybook/api';
import { MenuItemIcon } from './Menu';
var document = global.document,
    globalWindow = global.window;
var IndicatorPlacement = styled.aside(function (_ref) {
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
var IndicatorClickTarget = styled.button(function (_ref2) {
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
    color: theme.base === 'light' ? transparentize(0.3, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText),
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
var MessageTitle = styled.span(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontWeight: theme.typography.weight.bold
  };
});
var Message = styled.a(function (_ref4) {
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
export var MessageWrapper = styled.div({
  width: 280,
  boxSizing: 'border-box',
  borderRadius: 8,
  overflow: 'hidden'
});
var BlueIcon = styled(Icons)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    color: theme.color.secondary
  };
});
var YellowIcon = styled(Icons)(function (_ref6) {
  var theme = _ref6.theme;
  return {
    color: theme.color.gold
  };
});
var RedIcon = styled(Icons)(function (_ref7) {
  var theme = _ref7.theme;
  return {
    color: theme.color.negative
  };
});
var GreenIcon = styled(Icons)(function (_ref8) {
  var theme = _ref8.theme;
  return {
    color: theme.color.green
  };
});
var Version = styled.div(function (_ref9) {
  var theme = _ref9.theme;
  return {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.size.s1,
    fontWeight: theme.typography.weight.regular,
    color: theme.base === 'light' ? transparentize(0.3, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText),
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
  var currentVersionId = useMemo(function () {
    var c = Object.entries(versions).find(function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          k = _ref12[0],
          v = _ref12[1];

      return v === url;
    });
    return c && c[0] ? c[0] : 'current';
  }, [url, versions]);
  return /*#__PURE__*/React.createElement(Version, null, /*#__PURE__*/React.createElement("span", null, currentVersionId), /*#__PURE__*/React.createElement(Icons, {
    icon: "chevrondown"
  }));
};

CurrentVersion.displayName = "CurrentVersion";
export var RefIndicator = /*#__PURE__*/React.memo( /*#__PURE__*/forwardRef(function (_ref13, forwardedRef) {
  var state = _ref13.state,
      ref = _objectWithoutProperties(_ref13, ["state"]);

  var api = useStorybookApi();
  var list = useMemo(function () {
    return Object.values(ref.stories || {});
  }, [ref.stories]);
  var componentCount = useMemo(function () {
    return list.filter(function (v) {
      return v.isComponent;
    }).length;
  }, [list]);
  var leafCount = useMemo(function () {
    return list.filter(function (v) {
      return v.isLeaf;
    }).length;
  }, [list]);
  var changeVersion = useCallback(function (event, item) {
    event.preventDefault();
    api.changeRefVersion(ref.id, item.href);
  }, []);
  return /*#__PURE__*/React.createElement(IndicatorPlacement, {
    ref: forwardedRef
  }, /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "bottom-start",
    trigger: "click",
    tooltip: /*#__PURE__*/React.createElement(MessageWrapper, null, /*#__PURE__*/React.createElement(Spaced, {
      row: 0
    }, state === 'loading' && /*#__PURE__*/React.createElement(LoadingMessage, {
      url: ref.url
    }), (state === 'error' || state === 'empty') && /*#__PURE__*/React.createElement(ErrorOccurredMessage, {
      url: ref.url
    }), state === 'ready' && /*#__PURE__*/React.createElement(ReadyMessage, {
      url: ref.url,
      componentCount: componentCount,
      leafCount: leafCount
    }), state === 'auth' && /*#__PURE__*/React.createElement(LoginRequiredMessage, ref), ref.type === 'auto-inject' && state !== 'error' && /*#__PURE__*/React.createElement(PerformanceDegradedMessage, null), state !== 'loading' && /*#__PURE__*/React.createElement(ReadDocsMessage, null)))
  }, /*#__PURE__*/React.createElement(IndicatorClickTarget, {
    "data-action": "toggle-indicator",
    "aria-label": "toggle indicator"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "globe"
  }))), ref.versions && Object.keys(ref.versions).length ? /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "bottom-start",
    trigger: "click",
    tooltip: /*#__PURE__*/React.createElement(TooltipLinkList, {
      links: Object.entries(ref.versions).map(function (_ref14) {
        var _ref15 = _slicedToArray(_ref14, 2),
            id = _ref15[0],
            href = _ref15[1];

        return {
          left: href === ref.url ? /*#__PURE__*/React.createElement(MenuItemIcon, {
            icon: "check"
          }) : /*#__PURE__*/React.createElement("span", null),
          id: id,
          title: id,
          href: href,
          onClick: changeVersion
        };
      })
    })
  }, /*#__PURE__*/React.createElement(CurrentVersion, {
    url: ref.url,
    versions: ref.versions
  })) : null);
}));

var ReadyMessage = function ReadyMessage(_ref16) {
  var url = _ref16.url,
      componentCount = _ref16.componentCount,
      leafCount = _ref16.leafCount;
  return /*#__PURE__*/React.createElement(Message, {
    href: url.replace(/\/?$/, '/index.html'),
    target: "_blank"
  }, /*#__PURE__*/React.createElement(BlueIcon, {
    icon: "globe"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "View external Storybook"), /*#__PURE__*/React.createElement("div", null, "Explore ", componentCount, " components and ", leafCount, " stories in a new browser tab.")));
};

ReadyMessage.displayName = "ReadyMessage";

var LoginRequiredMessage = function LoginRequiredMessage(_ref17) {
  var loginUrl = _ref17.loginUrl,
      id = _ref17.id;
  var open = useCallback(function (e) {
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
  return /*#__PURE__*/React.createElement(Message, {
    onClick: open
  }, /*#__PURE__*/React.createElement(YellowIcon, {
    icon: "lock"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Log in required"), /*#__PURE__*/React.createElement("div", null, "You need to authenticate to view this Storybook's components.")));
};

LoginRequiredMessage.displayName = "LoginRequiredMessage";

var ReadDocsMessage = function ReadDocsMessage() {
  return /*#__PURE__*/React.createElement(Message, {
    href: "https://storybook.js.org",
    target: "_blank"
  }, /*#__PURE__*/React.createElement(GreenIcon, {
    icon: "document"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Read Composition docs"), /*#__PURE__*/React.createElement("div", null, "Learn how to combine multiple Storybooks into one.")));
};

ReadDocsMessage.displayName = "ReadDocsMessage";

var ErrorOccurredMessage = function ErrorOccurredMessage(_ref18) {
  var url = _ref18.url;
  return /*#__PURE__*/React.createElement(Message, {
    href: url.replace(/\/?$/, '/index.html'),
    target: "_blank"
  }, /*#__PURE__*/React.createElement(RedIcon, {
    icon: "alert"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Something went wrong"), /*#__PURE__*/React.createElement("div", null, "This external Storybook didn't load. Debug it in a new tab now.")));
};

ErrorOccurredMessage.displayName = "ErrorOccurredMessage";

var LoadingMessage = function LoadingMessage(_ref19) {
  var url = _ref19.url;
  return /*#__PURE__*/React.createElement(Message, {
    href: url.replace(/\/?$/, '/index.html'),
    target: "_blank"
  }, /*#__PURE__*/React.createElement(BlueIcon, {
    icon: "time"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Please wait"), /*#__PURE__*/React.createElement("div", null, "This Storybook is loading.")));
};

LoadingMessage.displayName = "LoadingMessage";

var PerformanceDegradedMessage = function PerformanceDegradedMessage() {
  return /*#__PURE__*/React.createElement(Message, {
    href: "https://storybook.js.org/docs",
    target: "_blank"
  }, /*#__PURE__*/React.createElement(YellowIcon, {
    icon: "lightning"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Reduce lag"), /*#__PURE__*/React.createElement("div", null, "Learn how to speed up Composition performance.")));
};

PerformanceDegradedMessage.displayName = "PerformanceDegradedMessage";