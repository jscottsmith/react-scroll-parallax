function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import global from 'global';
import React, { useState, useCallback, Fragment } from 'react';
import { Icons, WithTooltip, Spaced, Button, Link } from '@storybook/components';
import { logger } from '@storybook/client-logger';
import { styled } from '@storybook/theming';
import { Loader, Contained } from './Loader';
var globalWindow = global.window,
    document = global.document;
var TextStyle = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '20px',
    margin: 0
  };
});
var Text = styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '20px',
    margin: 0,
    code: {
      fontSize: theme.typography.size.s1
    },
    ul: {
      paddingLeft: 20,
      marginTop: 8,
      marginBottom: 8
    }
  };
});
var ErrorDisplay = styled.pre({
  width: 420,
  boxSizing: 'border-box',
  borderRadius: 8,
  overflow: 'auto',
  whiteSpace: 'pre'
}, function (_ref3) {
  var theme = _ref3.theme;
  return {
    color: theme.color.dark
  };
});
var ErrorName = styled.strong(function (_ref4) {
  var theme = _ref4.theme;
  return {
    color: theme.color.orange
  };
});
var ErrorImportant = styled.strong(function (_ref5) {
  var theme = _ref5.theme;
  return {
    color: theme.color.ancillary,
    textDecoration: 'underline'
  };
});
var ErrorDetail = styled.em(function (_ref6) {
  var theme = _ref6.theme;
  return {
    color: theme.color.mediumdark
  };
});
var firstLineRegex = /(Error): (.*)\n/;
var linesRegex = /at (?:(.*) )?\(?(.+)\)?/;

var ErrorFormatter = function ErrorFormatter(_ref7) {
  var error = _ref7.error;

  if (!error) {
    return /*#__PURE__*/React.createElement(Fragment, null, "This error has no stack or message");
  }

  if (!error.stack) {
    return /*#__PURE__*/React.createElement(Fragment, null, error.message || 'This error has no stack or message');
  }

  var input = error.stack.toString();
  var match = input.match(firstLineRegex);

  if (!match) {
    return /*#__PURE__*/React.createElement(Fragment, null, input);
  }

  var _match = _slicedToArray(match, 3),
      type = _match[1],
      name = _match[2];

  var rawLines = input.split(/\n/).slice(1);

  var _rawLines$map$filter = rawLines.map(function (line) {
    var r = line.match(linesRegex);
    return r ? {
      name: r[1],
      location: r[2].replace(document.location.origin, '')
    } : null;
  }).filter(Boolean),
      _rawLines$map$filter2 = _toArray(_rawLines$map$filter),
      lines = _rawLines$map$filter2.slice(1);

  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("span", null, type), ": ", /*#__PURE__*/React.createElement(ErrorName, null, name), /*#__PURE__*/React.createElement("br", null), lines.map(function (l, i) {
    return l.name ?
    /*#__PURE__*/
    // eslint-disable-next-line react/no-array-index-key
    React.createElement(Fragment, {
      key: i
    }, '  ', "at ", /*#__PURE__*/React.createElement(ErrorImportant, null, l.name), " (", /*#__PURE__*/React.createElement(ErrorDetail, null, l.location), ")", /*#__PURE__*/React.createElement("br", null)) :
    /*#__PURE__*/
    // eslint-disable-next-line react/no-array-index-key
    React.createElement(Fragment, {
      key: i
    }, '  ', "at ", /*#__PURE__*/React.createElement(ErrorDetail, null, l.location), /*#__PURE__*/React.createElement("br", null));
  }));
};

ErrorFormatter.displayName = "ErrorFormatter";
export var AuthBlock = function AuthBlock(_ref8) {
  var loginUrl = _ref8.loginUrl,
      id = _ref8.id;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isAuthAttempted = _useState2[0],
      setAuthAttempted = _useState2[1];

  var refresh = useCallback(function () {
    globalWindow.document.location.reload();
  }, []);
  var open = useCallback(function (e) {
    e.preventDefault();
    var childWindow = globalWindow.open(loginUrl, "storybook_auth_".concat(id), 'resizable,scrollbars'); // poll for window to close

    var timer = setInterval(function () {
      if (!childWindow) {
        logger.error('unable to access loginUrl window');
        clearInterval(timer);
      } else if (childWindow.closed) {
        clearInterval(timer);
        setAuthAttempted(true);
      }
    }, 1000);
  }, []);
  return /*#__PURE__*/React.createElement(Contained, null, /*#__PURE__*/React.createElement(Spaced, null, isAuthAttempted ? /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Text, null, "Authentication on ", /*#__PURE__*/React.createElement("strong", null, loginUrl), " concluded. Refresh the page to fetch this Storybook."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    small: true,
    gray: true,
    onClick: refresh
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "sync"
  }), "Refresh now"))) : /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Text, null, "Sign in to browse this Storybook."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    small: true,
    gray: true,
    onClick: open
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "lock"
  }), "Sign in")))));
};
AuthBlock.displayName = "AuthBlock";
export var ErrorBlock = function ErrorBlock(_ref9) {
  var error = _ref9.error;
  return /*#__PURE__*/React.createElement(Contained, null, /*#__PURE__*/React.createElement(Spaced, null, /*#__PURE__*/React.createElement(TextStyle, null, "Oh no! Something went wrong loading this Storybook.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(WithTooltip, {
    trigger: "click",
    closeOnClick: false,
    tooltip: /*#__PURE__*/React.createElement(ErrorDisplay, null, /*#__PURE__*/React.createElement(ErrorFormatter, {
      error: error
    }))
  }, /*#__PURE__*/React.createElement(Link, {
    isButton: true
  }, "View error ", /*#__PURE__*/React.createElement(Icons, {
    icon: "arrowdown"
  }))), ' ', /*#__PURE__*/React.createElement(Link, {
    withArrow: true,
    href: "https://storybook.js.org/docs",
    cancel: false,
    target: "_blank"
  }, "View docs"))));
};
ErrorBlock.displayName = "ErrorBlock";
var FlexSpaced = styled(Spaced)({
  display: 'flex'
});
var WideSpaced = styled(Spaced)({
  flex: 1
});
export var EmptyBlock = function EmptyBlock(_ref10) {
  var isMain = _ref10.isMain;
  return /*#__PURE__*/React.createElement(Contained, null, /*#__PURE__*/React.createElement(FlexSpaced, {
    col: 1
  }, /*#__PURE__*/React.createElement(WideSpaced, null, /*#__PURE__*/React.createElement(Text, null, isMain ? /*#__PURE__*/React.createElement(React.Fragment, null, "Oh no! Your Storybook is empty. Possible reasons why:", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "The glob specified in ", /*#__PURE__*/React.createElement("code", null, "main.js"), " isn't correct."), /*#__PURE__*/React.createElement("li", null, "No stories are defined in your story files.")), ' ') : /*#__PURE__*/React.createElement(React.Fragment, null, "Yikes! Something went wrong loading these stories.")))));
};
EmptyBlock.displayName = "EmptyBlock";
export var LoaderBlock = function LoaderBlock(_ref11) {
  var isMain = _ref11.isMain;
  return /*#__PURE__*/React.createElement(Contained, null, /*#__PURE__*/React.createElement(Loader, {
    size: isMain ? 17 : 5
  }));
};
LoaderBlock.displayName = "LoaderBlock";