function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.string.pad-start.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { logger } from '@storybook/client-logger';
import { Tabs, TabsState, TabWrapper } from './tabs';
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
      return active ? /*#__PURE__*/React.createElement("div", {
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
      return /*#__PURE__*/React.createElement("div", {
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
      return active ? /*#__PURE__*/React.createElement("div", {
        id: "test3",
        key: key
      }, colours.map(function (colour, i) {
        return /*#__PURE__*/React.createElement("div", {
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
      return active ? /*#__PURE__*/React.createElement("div", {
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
      return active ? /*#__PURE__*/React.createElement("div", {
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
      return /*#__PURE__*/React.createElement(TabWrapper, {
        key: key,
        active: active,
        render: function render() {
          return /*#__PURE__*/React.createElement("div", null, "CONTENT 6");
        }
      });
    }
  }
};
var onSelect = action('onSelect');
var content = Object.entries(panels).map(function (_ref7) {
  var _ref8 = _slicedToArray(_ref7, 2),
      k = _ref8[0],
      v = _ref8[1];

  return /*#__PURE__*/React.createElement("div", {
    key: k,
    id: k,
    title: v.title
  }, v.render);
});
storiesOf('Basics/Tabs', module).addDecorator(function (s) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 'calc(100vh - 20px)',
      width: 'calc(100vw - 20px)',
      margin: 10
    }
  }, s());
}).add('stateful - static', function () {
  return /*#__PURE__*/React.createElement(TabsState, {
    initial: "test2"
  }, /*#__PURE__*/React.createElement("div", {
    id: "test1",
    title: "With a function"
  }, function (_ref9) {
    var active = _ref9.active,
        selected = _ref9.selected;
    return active ? /*#__PURE__*/React.createElement("div", null, selected, " is selected") : null;
  }), /*#__PURE__*/React.createElement("div", {
    id: "test2",
    title: "With markup"
  }, /*#__PURE__*/React.createElement("div", null, "test2 is always active (but visually hidden)")));
}).add('stateful - static with set button text colors', function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TabsState, {
    initial: "test2"
  }, /*#__PURE__*/React.createElement("div", {
    id: "test1",
    title: "With a function",
    color: "#e00000"
  }, function (_ref10) {
    var active = _ref10.active,
        selected = _ref10.selected;
    return active ? /*#__PURE__*/React.createElement("div", null, selected, " is selected") : null;
  }), /*#__PURE__*/React.createElement("div", {
    id: "test2",
    title: "With markup",
    color: "green"
  }, /*#__PURE__*/React.createElement("div", null, "test2 is always active (but visually hidden)"))));
}).add('stateful - static with set backgroundColor', function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TabsState, {
    initial: "test2",
    backgroundColor: "rgba(0,0,0,.05)"
  }, /*#__PURE__*/React.createElement("div", {
    id: "test1",
    title: "With a function",
    color: "#e00000"
  }, function (_ref11) {
    var active = _ref11.active,
        selected = _ref11.selected;
    return active ? /*#__PURE__*/React.createElement("div", null, selected, " is selected") : null;
  }), /*#__PURE__*/React.createElement("div", {
    id: "test2",
    title: "With markup",
    color: "green"
  }, /*#__PURE__*/React.createElement("div", null, "test2 is always active (but visually hidden)"))));
}).add('stateful - dynamic', function () {
  return /*#__PURE__*/React.createElement(TabsState, {
    initial: "test3"
  }, Object.entries(panels).map(function (_ref12) {
    var _ref13 = _slicedToArray(_ref12, 2),
        k = _ref13[0],
        v = _ref13[1];

    return /*#__PURE__*/React.createElement("div", {
      key: k,
      id: k,
      title: v.title
    }, v.render);
  }));
}).add('stateful - no initial', function () {
  return /*#__PURE__*/React.createElement(TabsState, null, content);
}).add('stateless - bordered', function () {
  return /*#__PURE__*/React.createElement(Tabs, {
    bordered: true,
    absolute: false,
    selected: "test3",
    actions: {
      onSelect: onSelect
    }
  }, content);
}).add('stateless - with tools', function () {
  return /*#__PURE__*/React.createElement(Tabs, {
    selected: "test3",
    actions: {
      onSelect: onSelect
    },
    tools: /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return logger.log('1');
      }
    }, "1"), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return logger.log('2');
      }
    }, "2"))
  }, content);
}).add('stateless - absolute', function () {
  return /*#__PURE__*/React.createElement(Tabs, {
    absolute: true,
    selected: "test3",
    actions: {
      onSelect: onSelect
    }
  }, content);
}).add('stateless - absolute bordered', function () {
  return /*#__PURE__*/React.createElement(Tabs, {
    absolute: true,
    bordered: true,
    selected: "test3",
    actions: {
      onSelect: onSelect
    }
  }, content);
}).add('stateless - empty', function () {
  return /*#__PURE__*/React.createElement(Tabs, {
    actions: {
      onSelect: onSelect
    },
    bordered: true,
    absolute: true
  });
});