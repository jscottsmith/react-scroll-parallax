import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.entries.js";
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

import React, { useState } from 'react';
import mapValues from 'lodash/mapValues';
import { storiesOf } from '@storybook/react';
import { ArgsTable } from '@storybook/components';
import { inferControls } from '@storybook/store';
import { extractArgTypes } from './extractArgTypes';

var argsTableProps = function argsTableProps(component) {
  var argTypes = extractArgTypes(component);
  var parameters = {
    __isArgsStory: true
  };
  var rows = inferControls({
    argTypes: argTypes,
    parameters: parameters
  });
  return {
    rows: rows
  };
};

var ArgsStory = function ArgsStory(_ref) {
  var component = _ref.component;

  var _argsTableProps = argsTableProps(component),
      rows = _argsTableProps.rows;

  var initialArgs = mapValues(rows, function (argType) {
    return argType.defaultValue;
  });

  var _useState = useState(initialArgs),
      _useState2 = _slicedToArray(_useState, 2),
      args = _useState2[0],
      setArgs = _useState2[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "NOTE:"), " these stories are to help visualise the snapshot tests in", ' ', /*#__PURE__*/React.createElement("code", null, "./react-properties.test.js"), "."), /*#__PURE__*/React.createElement(ArgsTable, {
    rows: rows,
    args: args,
    updateArgs: function updateArgs(val) {
      return setArgs(Object.assign({}, args, val));
    }
  }), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "arg name"), /*#__PURE__*/React.createElement("th", null, "argType"))), /*#__PURE__*/React.createElement("tbody", null, Object.entries(args).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        val = _ref3[1];

    return /*#__PURE__*/React.createElement("tr", {
      key: key
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("code", null, key)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(rows[key]))));
  }))));
};

var typescriptFixtures = ['aliases', 'arrays', 'enums', 'functions', 'interfaces', 'intersections', 'records', 'scalars', 'tuples', 'unions', 'optionals'];
var typescriptStories = storiesOf('ArgTypes/TypeScript', module);
typescriptFixtures.forEach(function (fixture) {
  // eslint-disable-next-line import/no-dynamic-require, global-require, no-shadow
  var _require = require("../../lib/convert/__testfixtures__/typescript/".concat(fixture)),
      Component = _require.Component;

  typescriptStories.add(fixture, function () {
    return /*#__PURE__*/React.createElement(ArgsStory, {
      component: Component
    });
  });
});
var proptypesFixtures = ['arrays', 'enums', 'misc', 'objects', 'react', 'scalars'];
var proptypesStories = storiesOf('ArgTypes/PropTypes', module);
proptypesFixtures.forEach(function (fixture) {
  // eslint-disable-next-line import/no-dynamic-require, global-require, no-shadow
  var _require2 = require("../../lib/convert/__testfixtures__/proptypes/".concat(fixture)),
      Component = _require2.Component;

  proptypesStories.add(fixture, function () {
    return /*#__PURE__*/React.createElement(ArgsStory, {
      component: Component
    });
  });
});
var issuesFixtures = ['js-class-component', 'js-function-component', 'js-function-component-inline-defaults', 'js-function-component-inline-defaults-no-propTypes', 'ts-function-component', 'ts-function-component-inline-defaults', '9399-js-proptypes-shape', '8663-js-styled-components', '9626-js-default-values', '9668-js-proptypes-no-jsdoc', '8143-ts-react-fc-generics', '8143-ts-imported-types', '8279-js-styled-docgen', '8140-js-prop-types-oneof', '9023-js-hoc', '8740-ts-multi-props', '9556-ts-react-default-exports', '9592-ts-styled-props', '9591-ts-import-types', '9721-ts-deprecated-jsdoc', '9827-ts-default-values', '9586-js-react-memo', '9575-ts-camel-case', '9493-ts-display-name', '8894-9511-ts-forward-ref', '9465-ts-type-props', '8428-js-static-prop-types', '9764-ts-extend-props', '9922-ts-component-props'];
var issuesStories = storiesOf('ArgTypes/Issues', module);
issuesFixtures.forEach(function (fixture) {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  var _require3 = require("./__testfixtures__/".concat(fixture, "/input")),
      component = _require3.component;

  issuesStories.add(fixture, function () {
    return /*#__PURE__*/React.createElement(ArgsStory, {
      component: component
    });
  }, {
    chromatic: {
      disable: true
    }
  });
});