"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.entries.js");

var _react = _interopRequireWildcard(require("react"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _react2 = require("@storybook/react");

var _components = require("@storybook/components");

var _store = require("@storybook/store");

var _extractArgTypes = require("./extractArgTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var argsTableProps = function argsTableProps(component) {
  var argTypes = (0, _extractArgTypes.extractArgTypes)(component);
  var parameters = {
    __isArgsStory: true
  };
  var rows = (0, _store.inferControls)({
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

  var initialArgs = (0, _mapValues.default)(rows, function (argType) {
    return argType.defaultValue;
  });

  var _useState = (0, _react.useState)(initialArgs),
      _useState2 = _slicedToArray(_useState, 2),
      args = _useState2[0],
      setArgs = _useState2[1];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("b", null, "NOTE:"), " these stories are to help visualise the snapshot tests in", ' ', /*#__PURE__*/_react.default.createElement("code", null, "./react-properties.test.js"), "."), /*#__PURE__*/_react.default.createElement(_components.ArgsTable, {
    rows: rows,
    args: args,
    updateArgs: function updateArgs(val) {
      return setArgs(Object.assign({}, args, val));
    }
  }), /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "arg name"), /*#__PURE__*/_react.default.createElement("th", null, "argType"))), /*#__PURE__*/_react.default.createElement("tbody", null, Object.entries(args).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        val = _ref3[1];

    return /*#__PURE__*/_react.default.createElement("tr", {
      key: key
    }, /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("code", null, key)), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("pre", null, JSON.stringify(rows[key]))));
  }))));
};

var typescriptFixtures = ['aliases', 'arrays', 'enums', 'functions', 'interfaces', 'intersections', 'records', 'scalars', 'tuples', 'unions', 'optionals'];
var typescriptStories = (0, _react2.storiesOf)('ArgTypes/TypeScript', module);
typescriptFixtures.forEach(function (fixture) {
  // eslint-disable-next-line import/no-dynamic-require, global-require, no-shadow
  var _require = require("../../lib/convert/__testfixtures__/typescript/".concat(fixture)),
      Component = _require.Component;

  typescriptStories.add(fixture, function () {
    return /*#__PURE__*/_react.default.createElement(ArgsStory, {
      component: Component
    });
  });
});
var proptypesFixtures = ['arrays', 'enums', 'misc', 'objects', 'react', 'scalars'];
var proptypesStories = (0, _react2.storiesOf)('ArgTypes/PropTypes', module);
proptypesFixtures.forEach(function (fixture) {
  // eslint-disable-next-line import/no-dynamic-require, global-require, no-shadow
  var _require2 = require("../../lib/convert/__testfixtures__/proptypes/".concat(fixture)),
      Component = _require2.Component;

  proptypesStories.add(fixture, function () {
    return /*#__PURE__*/_react.default.createElement(ArgsStory, {
      component: Component
    });
  });
});
var issuesFixtures = ['js-class-component', 'js-function-component', 'js-function-component-inline-defaults', 'js-function-component-inline-defaults-no-propTypes', 'ts-function-component', 'ts-function-component-inline-defaults', '9399-js-proptypes-shape', '8663-js-styled-components', '9626-js-default-values', '9668-js-proptypes-no-jsdoc', '8143-ts-react-fc-generics', '8143-ts-imported-types', '8279-js-styled-docgen', '8140-js-prop-types-oneof', '9023-js-hoc', '8740-ts-multi-props', '9556-ts-react-default-exports', '9592-ts-styled-props', '9591-ts-import-types', '9721-ts-deprecated-jsdoc', '9827-ts-default-values', '9586-js-react-memo', '9575-ts-camel-case', '9493-ts-display-name', '8894-9511-ts-forward-ref', '9465-ts-type-props', '8428-js-static-prop-types', '9764-ts-extend-props', '9922-ts-component-props'];
var issuesStories = (0, _react2.storiesOf)('ArgTypes/Issues', module);
issuesFixtures.forEach(function (fixture) {
  // eslint-disable-next-line import/no-dynamic-require, global-require
  var _require3 = require("./__testfixtures__/".concat(fixture, "/input")),
      component = _require3.component;

  issuesStories.add(fixture, function () {
    return /*#__PURE__*/_react.default.createElement(ArgsStory, {
      component: component
    });
  }, {
    chromatic: {
      disable: true
    }
  });
});