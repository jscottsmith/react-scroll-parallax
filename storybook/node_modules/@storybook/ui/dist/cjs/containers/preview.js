"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.concat.js");

var _global = _interopRequireDefault(require("global"));

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _preview = require("../components/preview/preview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PREVIEW_URL = _global.default.PREVIEW_URL;

var splitTitleAddExtraSpace = function splitTitleAddExtraSpace(input) {
  return input.split('/').join(' / ').replace(/\s\s/, ' ');
};

var getDescription = function getDescription(item) {
  if ((0, _api.isRoot)(item)) {
    return item.name ? "".concat(item.name, " \u22C5 Storybook") : 'Storybook';
  }

  if ((0, _api.isGroup)(item)) {
    return item.name ? "".concat(item.name, " \u22C5 Storybook") : 'Storybook';
  }

  if ((0, _api.isStory)(item)) {
    var kind = item.kind,
        name = item.name;
    return kind && name ? splitTitleAddExtraSpace("".concat(kind, " - ").concat(name, " \u22C5 Storybook")) : 'Storybook';
  }

  return 'Storybook';
};

var mapper = function mapper(_ref) {
  var api = _ref.api,
      state = _ref.state;
  var layout = state.layout,
      location = state.location,
      customQueryParams = state.customQueryParams,
      storyId = state.storyId,
      refs = state.refs,
      viewMode = state.viewMode,
      path = state.path,
      refId = state.refId;
  var story = api.getData(storyId, refId);
  var docsOnly = story && story.parameters ? !!story.parameters.docsOnly : false;
  return {
    api: api,
    story: story,
    options: layout,
    description: getDescription(story),
    viewMode: viewMode,
    path: path,
    refs: refs,
    storyId: storyId,
    baseUrl: PREVIEW_URL || 'iframe.html',
    queryParams: customQueryParams,
    docsOnly: docsOnly,
    location: location
  };
};

var PreviewConnected = /*#__PURE__*/_react.default.memo(function (props) {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, {
    filter: mapper
  }, function (fromState) {
    return /*#__PURE__*/_react.default.createElement(_preview.Preview, _extends({}, props, fromState));
  });
});

var _default = PreviewConnected;
exports.default = _default;