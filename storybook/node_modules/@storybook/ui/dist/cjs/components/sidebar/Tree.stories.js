"use strict";

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToCanvasLinkFocused = exports.SingleStoryComponents = exports.Full = exports.default = void 0;

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/web.dom-collections.for-each.js");

var _react = _interopRequireDefault(require("react"));

var _dom = require("@testing-library/dom");

var _Tree = require("./Tree");

var _mockdata = require("./mockdata.large");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  component: _Tree.Tree,
  title: 'UI/Sidebar/Tree',
  excludeStories: /.*Data$/,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        maxWidth: '230px'
      }
    }, storyFn());
  }]
};
exports.default = _default;
var refId = _data.DEFAULT_REF_ID;
var storyId = Object.values(_mockdata.stories).find(function (story) {
  return story.isLeaf && !story.isComponent;
}).id;

var log = function log(id) {
  return console.log(id);
};

var Full = function Full() {
  var _React$useState = _react.default.useState(storyId),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selectedId = _React$useState2[0],
      setSelectedId = _React$useState2[1];

  return /*#__PURE__*/_react.default.createElement(_Tree.Tree, {
    isBrowsing: true,
    isMain: true,
    refId: refId,
    data: _mockdata.stories,
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

exports.Full = Full;
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
    label: /*#__PURE__*/_react.default.createElement("span", null, "\uD83D\uDD25 Single")
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
    label: /*#__PURE__*/_react.default.createElement("span", null, "\uD83D\uDD25 Single")
  }
};
var tooltipStories = Object.keys(_mockdata.stories).reduce(function (acc, key) {
  if (key === 'tooltip-tooltipselect--default') {
    acc['tooltip-tooltipselect--tooltipselect'] = Object.assign({}, _mockdata.stories[key], {
      id: 'tooltip-tooltipselect--tooltipselect',
      name: 'TooltipSelect'
    });
    return acc;
  }

  if (key === 'tooltip-tooltipselect') {
    acc[key] = Object.assign({}, _mockdata.stories[key], {
      children: ['tooltip-tooltipselect--tooltipselect']
    });
    return acc;
  }

  if (key.startsWith('tooltip')) acc[key] = _mockdata.stories[key];
  return acc;
}, {});

var SingleStoryComponents = function SingleStoryComponents() {
  var _React$useState3 = _react.default.useState('tooltip-tooltipbuildlist--default'),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      selectedId = _React$useState4[0],
      setSelectedId = _React$useState4[1];

  return /*#__PURE__*/_react.default.createElement(_Tree.Tree, {
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

exports.SingleStoryComponents = SingleStoryComponents;
SingleStoryComponents.displayName = "SingleStoryComponents";
// node must be selected, highlighted, and focused
// in order to tab to 'Skip to canvas' link
var SkipToCanvasLinkFocused = {
  args: {
    isBrowsing: true,
    isMain: true,
    refId: refId,
    data: _mockdata.stories,
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
    _dom.screen.getAllByText('Skip to canvas').forEach(function (x) {
      return x.focus();
    });
  }
};
exports.SkipToCanvasLinkFocused = SkipToCanvasLinkFocused;