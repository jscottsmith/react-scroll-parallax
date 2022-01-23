function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.string.search.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import global from 'global';
import React, { useCallback } from 'react';
import { Link, BrowserRouter, useNavigate, useLocation, Router } from 'react-router-dom';
import { ToggleVisibility } from './visibility';
import { queryFromString, parsePath, getMatch } from './utils';
var document = global.document;

var getBase = function getBase() {
  return "".concat(document.location.pathname, "?");
};

// const queryNavigate: NavigateFn = (to: string | number, options?: NavigateOptions<{}>) =>
//   typeof to === 'number' ? navigate(to) : navigate(`${getBase()}path=${to}`, options);
var useQueryNavigate = function useQueryNavigate() {
  var navigate = useNavigate();
  return useCallback(function (to, options) {
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


var QueryLink = function QueryLink(_ref) {
  var to = _ref.to,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["to", "children"]);

  return /*#__PURE__*/React.createElement(Link, _extends({
    to: "".concat(getBase(), "path=").concat(to)
  }, rest), children);
};

QueryLink.displayName = "QueryLink";
QueryLink.displayName = 'QueryLink'; // A render-prop component where children is called with a location
// and will be called whenever it changes when it changes

var QueryLocation = function QueryLocation(_ref2) {
  var children = _ref2.children;
  var location = useLocation();

  var _queryFromString = queryFromString(location.search),
      path = _queryFromString.path,
      singleStory = _queryFromString.singleStory;

  var _parsePath = parsePath(path),
      viewMode = _parsePath.viewMode,
      storyId = _parsePath.storyId,
      refId = _parsePath.refId;

  return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path: path,
    location: location,
    viewMode: viewMode,
    storyId: storyId,
    refId: refId,
    singleStory: singleStory === 'true'
  }));
};

QueryLocation.displayName = 'QueryLocation'; // A render-prop component for rendering when a certain path is hit.
// It's immensely similar to `Location` but it receives an addition data property: `match`.
// match has a truthy value when the path is hit.

var QueryMatch = function QueryMatch(_ref3) {
  var children = _ref3.children,
      targetPath = _ref3.path,
      _ref3$startsWith = _ref3.startsWith,
      startsWith = _ref3$startsWith === void 0 ? false : _ref3$startsWith;
  return /*#__PURE__*/React.createElement(QueryLocation, null, function (_ref4) {
    var urlPath = _ref4.path,
        rest = _objectWithoutProperties(_ref4, ["path"]);

    return children(Object.assign({
      match: getMatch(urlPath, targetPath, startsWith)
    }, rest));
  });
};

QueryMatch.displayName = "QueryMatch";
QueryMatch.displayName = 'QueryMatch'; // A component to conditionally render children based on matching a target path

var Route = function Route(_ref5) {
  var path = _ref5.path,
      children = _ref5.children,
      _ref5$startsWith = _ref5.startsWith,
      startsWith = _ref5$startsWith === void 0 ? false : _ref5$startsWith,
      _ref5$hideOnly = _ref5.hideOnly,
      hideOnly = _ref5$hideOnly === void 0 ? false : _ref5$hideOnly;
  return /*#__PURE__*/React.createElement(QueryMatch, {
    path: path,
    startsWith: startsWith
  }, function (_ref6) {
    var match = _ref6.match;

    if (hideOnly) {
      return /*#__PURE__*/React.createElement(ToggleVisibility, {
        hidden: !match
      }, children);
    }

    return match ? children : null;
  });
};

Route.displayName = "Route";
Route.displayName = 'Route';
export { QueryLink as Link };
export { QueryMatch as Match };
export { QueryLocation as Location };
export { Route };
export { useQueryNavigate as useNavigate };
export { BrowserRouter as LocationProvider };
export { Router as BaseLocationProvider };
export { useNavigate as usePlainNavigate }; // eslint-disable-next-line no-undef