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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPath = getPath;
exports.cycle = cycle;
exports.isAncestor = exports.getStateType = exports.scrollIntoView = exports.searchItem = exports.getDescendantIds = exports.getAncestorIds = exports.getParents = exports.getParent = exports.get = exports.prevent = exports.getLink = exports.createId = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.assign.js");

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _global = _interopRequireDefault(require("global"));

var _api = require("@storybook/api");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var document = _global.default.document,
    globalWindow = _global.default.window,
    DOCS_MODE = _global.default.DOCS_MODE;

var createId = function createId(itemId, refId) {
  return !refId || refId === _data.DEFAULT_REF_ID ? itemId : "".concat(refId, "_").concat(itemId);
};

exports.createId = createId;

var getLink = function getLink(itemId, refId) {
  var type = DOCS_MODE ? 'docs' : 'story';
  return "".concat(document.location.pathname, "?path=/").concat(type, "/").concat(createId(itemId, refId));
};

exports.getLink = getLink;

var prevent = function prevent(e) {
  e.preventDefault();
  return false;
};

exports.prevent = prevent;
var get = (0, _memoizerific.default)(1000)(function (id, dataset) {
  return dataset[id];
});
exports.get = get;
var getParent = (0, _memoizerific.default)(1000)(function (id, dataset) {
  var item = get(id, dataset);
  return item && !(0, _api.isRoot)(item) ? get(item.parent, dataset) : undefined;
});
exports.getParent = getParent;
var getParents = (0, _memoizerific.default)(1000)(function (id, dataset) {
  var parent = getParent(id, dataset);
  return parent ? [parent].concat(_toConsumableArray(getParents(parent.id, dataset))) : [];
});
exports.getParents = getParents;
var getAncestorIds = (0, _memoizerific.default)(1000)(function (data, id) {
  return getParents(id, data).map(function (item) {
    return item.id;
  });
});
exports.getAncestorIds = getAncestorIds;
var getDescendantIds = (0, _memoizerific.default)(1000)(function (data, id, skipLeafs) {
  var _ref = data[id] || {},
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? [] : _ref$children;

  return children.reduce(function (acc, childId) {
    if (!data[childId] || skipLeafs && data[childId].isLeaf) return acc;
    acc.push.apply(acc, [childId].concat(_toConsumableArray(getDescendantIds(data, childId, skipLeafs))));
    return acc;
  }, []);
});
exports.getDescendantIds = getDescendantIds;

function getPath(item, ref) {
  var parent = !(0, _api.isRoot)(item) && item.parent ? ref.stories[item.parent] : null;
  if (parent) return [].concat(_toConsumableArray(getPath(parent, ref)), [parent.name]);
  return ref.id === _data.DEFAULT_REF_ID ? [] : [ref.title || ref.id];
}

var searchItem = function searchItem(item, ref) {
  return Object.assign({}, item, {
    refId: ref.id,
    path: getPath(item, ref)
  });
};

exports.searchItem = searchItem;

function cycle(array, index, delta) {
  var next = index + delta % array.length;
  if (next < 0) next = array.length + next;
  if (next >= array.length) next -= array.length;
  return next;
}

var scrollIntoView = function scrollIntoView(element) {
  var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!element) return;

  var _element$getBoundingC = element.getBoundingClientRect(),
      top = _element$getBoundingC.top,
      bottom = _element$getBoundingC.bottom;

  var isInView = top >= 0 && bottom <= (globalWindow.innerHeight || document.documentElement.clientHeight);
  if (!isInView) element.scrollIntoView({
    block: center ? 'center' : 'nearest'
  });
};

exports.scrollIntoView = scrollIntoView;

var getStateType = function getStateType(isLoading, isAuthRequired, isError, isEmpty) {
  switch (true) {
    case isAuthRequired:
      return 'auth';

    case isError:
      return 'error';

    case isLoading:
      return 'loading';

    case isEmpty:
      return 'empty';

    default:
      return 'ready';
  }
};

exports.getStateType = getStateType;

var isAncestor = function isAncestor(element, maybeAncestor) {
  if (!element || !maybeAncestor) return false;
  if (element === maybeAncestor) return true;
  return isAncestor(element.parentElement, maybeAncestor);
};

exports.isAncestor = isAncestor;