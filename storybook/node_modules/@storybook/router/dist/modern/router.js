function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import global from 'global';
import React, { useCallback } from 'react';
import { Link, BrowserRouter, useNavigate, useLocation, Router } from 'react-router-dom';
import { ToggleVisibility } from './visibility';
import { queryFromString, parsePath, getMatch } from './utils';
const {
  document
} = global;

const getBase = () => `${document.location.pathname}?`;

// const queryNavigate: NavigateFn = (to: string | number, options?: NavigateOptions<{}>) =>
//   typeof to === 'number' ? navigate(to) : navigate(`${getBase()}path=${to}`, options);
const useQueryNavigate = () => {
  const navigate = useNavigate();
  return useCallback((to, options) => {
    if (typeof to === 'string' && to.startsWith('#')) {
      document.location.hash = to;
      return undefined;
    }

    if (typeof to === 'string') {
      const target = options !== null && options !== void 0 && options.plain ? to : `?path=${to}`;
      return navigate(target, options);
    }

    if (typeof to === 'number') {
      return navigate(to);
    }

    return undefined;
  }, []);
}; // A component that will navigate to a new location/path when clicked


const QueryLink = (_ref) => {
  let {
    to,
    children
  } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, ["to", "children"]);

  return /*#__PURE__*/React.createElement(Link, _extends({
    to: `${getBase()}path=${to}`
  }, rest), children);
};

QueryLink.displayName = "QueryLink";
QueryLink.displayName = 'QueryLink'; // A render-prop component where children is called with a location
// and will be called whenever it changes when it changes

const QueryLocation = ({
  children
}) => {
  const location = useLocation();
  const {
    path,
    singleStory
  } = queryFromString(location.search);
  const {
    viewMode,
    storyId,
    refId
  } = parsePath(path);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    path,
    location,
    viewMode,
    storyId,
    refId,
    singleStory: singleStory === 'true'
  }));
};

QueryLocation.displayName = 'QueryLocation'; // A render-prop component for rendering when a certain path is hit.
// It's immensely similar to `Location` but it receives an addition data property: `match`.
// match has a truthy value when the path is hit.

const QueryMatch = ({
  children,
  path: targetPath,
  startsWith = false
}) => /*#__PURE__*/React.createElement(QueryLocation, null, (_ref2) => {
  let {
    path: urlPath
  } = _ref2,
      rest = _objectWithoutPropertiesLoose(_ref2, ["path"]);

  return children(Object.assign({
    match: getMatch(urlPath, targetPath, startsWith)
  }, rest));
});

QueryMatch.displayName = "QueryMatch";
QueryMatch.displayName = 'QueryMatch'; // A component to conditionally render children based on matching a target path

const Route = ({
  path,
  children,
  startsWith = false,
  hideOnly = false
}) => /*#__PURE__*/React.createElement(QueryMatch, {
  path: path,
  startsWith: startsWith
}, ({
  match
}) => {
  if (hideOnly) {
    return /*#__PURE__*/React.createElement(ToggleVisibility, {
      hidden: !match
    }, children);
  }

  return match ? children : null;
});

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