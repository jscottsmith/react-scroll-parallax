"use strict";

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.function.name.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLastViewed = void 0;

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _react = require("react");

var _store = _interopRequireDefault(require("store2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var save = (0, _debounce.default)(function (value) {
  return _store.default.set('lastViewedStoryIds', value);
}, 1000);

var useLastViewed = function useLastViewed(selection) {
  var initialLastViewedStoryIds = (0, _react.useMemo)(function () {
    var items = _store.default.get('lastViewedStoryIds');

    if (!items || !Array.isArray(items)) return [];
    if (!items.some(function (item) {
      return _typeof(item) === 'object' && item.storyId && item.refId;
    })) return [];
    return items;
  }, [_store.default]);
  var lastViewedRef = (0, _react.useRef)(initialLastViewedStoryIds);
  var updateLastViewed = (0, _react.useCallback)(function (story) {
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
  (0, _react.useEffect)(function () {
    if (selection) updateLastViewed(selection);
  }, [selection]);
  return {
    getLastViewed: (0, _react.useCallback)(function () {
      return lastViewedRef.current;
    }, [lastViewedRef]),
    clearLastViewed: (0, _react.useCallback)(function () {
      lastViewedRef.current = lastViewedRef.current.slice(0, 1);
      save(lastViewedRef.current);
    }, [lastViewedRef])
  };
};

exports.useLastViewed = useLastViewed;