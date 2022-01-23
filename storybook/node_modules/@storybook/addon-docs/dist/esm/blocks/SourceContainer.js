function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.object.assign.js";
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { createContext, useEffect, useState } from 'react';
import deepEqual from 'fast-deep-equal';
import { addons } from '@storybook/addons';
import { SNIPPET_RENDERED } from '../shared';
export var SourceContext = /*#__PURE__*/createContext({
  sources: {}
});
export var SourceContainer = function SourceContainer(_ref) {
  var children = _ref.children;

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      sources = _useState2[0],
      setSources = _useState2[1];

  var channel = addons.getChannel();
  useEffect(function () {
    var handleSnippetRendered = function handleSnippetRendered(id, newItem) {
      if (newItem !== sources[id]) {
        setSources(function (current) {
          var newSources = Object.assign({}, current, _defineProperty({}, id, newItem));

          if (!deepEqual(current, newSources)) {
            return newSources;
          }

          return current;
        });
      }
    };

    channel.on(SNIPPET_RENDERED, handleSnippetRendered);
    return function () {
      return channel.off(SNIPPET_RENDERED, handleSnippetRendered);
    };
  });
  return /*#__PURE__*/React.createElement(SourceContext.Provider, {
    value: {
      sources: sources
    }
  }, children);
};