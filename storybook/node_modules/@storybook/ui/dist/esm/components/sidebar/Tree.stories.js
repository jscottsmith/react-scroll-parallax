function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/web.dom-collections.for-each.js";
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

/* eslint-disable storybook/use-storybook-testing-library */
// @TODO: use addon-interactions and remove the rule disable above
import React from 'react';
import { screen } from '@testing-library/dom';
import { Tree } from './Tree';
import { stories } from './mockdata.large';
import { DEFAULT_REF_ID } from './data';
export default {
  component: Tree,
  title: 'UI/Sidebar/Tree',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (storyFn) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};
var refId = DEFAULT_REF_ID;
var storyId = Object.values(stories).find(function (story) {
  return story.isLeaf && !story.isComponent;
}).id;

var log = function log(id) {
  return console.log(id);
};

export var Full = function Full() {
  var _React$useState = React.useState(storyId),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selectedId = _React$useState2[0],
      setSelectedId = _React$useState2[1];

  return /*#__PURE__*/React.createElement(Tree, {
    isBrowsing: true,
    isMain: true,
    refId: refId,
    data: stories,
    highlightedRef: {
      current: {
        itemId: selectedId,
        refId: refId
      }
    },
    setHighlightedItemId: log,
    selectedStoryId: selectedId,
    onSelectStoryId: setSelectedId
  });
};
Full.displayName = "Full";
var singleStoryComponent = {
  single: {
    name: 'Single',
    id: 'single',
    parent: false,
    depth: 0,
    children: ['single--single'],
    isComponent: true,
    isLeaf: false,
    isRoot: false,
    label: /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD25 Single")
  },
  'single--single': {
    id: 'single--single',
    kind: 'Single',
    name: 'Single',
    story: 'Single',
    args: {},
    argTypes: {},
    initialArgs: {},
    depth: 1,
    parent: 'single',
    isLeaf: true,
    isComponent: false,
    isRoot: false,
    label: /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD25 Single")
  }
};
var tooltipStories = Object.keys(stories).reduce(function (acc, key) {
  if (key === 'tooltip-tooltipselect--default') {
    acc['tooltip-tooltipselect--tooltipselect'] = Object.assign({}, stories[key], {
      id: 'tooltip-tooltipselect--tooltipselect',
      name: 'TooltipSelect'
    });
    return acc;
  }

  if (key === 'tooltip-tooltipselect') {
    acc[key] = Object.assign({}, stories[key], {
      children: ['tooltip-tooltipselect--tooltipselect']
    });
    return acc;
  }

  if (key.startsWith('tooltip')) acc[key] = stories[key];
  return acc;
}, {});
export var SingleStoryComponents = function SingleStoryComponents() {
  var _React$useState3 = React.useState('tooltip-tooltipbuildlist--default'),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      selectedId = _React$useState4[0],
      setSelectedId = _React$useState4[1];

  return /*#__PURE__*/React.createElement(Tree, {
    isBrowsing: true,
    isMain: true,
    refId: refId,
    data: Object.assign({}, singleStoryComponent, tooltipStories),
    highlightedRef: {
      current: {
        itemId: selectedId,
        refId: refId
      }
    },
    setHighlightedItemId: log,
    selectedStoryId: selectedId,
    onSelectStoryId: setSelectedId
  });
};
SingleStoryComponents.displayName = "SingleStoryComponents";
// node must be selected, highlighted, and focused
// in order to tab to 'Skip to canvas' link
export var SkipToCanvasLinkFocused = {
  args: {
    isBrowsing: true,
    isMain: true,
    refId: refId,
    data: stories,
    highlightedRef: {
      current: {
        itemId: 'tooltip-tooltipbuildlist--default',
        refId: refId
      }
    },
    setHighlightedItemId: log,
    selectedStoryId: 'tooltip-tooltipbuildlist--default',
    onSelectStoryId: function onSelectStoryId() {}
  },
  parameters: {
    chromatic: {
      delay: 300
    }
  },
  play: function play() {
    // focus each instance for chromatic/storybook's stacked theme
    screen.getAllByText('Skip to canvas').forEach(function (x) {
      return x.focus();
    });
  }
};