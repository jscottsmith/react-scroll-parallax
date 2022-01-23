function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.array.find-index.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.function.name.js";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import store from 'store2';
var save = debounce(function (value) {
  return store.set('lastViewedStoryIds', value);
}, 1000);
export var useLastViewed = function useLastViewed(selection) {
  var initialLastViewedStoryIds = useMemo(function () {
    var items = store.get('lastViewedStoryIds');
    if (!items || !Array.isArray(items)) return [];
    if (!items.some(function (item) {
      return _typeof(item) === 'object' && item.storyId && item.refId;
    })) return [];
    return items;
  }, [store]);
  var lastViewedRef = useRef(initialLastViewedStoryIds);
  var updateLastViewed = useCallback(function (story) {
    var items = lastViewedRef.current;
    var index = items.findIndex(function (_ref) {
      var storyId = _ref.storyId,
          refId = _ref.refId;
      return storyId === story.storyId && refId === story.refId;
    });
    if (index === 0) return;

    if (index === -1) {
      lastViewedRef.current = [story].concat(_toConsumableArray(items));
    } else {
      lastViewedRef.current = [story].concat(_toConsumableArray(items.slice(0, index)), _toConsumableArray(items.slice(index + 1)));
    }

    save(lastViewedRef.current);
  }, [lastViewedRef]);
  useEffect(function () {
    if (selection) updateLastViewed(selection);
  }, [selection]);
  return {
    getLastViewed: useCallback(function () {
      return lastViewedRef.current;
    }, [lastViewedRef]),
    clearLastViewed: useCallback(function () {
      lastViewedRef.current = lastViewedRef.current.slice(0, 1);
      save(lastViewedRef.current);
    }, [lastViewedRef])
  };
};