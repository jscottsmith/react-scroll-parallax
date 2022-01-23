"use strict";

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExpanded = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.repeat.js");

var _api = require("@storybook/api");

var _coreEvents = require("@storybook/core-events");

var _global = _interopRequireDefault(require("global"));

var _throttle = _interopRequireDefault(require("lodash/throttle"));

var _react = require("react");

var _keybinding = require("../../keybinding");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var document = _global.default.document;

var initializeExpanded = function initializeExpanded(_ref) {
  var _highlightedRef$curre, _highlightedRef$curre2;

  var refId = _ref.refId,
      data = _ref.data,
      initialExpanded = _ref.initialExpanded,
      highlightedRef = _ref.highlightedRef,
      rootIds = _ref.rootIds;
  var highlightedAncestors = ((_highlightedRef$curre = highlightedRef.current) === null || _highlightedRef$curre === void 0 ? void 0 : _highlightedRef$curre.refId) === refId ? (0, _utils.getAncestorIds)(data, (_highlightedRef$curre2 = highlightedRef.current) === null || _highlightedRef$curre2 === void 0 ? void 0 : _highlightedRef$curre2.itemId) : [];
  return [].concat(_toConsumableArray(rootIds), _toConsumableArray(highlightedAncestors)).reduce(function (acc, id) {
    return Object.assign(acc, _defineProperty({}, id, id in initialExpanded ? initialExpanded[id] : true));
  }, {});
};

var noop = function noop() {};

var useExpanded = function useExpanded(_ref2) {
  var containerRef = _ref2.containerRef,
      isBrowsing = _ref2.isBrowsing,
      refId = _ref2.refId,
      data = _ref2.data,
      initialExpanded = _ref2.initialExpanded,
      rootIds = _ref2.rootIds,
      highlightedRef = _ref2.highlightedRef,
      setHighlightedItemId = _ref2.setHighlightedItemId,
      selectedStoryId = _ref2.selectedStoryId,
      onSelectStoryId = _ref2.onSelectStoryId;
  var api = (0, _api.useStorybookApi)(); // Track the set of currently expanded nodes within this tree.
  // Root nodes are expanded by default.

  var _useReducer = (0, _react.useReducer)(function (state, _ref3) {
    var ids = _ref3.ids,
        value = _ref3.value;
    return ids.reduce(function (acc, id) {
      return Object.assign(acc, _defineProperty({}, id, value));
    }, Object.assign({}, state));
  }, {
    refId: refId,
    data: data,
    highlightedRef: highlightedRef,
    rootIds: rootIds,
    initialExpanded: initialExpanded
  }, initializeExpanded),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      expanded = _useReducer2[0],
      setExpanded = _useReducer2[1];

  var getElementByDataItemId = (0, _react.useCallback)(function (id) {
    var _containerRef$current;

    return (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelector("[data-item-id=\"".concat(id, "\"]"));
  }, [containerRef]);
  var highlightElement = (0, _react.useCallback)(function (element) {
    setHighlightedItemId(element.getAttribute('data-item-id'));
    (0, _utils.scrollIntoView)(element);
  }, [setHighlightedItemId]);
  var updateExpanded = (0, _react.useCallback)(function (_ref4) {
    var ids = _ref4.ids,
        value = _ref4.value;
    setExpanded({
      ids: ids,
      value: value
    });

    if (ids.length === 1) {
      var _containerRef$current2;

      var element = (_containerRef$current2 = containerRef.current) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.querySelector("[data-item-id=\"".concat(ids[0], "\"][data-ref-id=\"").concat(refId, "\"]"));
      if (element) highlightElement(element);
    }
  }, [containerRef, highlightElement, refId]); // Expand the whole ancestry of the currently selected story whenever it changes.

  (0, _react.useEffect)(function () {
    setExpanded({
      ids: (0, _utils.getAncestorIds)(data, selectedStoryId),
      value: true
    });
  }, [data, selectedStoryId]);
  var collapseAll = (0, _react.useCallback)(function () {
    var ids = Object.keys(data).filter(function (id) {
      return !rootIds.includes(id);
    });
    setExpanded({
      ids: ids,
      value: false
    });
  }, [data, rootIds]);
  var expandAll = (0, _react.useCallback)(function () {
    setExpanded({
      ids: Object.keys(data),
      value: true
    });
  }, [data]);
  (0, _react.useEffect)(function () {
    if (!api) return noop;
    api.on(_coreEvents.STORIES_COLLAPSE_ALL, collapseAll);
    api.on(_coreEvents.STORIES_EXPAND_ALL, expandAll);
    return function () {
      api.off(_coreEvents.STORIES_COLLAPSE_ALL, collapseAll);
      api.off(_coreEvents.STORIES_EXPAND_ALL, expandAll);
    };
  }, [api, collapseAll, expandAll]); // Expand, collapse or select nodes in the tree using keyboard shortcuts.

  (0, _react.useEffect)(function () {
    var menuElement = document.getElementById('storybook-explorer-menu'); // Even though we ignore repeated events, use throttle because IE doesn't support event.repeat.

    var navigateTree = (0, _throttle.default)(function (event) {
      var _highlightedRef$curre3, _highlightedRef$curre4;

      var highlightedItemId = ((_highlightedRef$curre3 = highlightedRef.current) === null || _highlightedRef$curre3 === void 0 ? void 0 : _highlightedRef$curre3.refId) === refId && ((_highlightedRef$curre4 = highlightedRef.current) === null || _highlightedRef$curre4 === void 0 ? void 0 : _highlightedRef$curre4.itemId);
      if (!isBrowsing || !containerRef.current || !highlightedItemId || event.repeat) return;
      if (!(0, _keybinding.matchesModifiers)(false, event)) return;
      var isEnter = (0, _keybinding.matchesKeyCode)('Enter', event);
      var isSpace = (0, _keybinding.matchesKeyCode)('Space', event);
      var isArrowLeft = (0, _keybinding.matchesKeyCode)('ArrowLeft', event);
      var isArrowRight = (0, _keybinding.matchesKeyCode)('ArrowRight', event);
      if (!(isEnter || isSpace || isArrowLeft || isArrowRight)) return;
      var highlightedElement = getElementByDataItemId(highlightedItemId);
      if (!highlightedElement || highlightedElement.getAttribute('data-ref-id') !== refId) return;
      var target = event.target;
      if (!(0, _utils.isAncestor)(menuElement, target) && !(0, _utils.isAncestor)(target, menuElement)) return;

      if (target.hasAttribute('data-action')) {
        if (isEnter || isSpace) return;
        target.blur();
      }

      var type = highlightedElement.getAttribute('data-nodetype');

      if ((isEnter || isSpace) && ['component', 'story', 'document'].includes(type)) {
        onSelectStoryId(highlightedItemId);
      }

      var isExpanded = highlightedElement.getAttribute('aria-expanded');

      if (isArrowLeft) {
        if (isExpanded === 'true') {
          // The highlighted node is expanded, so we collapse it.
          setExpanded({
            ids: [highlightedItemId],
            value: false
          });
          return;
        }

        var parentId = highlightedElement.getAttribute('data-parent-id');
        var parentElement = parentId && getElementByDataItemId(parentId);

        if (parentElement && parentElement.getAttribute('data-highlightable') === 'true') {
          // The highlighted node isn't expanded, so we move the highlight to its parent instead.
          highlightElement(parentElement);
          return;
        } // The parent can't be highlighted, which means it must be a root.
        // The highlighted node is already collapsed, so we collapse its descendants.


        setExpanded({
          ids: (0, _utils.getDescendantIds)(data, highlightedItemId, true),
          value: false
        });
        return;
      }

      if (isArrowRight) {
        if (isExpanded === 'false') {
          updateExpanded({
            ids: [highlightedItemId],
            value: true
          });
        } else if (isExpanded === 'true') {
          updateExpanded({
            ids: (0, _utils.getDescendantIds)(data, highlightedItemId, true),
            value: true
          });
        }
      }
    }, 60);
    document.addEventListener('keydown', navigateTree);
    return function () {
      return document.removeEventListener('keydown', navigateTree);
    };
  }, [containerRef, isBrowsing, refId, data, highlightedRef, setHighlightedItemId, onSelectStoryId]);
  return [expanded, updateExpanded];
};

exports.useExpanded = useExpanded;