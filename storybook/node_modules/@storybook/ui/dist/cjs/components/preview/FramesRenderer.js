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
exports.FramesRenderer = void 0;

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.entries.js");

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _components = require("@storybook/components");

var _theming = require("@storybook/theming");

var _iframe = require("./iframe");

var _stringifyQueryParams = require("./utils/stringifyQueryParams");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getActive = function getActive(refId) {
  if (refId) {
    return "storybook-ref-".concat(refId);
  }

  return 'storybook-preview-iframe';
};

var SkipToSidebarLink = (0, _theming.styled)(_components.Button)(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'none',
    '@media (min-width: 600px)': {
      display: 'block',
      position: 'absolute',
      top: 10,
      right: 15,
      padding: '10px 15px',
      fontSize: theme.typography.size.s1,
      transform: 'translateY(-100px)',
      '&:focus': {
        transform: 'translateY(0)',
        zIndex: 1
      }
    }
  };
});

var whenSidebarIsVisible = function whenSidebarIsVisible(_ref2) {
  var state = _ref2.state;
  return {
    isFullscreen: state.layout.isFullscreen,
    showNav: state.layout.showNav,
    selectedStoryId: state.storyId
  };
};

var FramesRenderer = function FramesRenderer(_ref3) {
  var _refs$refId;

  var refs = _ref3.refs,
      story = _ref3.story,
      scale = _ref3.scale,
      _ref3$viewMode = _ref3.viewMode,
      viewMode = _ref3$viewMode === void 0 ? 'story' : _ref3$viewMode,
      refId = _ref3.refId,
      _ref3$queryParams = _ref3.queryParams,
      queryParams = _ref3$queryParams === void 0 ? {} : _ref3$queryParams,
      baseUrl = _ref3.baseUrl,
      _ref3$storyId = _ref3.storyId,
      storyId = _ref3$storyId === void 0 ? '*' : _ref3$storyId;
  var version = (_refs$refId = refs[refId]) === null || _refs$refId === void 0 ? void 0 : _refs$refId.version;
  var stringifiedQueryParams = (0, _stringifyQueryParams.stringifyQueryParams)(Object.assign({}, queryParams, version && {
    version: version
  }));
  var active = getActive(refId);
  var styles = (0, _react.useMemo)(function () {
    return {
      '[data-is-storybook="false"]': {
        visibility: 'hidden'
      },
      '[data-is-storybook="true"]': {
        visibility: 'visible'
      }
    };
  }, []);

  var _useState = (0, _react.useState)({
    'storybook-preview-iframe': "".concat(baseUrl, "?id=").concat(storyId, "&viewMode=").concat(viewMode).concat(stringifiedQueryParams)
  }),
      _useState2 = _slicedToArray(_useState, 2),
      frames = _useState2[0],
      setFrames = _useState2[1];

  (0, _react.useEffect)(function () {
    var newFrames = Object.values(refs).filter(function (r) {
      if (r.error) {
        return false;
      }

      if (r.type === 'auto-inject') {
        return true;
      }

      if (story && r.id === story.refId) {
        return true;
      }

      return false;
    }).reduce(function (acc, r) {
      return Object.assign({}, acc, _defineProperty({}, "storybook-ref-".concat(r.id), "".concat(r.url, "/iframe.html?id=").concat(storyId, "&viewMode=").concat(viewMode, "&refId=").concat(r.id).concat(stringifiedQueryParams)));
    }, frames);
    setFrames(newFrames);
  }, [storyId, story, refs]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_theming.Global, {
    styles: styles
  }), /*#__PURE__*/_react.default.createElement(_api.Consumer, {
    filter: whenSidebarIsVisible
  }, function (_ref4) {
    var isFullscreen = _ref4.isFullscreen,
        showNav = _ref4.showNav,
        selectedStoryId = _ref4.selectedStoryId;

    if (!isFullscreen && !!showNav && selectedStoryId) {
      return /*#__PURE__*/_react.default.createElement(SkipToSidebarLink, {
        secondary: true,
        isLink: true,
        tabIndex: 0,
        href: "#".concat(selectedStoryId)
      }, "Skip to sidebar");
    }

    return null;
  }), Object.entries(frames).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        id = _ref6[0],
        src = _ref6[1];

    return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
      key: id
    }, /*#__PURE__*/_react.default.createElement(_iframe.IFrame, {
      active: id === active,
      key: refs[id] ? refs[id].url : id,
      id: id,
      title: id,
      src: src,
      allowFullScreen: true,
      scale: scale
    }));
  }));
};

exports.FramesRenderer = FramesRenderer;
FramesRenderer.displayName = "FramesRenderer";