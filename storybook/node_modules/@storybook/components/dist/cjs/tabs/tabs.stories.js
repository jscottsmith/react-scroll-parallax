"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.string.pad-start.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.entries.js");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _clientLogger = require("@storybook/client-logger");

var _tabs = require("./tabs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var colours = Array.from(new Array(15), function (val, index) {
  return index;
}).map(function (i) {
  return Math.floor(1 / 15 * i * 16777215).toString(16).padStart(6, '0');
});

function fibonacci(num, memo) {
  /* eslint-disable no-param-reassign */
  if (!memo) {
    memo = {};
  }

  if (memo[num]) {
    return memo[num];
  }

  if (num <= 1) {
    return 1;
  }

  memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
  return memo[num];
  /* eslint-enable no-param-reassign */
}

var panels = {
  test1: {
    title: 'Tab title #1',
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return active ? /*#__PURE__*/_react.default.createElement("div", {
        id: "test1",
        key: key
      }, "CONTENT 1") : null;
    }
  },
  test2: {
    title: 'Tab title #2',
    render: function render(_ref2) {
      var active = _ref2.active,
          key = _ref2.key;
      return /*#__PURE__*/_react.default.createElement("div", {
        key: key,
        id: "test2",
        style: {
          background: 'hotpink',
          minHeight: '100%',
          display: active ? 'block' : 'none'
        }
      }, "CONTENT 2");
    }
  },
  test3: {
    title: 'Tab with scroll!',
    render: function render(_ref3) {
      var active = _ref3.active,
          key = _ref3.key;
      return active ? /*#__PURE__*/_react.default.createElement("div", {
        id: "test3",
        key: key
      }, colours.map(function (colour, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: colour,
          style: {
            background: "#".concat(colour),
            height: 30 + fibonacci(i + 5) / 10
          }
        });
      })) : null;
    }
  },
  test4: {
    title: 'Tab title #4',
    render: function render(_ref4) {
      var active = _ref4.active,
          key = _ref4.key;
      return active ? /*#__PURE__*/_react.default.createElement("div", {
        key: key,
        id: "test4"
      }, "CONTENT 4") : null;
    }
  },
  test5: {
    title: 'Tab title #5',
    render: function render(_ref5) {
      var active = _ref5.active,
          key = _ref5.key;
      return active ? /*#__PURE__*/_react.default.createElement("div", {
        key: key,
        id: "test5"
      }, "CONTENT 5") : null;
    }
  },
  test6: {
    title: 'Tab title #6',
    render: function render(_ref6) {
      var active = _ref6.active,
          key = _ref6.key;
      return /*#__PURE__*/_react.default.createElement(_tabs.TabWrapper, {
        key: key,
        active: active,
        render: function render() {
          return /*#__PURE__*/_react.default.createElement("div", null, "CONTENT 6");
        }
      });
    }
  }
};
var onSelect = (0, _addonActions.action)('onSelect');
var content = Object.entries(panels).map(function (_ref7) {
  var _ref8 = _slicedToArray(_ref7, 2),
      k = _ref8[0],
      v = _ref8[1];

  return /*#__PURE__*/_react.default.createElement("div", {
    key: k,
    id: k,
    title: v.title
  }, v.render);
});
(0, _react2.storiesOf)('Basics/Tabs', module).addDecorator(function (s) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'relative',
      height: 'calc(100vh - 20px)',
      width: 'calc(100vw - 20px)',
      margin: 10
    }
  }, s());
}).add('stateful - static', function () {
  return /*#__PURE__*/_react.default.createElement(_tabs.TabsState, {
    initial: "test2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "test1",
    title: "With a function"
  }, function (_ref9) {
    var active = _ref9.active,
        selected = _ref9.selected;
    return active ? /*#__PURE__*/_react.default.createElement("div", null, selected, " is selected") : null;
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "test2",
    title: "With markup"
  }, /*#__PURE__*/_react.default.createElement("div", null, "test2 is always active (but visually hidden)")));
}).add('stateful - static with set button text colors', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_tabs.TabsState, {
    initial: "test2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "test1",
    title: "With a function",
    color: "#e00000"
  }, function (_ref10) {
    var active = _ref10.active,
        selected = _ref10.selected;
    return active ? /*#__PURE__*/_react.default.createElement("div", null, selected, " is selected") : null;
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "test2",
    title: "With markup",
    color: "green"
  }, /*#__PURE__*/_react.default.createElement("div", null, "test2 is always active (but visually hidden)"))));
}).add('stateful - static with set backgroundColor', function () {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_tabs.TabsState, {
    initial: "test2",
    backgroundColor: "rgba(0,0,0,.05)"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "test1",
    title: "With a function",
    color: "#e00000"
  }, function (_ref11) {
    var active = _ref11.active,
        selected = _ref11.selected;
    return active ? /*#__PURE__*/_react.default.createElement("div", null, selected, " is selected") : null;
  }), /*#__PURE__*/_react.default.createElement("div", {
    id: "test2",
    title: "With markup",
    color: "green"
  }, /*#__PURE__*/_react.default.createElement("div", null, "test2 is always active (but visually hidden)"))));
}).add('stateful - dynamic', function () {
  return /*#__PURE__*/_react.default.createElement(_tabs.TabsState, {
    initial: "test3"
  }, Object.entries(panels).map(function (_ref12) {
    var _ref13 = _slicedToArray(_ref12, 2),
        k = _ref13[0],
        v = _ref13[1];

    return /*#__PURE__*/_react.default.createElement("div", {
      key: k,
      id: k,
      title: v.title
    }, v.render);
  }));
}).add('stateful - no initial', function () {
  return /*#__PURE__*/_react.default.createElement(_tabs.TabsState, null, content);
}).add('stateless - bordered', function () {
  return /*#__PURE__*/_react.default.createElement(_tabs.Tabs, {
    bordered: true,
    absolute: false,
    selected: "test3",
    actions: {
      onSelect: onSelect
    }
  }, content);
}).add('stateless - with tools', function () {
  return /*#__PURE__*/_react.default.createElement(_tabs.Tabs, {
    selected: "test3",
    actions: {
      onSelect: onSelect
    },
    tools: /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return _clientLogger.logger.log('1');
      }
    }, "1"), /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return _clientLogger.logger.log('2');
      }
    }, "2"))
  }, content);
}).add('stateless - absolute', function () {
  return /*#__PURE__*/_react.default.createElement(_tabs.Tabs, {
    absolute: true,
    selected: "test3",
    actions: {
      onSelect: onSelect
    }
  }, content);
}).add('stateless - absolute bordered', function () {
  return /*#__PURE__*/_react.default.createElement(_tabs.Tabs, {
    absolute: true,
    bordered: true,
    selected: "test3",
    actions: {
      onSelect: onSelect
    }
  }, content);
}).add('stateless - empty', function () {
  return /*#__PURE__*/_react.default.createElement(_tabs.Tabs, {
    actions: {
      onSelect: onSelect
    },
    bordered: true,
    absolute: true
  });
});