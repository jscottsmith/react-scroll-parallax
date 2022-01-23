"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

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
Object.defineProperty(exports, "LocationProvider", {
  enumerable: true,
  get: function get() {
    return _reactRouterDom.BrowserRouter;
  }
});
Object.defineProperty(exports, "usePlainNavigate", {
  enumerable: true,
  get: function get() {
    return _reactRouterDom.useNavigate;
  }
});
Object.defineProperty(exports, "BaseLocationProvider", {
  enumerable: true,
  get: function get() {
    return _reactRouterDom.Router;
  }
});
exports.useNavigate = exports.Route = exports.Location = exports.Match = exports.Link = void 0;

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.string.match.js");

var _global = _interopRequireDefault(require("global"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _visibility = require("./visibility");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var document = _global.default.document;

var getBase = function getBase() {
  return "".concat(document.location.pathname, "?");
};

// const queryNavigate: NavigateFn = (to: string | number, options?: NavigateOptions<{}>) =>
//   typeof to === 'number' ? navigate(to) : navigate(`${getBase()}path=${to}`, options);
var useQueryNavigate = function useQueryNavigate() {
  var navigate = (0, _reactRouterDom.useNavigate)();
  return (0, _react.useCallback)(function (to, options) {
    if (typeof to === 'string' && to.startsWith('#')) {
      document.location.hash = to;
      return undefined;
    }

    if (typeof to === 'string') {
      var target = options !== null && options !== void 0 && options.plain ? to : "?path=".concat(to);
      return navigate(target, options);
    }

    if (typeof to === 'number') {
      return navigate(to);
    }

    return undefined;
  }, []);
}; // A component that will navigate to a new location/path when clicked


exports.useNavigate = useQueryNavigate;

var QueryLink = function QueryLink(_ref) {
  var to = _ref.to,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["to", "children"]);

  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, _extends({
    to: "".concat(getBase(), "path=").concat(to)
  }, rest), children);
};

exports.Link = QueryLink;
QueryLink.displayName = "QueryLink";
QueryLink.displayName = 'QueryLink'; // A render-prop component where children is called with a location
// and will be called whenever it changes when it changes

var QueryLocation = function QueryLocation(_ref2) {
  var children = _ref2.children;
  var location = (0, _reactRouterDom.useLocation)();

  var _queryFromString = (0, _utils.queryFromString)(location.search),
      path = _queryFromString.path,
      singleStory = _queryFromString.singleStory;

  var _parsePath = (0, _utils.parsePath)(path),
      viewMode = _parsePath.viewMode,
      storyId = _parsePath.storyId,
      refId = _parsePath.refId;

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children({
    path: path,
    location: location,
    viewMode: viewMode,
    storyId: storyId,
    refId: refId,
    singleStory: singleStory === 'true'
  }));
};

exports.Location = QueryLocation;
QueryLocation.displayName = 'QueryLocation'; // A render-prop component for rendering when a certain path is hit.
// It's immensely similar to `Location` but it receives an addition data property: `match`.
// match has a truthy value when the path is hit.

var QueryMatch = function QueryMatch(_ref3) {
  var children = _ref3.children,
      targetPath = _ref3.path,
      _ref3$startsWith = _ref3.startsWith,
      startsWith = _ref3$startsWith === void 0 ? false : _ref3$startsWith;
  return /*#__PURE__*/_react.default.createElement(QueryLocation, null, function (_ref4) {
    var urlPath = _ref4.path,
        rest = _objectWithoutProperties(_ref4, ["path"]);

    return children(Object.assign({
      match: (0, _utils.getMatch)(urlPath, targetPath, startsWith)
    }, rest));
  });
};

exports.Match = QueryMatch;
QueryMatch.displayName = "QueryMatch";
QueryMatch.displayName = 'QueryMatch'; // A component to conditionally render children based on matching a target path

var Route = function Route(_ref5) {
  var path = _ref5.path,
      children = _ref5.children,
      _ref5$startsWith = _ref5.startsWith,
      startsWith = _ref5$startsWith === void 0 ? false : _ref5$startsWith,
      _ref5$hideOnly = _ref5.hideOnly,
      hideOnly = _ref5$hideOnly === void 0 ? false : _ref5$hideOnly;
  return /*#__PURE__*/_react.default.createElement(QueryMatch, {
    path: path,
    startsWith: startsWith
  }, function (_ref6) {
    var match = _ref6.match;

    if (hideOnly) {
      return /*#__PURE__*/_react.default.createElement(_visibility.ToggleVisibility, {
        hidden: !match
      }, children);
    }

    return match ? children : null;
  });
};

exports.Route = Route;
Route.displayName = "Route";
Route.displayName = 'Route'; // eslint-disable-next-line no-undef