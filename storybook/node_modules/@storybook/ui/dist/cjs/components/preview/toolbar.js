"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterTools = filterTools;
exports.Tools = exports.ToolbarComp = exports.ToolRes = exports.defaultToolsExtra = exports.defaultTools = exports.createTabsTool = exports.fullScreenTool = exports.Toolbar = exports.getToolsExtra = exports.getTools = void 0;

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.regexp.exec.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _api = require("@storybook/api");

var _shortcut = require("@storybook/api/shortcut");

var _addons = require("@storybook/addons");

var _router = require("@storybook/router");

var _zoom = require("./tools/zoom");

var S = _interopRequireWildcard(require("./utils/components"));

var _copy = require("./tools/copy");

var _eject = require("./tools/eject");

var _menu = require("./tools/menu");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getTools = function getTools(getFn) {
  return Object.values(getFn(_addons.types.TOOL));
};

exports.getTools = getTools;

var getToolsExtra = function getToolsExtra(getFn) {
  return Object.values(getFn(_addons.types.TOOLEXTRA));
};

exports.getToolsExtra = getToolsExtra;

var Bar = function Bar(_ref) {
  var shown = _ref.shown,
      props = _objectWithoutProperties(_ref, ["shown"]);

  return /*#__PURE__*/_react.default.createElement(_components.FlexBar, props);
};

Bar.displayName = "Bar";
var Toolbar = (0, _theming.styled)(Bar)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  transition: 'transform .2s linear'
}, function (_ref2) {
  var shown = _ref2.shown;
  return {
    transform: shown ? 'translateY(0px)' : 'translateY(-40px)'
  };
});
exports.Toolbar = Toolbar;

var fullScreenMapper = function fullScreenMapper(_ref3) {
  var api = _ref3.api,
      state = _ref3.state;
  return {
    toggle: api.toggleFullscreen,
    value: state.layout.isFullscreen,
    shortcut: (0, _shortcut.shortcutToHumanString)(api.getShortcutKeys().fullScreen),
    hasPanel: Object.keys(api.getPanels()).length > 0,
    singleStory: state.singleStory
  };
};

var fullScreenTool = {
  title: 'fullscreen',
  id: 'fullscreen',
  match: function match(p) {
    return ['story', 'docs'].includes(p.viewMode);
  },
  render: function render() {
    return /*#__PURE__*/_react.default.createElement(_api.Consumer, {
      filter: fullScreenMapper
    }, function (_ref4) {
      var toggle = _ref4.toggle,
          value = _ref4.value,
          shortcut = _ref4.shortcut,
          hasPanel = _ref4.hasPanel,
          singleStory = _ref4.singleStory;
      return (!singleStory || singleStory && hasPanel) && /*#__PURE__*/_react.default.createElement(S.DesktopOnly, null, /*#__PURE__*/_react.default.createElement(_components.IconButton, {
        key: "full",
        onClick: toggle,
        title: "".concat(value ? 'Exit full screen' : 'Go full screen', " [").concat(shortcut, "]")
      }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
        icon: value ? 'close' : 'expand'
      })));
    });
  }
};
exports.fullScreenTool = fullScreenTool;

var tabsMapper = function tabsMapper(_ref5) {
  var state = _ref5.state;
  return {
    viewMode: state.docsOnly,
    storyId: state.storyId,
    path: state.path,
    location: state.location,
    refId: state.refId
  };
};

var createTabsTool = function createTabsTool(tabs) {
  return {
    title: 'title',
    id: 'title',
    render: function render() {
      return /*#__PURE__*/_react.default.createElement(_api.Consumer, {
        filter: tabsMapper
      }, function (rp) {
        return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_components.TabBar, {
          key: "tabs"
        }, tabs.filter(function (p) {
          return !p.hidden;
        }).map(function (t, index) {
          var to = t.route(rp);
          var isActive = rp.path === to;
          return /*#__PURE__*/_react.default.createElement(S.UnstyledLink, {
            key: t.id || "l".concat(index),
            to: to
          }, /*#__PURE__*/_react.default.createElement(_components.TabButton, {
            disabled: t.disabled,
            active: isActive
          }, t.title));
        })), /*#__PURE__*/_react.default.createElement(_components.Separator, null));
      });
    }
  };
};

exports.createTabsTool = createTabsTool;
var defaultTools = [_zoom.zoomTool];
exports.defaultTools = defaultTools;
var defaultToolsExtra = [fullScreenTool, _eject.ejectTool, _copy.copyTool];
exports.defaultToolsExtra = defaultToolsExtra;

var useTools = function useTools(getElements, tabs, viewMode, story, location, path) {
  var toolsFromConfig = (0, _react.useMemo)(function () {
    return getTools(getElements);
  }, [getElements]);
  var toolsExtraFromConfig = (0, _react.useMemo)(function () {
    return getToolsExtra(getElements);
  }, [getElements]);
  var tools = (0, _react.useMemo)(function () {
    return [].concat(defaultTools, _toConsumableArray(toolsFromConfig));
  }, [defaultTools, toolsFromConfig]);
  var toolsExtra = (0, _react.useMemo)(function () {
    return [].concat(defaultToolsExtra, _toConsumableArray(toolsExtraFromConfig));
  }, [defaultToolsExtra, toolsExtraFromConfig]);
  return (0, _react.useMemo)(function () {
    return story && story.parameters ? filterTools(tools, toolsExtra, tabs, {
      viewMode: viewMode,
      story: story,
      location: location,
      path: path
    }) : {
      left: tools,
      right: toolsExtra
    };
  }, [viewMode, story, location, path, tools, toolsExtra, tabs]);
};

var ToolRes = /*#__PURE__*/_react.default.memo(function (_ref6) {
  var api = _ref6.api,
      story = _ref6.story,
      tabs = _ref6.tabs,
      isShown = _ref6.isShown,
      location = _ref6.location,
      path = _ref6.path,
      viewMode = _ref6.viewMode;

  var _useTools = useTools(api.getElements, tabs, viewMode, story, location, path),
      left = _useTools.left,
      right = _useTools.right;

  return left || right ? /*#__PURE__*/_react.default.createElement(Toolbar, {
    key: "toolbar",
    shown: isShown,
    border: true
  }, /*#__PURE__*/_react.default.createElement(Tools, {
    key: "left",
    list: left
  }), /*#__PURE__*/_react.default.createElement(Tools, {
    key: "right",
    list: right
  })) : null;
});

exports.ToolRes = ToolRes;

var ToolbarComp = /*#__PURE__*/_react.default.memo(function (props) {
  return /*#__PURE__*/_react.default.createElement(_router.Location, null, function (_ref7) {
    var location = _ref7.location,
        path = _ref7.path,
        viewMode = _ref7.viewMode;
    return /*#__PURE__*/_react.default.createElement(ToolRes, _extends({}, props, {
      location: location,
      path: path,
      viewMode: viewMode
    }));
  });
});

exports.ToolbarComp = ToolbarComp;

var Tools = /*#__PURE__*/_react.default.memo(function (_ref8) {
  var list = _ref8.list;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, list.filter(Boolean).map(function (_ref9, index) {
    var Render = _ref9.render,
        id = _ref9.id,
        t = _objectWithoutProperties(_ref9, ["render", "id"]);

    return (
      /*#__PURE__*/
      // @ts-ignore
      _react.default.createElement(Render, {
        key: id || t.key || "f-".concat(index)
      })
    );
  }));
});

exports.Tools = Tools;

function toolbarItemHasBeenExcluded(item, story) {
  var _toolbarItems$item$id;

  var toolbarItemsFromStoryParameters = 'toolbar' in story.parameters ? story.parameters.toolbar : undefined;

  var _addons$getConfig = _addons.addons.getConfig(),
      toolbarItemsFromAddonsConfig = _addons$getConfig.toolbar;

  var toolbarItems = (0, _api.merge)(toolbarItemsFromAddonsConfig, toolbarItemsFromStoryParameters);
  return toolbarItems ? !!((_toolbarItems$item$id = toolbarItems[item.id]) !== null && _toolbarItems$item$id !== void 0 && _toolbarItems$item$id.hidden) : false;
}

function filterTools(tools, toolsExtra, tabs, _ref10) {
  var viewMode = _ref10.viewMode,
      story = _ref10.story,
      location = _ref10.location,
      path = _ref10.path;
  var toolsLeft = [_menu.menuTool, tabs.filter(function (p) {
    return !p.hidden;
  }).length >= 1 && createTabsTool(tabs)].concat(_toConsumableArray(tools));

  var toolsRight = _toConsumableArray(toolsExtra);

  var filter = function filter(item) {
    return item && (!item.match || item.match({
      storyId: story.id,
      refId: story.refId,
      viewMode: viewMode,
      location: location,
      path: path
    })) && !toolbarItemHasBeenExcluded(item, story);
  };

  var left = toolsLeft.filter(filter);
  var right = toolsRight.filter(filter);
  return {
    left: left,
    right: right
  };
}