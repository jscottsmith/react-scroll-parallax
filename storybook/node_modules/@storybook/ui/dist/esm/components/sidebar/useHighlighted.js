import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.find-index.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import global from 'global';
import { useCallback, useEffect, useRef, useState } from 'react';
import { matchesKeyCode, matchesModifiers } from '../../keybinding';
import { cycle, isAncestor, scrollIntoView } from './utils';
var document = global.document,
    globalWindow = global.window;

var fromSelection = function fromSelection(selection) {
  return selection ? {
    itemId: selection.storyId,
    refId: selection.refId
  } : null;
};

export var useHighlighted = function useHighlighted(_ref) {
  var containerRef = _ref.containerRef,
      isLoading = _ref.isLoading,
      isBrowsing = _ref.isBrowsing,
      dataset = _ref.dataset,
      selected = _ref.selected;
  var initialHighlight = fromSelection(selected);
  var highlightedRef = useRef(initialHighlight);

  var _useState = useState(initialHighlight),
      _useState2 = _slicedToArray(_useState, 2),
      highlighted = _useState2[0],
      setHighlighted = _useState2[1];

  var updateHighlighted = useCallback(function (highlight) {
    highlightedRef.current = highlight;
    setHighlighted(highlight);
  }, [highlightedRef]); // Sets the highlighted node and scrolls it into view, using DOM elements as reference

  var highlightElement = useCallback(function (element) {
    var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var itemId = element.getAttribute('data-item-id');
    var refId = element.getAttribute('data-ref-id');
    if (!itemId || !refId) return;
    updateHighlighted({
      itemId: itemId,
      refId: refId
    });
    scrollIntoView(element, center);
  }, [updateHighlighted]); // Highlight and scroll to the selected story whenever the selection or dataset changes

  useEffect(function () {
    var highlight = fromSelection(selected);
    updateHighlighted(highlight);

    if (highlight) {
      var itemId = highlight.itemId,
          refId = highlight.refId;
      setTimeout(function () {
        var _containerRef$current;

        scrollIntoView((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelector("[data-item-id=\"".concat(itemId, "\"][data-ref-id=\"").concat(refId, "\"]")), true // make sure it's clearly visible by centering it
        );
      }, 0);
    }
  }, [dataset, highlightedRef, containerRef, selected]); // Highlight nodes up/down the tree using arrow keys

  useEffect(function () {
    var menuElement = document.getElementById('storybook-explorer-menu');
    var lastRequestId;

    var navigateTree = function navigateTree(event) {
      if (isLoading || !isBrowsing || !containerRef.current) return; // allow event.repeat

      if (!matchesModifiers(false, event)) return;
      var isArrowUp = matchesKeyCode('ArrowUp', event);
      var isArrowDown = matchesKeyCode('ArrowDown', event);
      if (!(isArrowUp || isArrowDown)) return;
      event.preventDefault();
      var requestId = globalWindow.requestAnimationFrame(function () {
        globalWindow.cancelAnimationFrame(lastRequestId);
        lastRequestId = requestId;
        var target = event.target;
        if (!isAncestor(menuElement, target) && !isAncestor(target, menuElement)) return;
        if (target.hasAttribute('data-action')) target.blur();
        var highlightable = Array.from(containerRef.current.querySelectorAll('[data-highlightable=true]'));
        var currentIndex = highlightable.findIndex(function (el) {
          var _highlightedRef$curre, _highlightedRef$curre2;

          return el.getAttribute('data-item-id') === ((_highlightedRef$curre = highlightedRef.current) === null || _highlightedRef$curre === void 0 ? void 0 : _highlightedRef$curre.itemId) && el.getAttribute('data-ref-id') === ((_highlightedRef$curre2 = highlightedRef.current) === null || _highlightedRef$curre2 === void 0 ? void 0 : _highlightedRef$curre2.refId);
        });
        var nextIndex = cycle(highlightable, currentIndex, isArrowUp ? -1 : 1);
        var didRunAround = isArrowUp ? nextIndex === highlightable.length - 1 : nextIndex === 0;
        highlightElement(highlightable[nextIndex], didRunAround);
      });
    };

    document.addEventListener('keydown', navigateTree);
    return function () {
      return document.removeEventListener('keydown', navigateTree);
    };
  }, [isLoading, isBrowsing, highlightedRef, highlightElement]);
  return [highlighted, updateHighlighted, highlightedRef];
};