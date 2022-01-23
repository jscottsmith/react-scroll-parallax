function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.object.values.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import React, { Fragment, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Consumer, merge } from '@storybook/api';
import { SET_CURRENT_STORY } from '@storybook/core-events';
import { addons, types } from '@storybook/addons';
import { Loader } from '@storybook/components';
import { Location } from '@storybook/router';
import * as S from './utils/components';
import { ZoomProvider, ZoomConsumer } from './tools/zoom';
import { defaultWrappers, ApplyWrappers } from './wrappers';
import { ToolbarComp } from './toolbar';
import { FramesRenderer } from './FramesRenderer';

var getWrappers = function getWrappers(getFn) {
  return Object.values(getFn(types.PREVIEW));
};

var getTabs = function getTabs(getFn) {
  return Object.values(getFn(types.TAB));
};

var canvasMapper = function canvasMapper(_ref) {
  var state = _ref.state,
      api = _ref.api;
  return {
    storyId: state.storyId,
    refId: state.refId,
    viewMode: state.viewMode,
    customCanvas: api.renderPreview,
    queryParams: state.customQueryParams,
    getElements: api.getElements,
    story: api.getData(state.storyId, state.refId),
    storiesConfigured: state.storiesConfigured,
    storiesFailed: state.storiesFailed,
    refs: state.refs,
    active: !!(state.viewMode && state.viewMode.match(/^(story|docs)$/))
  };
};

var createCanvas = function createCanvas(id) {
  var baseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'iframe.html';
  var withLoader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return {
    id: 'canvas',
    title: 'Canvas',
    route: function route(_ref2) {
      var storyId = _ref2.storyId,
          refId = _ref2.refId;
      return refId ? "/story/".concat(refId, "_").concat(storyId) : "/story/".concat(storyId);
    },
    match: function match(_ref3) {
      var viewMode = _ref3.viewMode;
      return !!(viewMode && viewMode.match(/^(story|docs)$/));
    },
    render: function render() {
      return /*#__PURE__*/React.createElement(Consumer, {
        filter: canvasMapper
      }, function (_ref4) {
        var story = _ref4.story,
            refs = _ref4.refs,
            customCanvas = _ref4.customCanvas,
            storyId = _ref4.storyId,
            refId = _ref4.refId,
            viewMode = _ref4.viewMode,
            queryParams = _ref4.queryParams,
            getElements = _ref4.getElements,
            storiesConfigured = _ref4.storiesConfigured,
            storiesFailed = _ref4.storiesFailed,
            active = _ref4.active;
        var wrappers = useMemo(function () {
          return [].concat(_toConsumableArray(defaultWrappers), _toConsumableArray(getWrappers(getElements)));
        }, [getElements].concat(_toConsumableArray(defaultWrappers)));
        var isLoading = story ? !!refs[refId] && !refs[refId].ready : !storiesFailed && !storiesConfigured;
        return /*#__PURE__*/React.createElement(ZoomConsumer, null, function (_ref5) {
          var scale = _ref5.value;
          return /*#__PURE__*/React.createElement(React.Fragment, null, withLoader && isLoading && /*#__PURE__*/React.createElement(S.LoaderWrapper, null, /*#__PURE__*/React.createElement(Loader, {
            id: "preview-loader",
            role: "progressbar"
          })), /*#__PURE__*/React.createElement(ApplyWrappers, {
            id: id,
            storyId: storyId,
            viewMode: viewMode,
            active: active,
            wrappers: wrappers
          }, customCanvas ? customCanvas(storyId, viewMode, id, baseUrl, scale, queryParams) : /*#__PURE__*/React.createElement(FramesRenderer, {
            baseUrl: baseUrl,
            refs: refs,
            scale: scale,
            story: story,
            viewMode: viewMode,
            refId: refId,
            queryParams: queryParams,
            storyId: storyId
          })));
        });
      });
    }
  };
};

var useTabs = function useTabs(id, baseUrl, withLoader, getElements, story) {
  var canvas = useMemo(function () {
    return createCanvas(id, baseUrl, withLoader);
  }, [id, baseUrl, withLoader]);
  var tabsFromConfig = useMemo(function () {
    return getTabs(getElements);
  }, [getElements]);
  return useMemo(function () {
    if (story !== null && story !== void 0 && story.parameters) {
      return filterTabs([canvas].concat(_toConsumableArray(tabsFromConfig)), story.parameters);
    }

    return [canvas].concat(_toConsumableArray(tabsFromConfig));
  }, [story, canvas].concat(_toConsumableArray(tabsFromConfig)));
};

var Preview = /*#__PURE__*/React.memo(function (props) {
  var api = props.api,
      previewId = props.id,
      options = props.options,
      viewMode = props.viewMode,
      storyId = props.storyId,
      _props$story = props.story,
      story = _props$story === void 0 ? undefined : _props$story,
      description = props.description,
      baseUrl = props.baseUrl,
      _props$withLoader = props.withLoader,
      withLoader = _props$withLoader === void 0 ? true : _props$withLoader;
  var getElements = api.getElements;
  var tabs = useTabs(previewId, baseUrl, withLoader, getElements, story);
  var shouldScale = viewMode === 'story';
  var isToolshown = options.isToolshown;
  var previousStoryId = useRef(storyId);
  var previousViewMode = useRef(viewMode);
  useEffect(function () {
    if (story && viewMode) {
      // Don't emit the event on first ("real") render, only when story or mode changes
      if (storyId !== previousStoryId.current || viewMode !== previousViewMode.current) {
        previousStoryId.current = storyId;
        previousViewMode.current = viewMode;

        if (viewMode.match(/docs|story/)) {
          var refId = story.refId,
              id = story.id;
          api.emit(SET_CURRENT_STORY, {
            storyId: id,
            viewMode: viewMode,
            options: {
              target: refId ? "storybook-ref-".concat(refId) : 'storybook-preview-iframe'
            }
          });
        }
      }
    }
  }, [story, viewMode]);
  return /*#__PURE__*/React.createElement(Fragment, null, previewId === 'main' && /*#__PURE__*/React.createElement(Helmet, {
    key: "description"
  }, /*#__PURE__*/React.createElement("title", null, description)), /*#__PURE__*/React.createElement(ZoomProvider, {
    shouldScale: shouldScale
  }, /*#__PURE__*/React.createElement(ToolbarComp, {
    key: "tools",
    story: story,
    api: api,
    isShown: isToolshown,
    tabs: tabs
  }), /*#__PURE__*/React.createElement(S.FrameWrap, {
    key: "frame",
    offset: isToolshown ? 40 : 0
  }, tabs.map(function (_ref6, i) {
    var Render = _ref6.render,
        match = _ref6.match,
        t = _objectWithoutProperties(_ref6, ["render", "match"]);

    // @ts-ignore
    var key = t.id || t.key || i;
    return /*#__PURE__*/React.createElement(Fragment, {
      key: key
    }, /*#__PURE__*/React.createElement(Location, null, function (lp) {
      return /*#__PURE__*/React.createElement(Render, {
        active: match(lp)
      });
    }));
  }))));
});
export { Preview };

function filterTabs(panels, parameters) {
  var _addons$getConfig = addons.getConfig(),
      previewTabs = _addons$getConfig.previewTabs;

  var parametersTabs = parameters ? parameters.previewTabs : undefined;

  if (previewTabs || parametersTabs) {
    // deep merge global and local settings
    var tabs = merge(previewTabs, parametersTabs);
    var arrTabs = Object.keys(tabs).map(function (key, index) {
      return Object.assign({
        index: index
      }, typeof tabs[key] === 'string' ? {
        title: tabs[key]
      } : tabs[key], {
        id: key
      });
    });
    return panels.filter(function (panel) {
      var t = arrTabs.find(function (tab) {
        return tab.id === panel.id;
      });
      return t === undefined || t.id === 'canvas' || !t.hidden;
    }).map(function (panel, index) {
      return Object.assign({}, panel, {
        index: index
      });
    }).sort(function (p1, p2) {
      var tab_1 = arrTabs.find(function (tab) {
        return tab.id === p1.id;
      }); // @ts-ignore

      var index_1 = tab_1 ? tab_1.index : arrTabs.length + p1.index;
      var tab_2 = arrTabs.find(function (tab) {
        return tab.id === p2.id;
      }); // @ts-ignore

      var index_2 = tab_2 ? tab_2.index : arrTabs.length + p2.index;
      return index_1 - index_2;
    }).map(function (panel) {
      var t = arrTabs.find(function (tab) {
        return tab.id === panel.id;
      });

      if (t) {
        return Object.assign({}, panel, {
          title: t.title || panel.title,
          disabled: t.disabled,
          hidden: t.hidden
        });
      }

      return panel;
    });
  }

  return panels;
}