"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyTool = void 0;

require("core-js/modules/es.array.concat.js");

var _global = _interopRequireDefault(require("global"));

var _react = _interopRequireDefault(require("react"));

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _components = require("@storybook/components");

var _api = require("@storybook/api");

var _stringifyQueryParams = require("../utils/stringifyQueryParams");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREVIEW_URL = _global.default.PREVIEW_URL;

var copyMapper = function copyMapper(_ref) {
  var state = _ref.state;
  var storyId = state.storyId,
      refId = state.refId,
      refs = state.refs;
  var ref = refs[refId];
  return {
    refId: refId,
    baseUrl: ref ? "".concat(ref.url, "/iframe.html") : PREVIEW_URL || 'iframe.html',
    storyId: storyId,
    queryParams: state.customQueryParams
  };
};

var copyTool = {
  title: 'copy',
  id: 'copy',
  match: function match(_ref2) {
    var viewMode = _ref2.viewMode;
    return viewMode === 'story';
  },
  render: function render() {
    return /*#__PURE__*/_react.default.createElement(_api.Consumer, {
      filter: copyMapper
    }, function (_ref3) {
      var baseUrl = _ref3.baseUrl,
          storyId = _ref3.storyId,
          queryParams = _ref3.queryParams;
      return storyId ? /*#__PURE__*/_react.default.createElement(_components.IconButton, {
        key: "copy",
        onClick: function onClick() {
          return (0, _copyToClipboard.default)("".concat(baseUrl, "?id=").concat(storyId).concat((0, _stringifyQueryParams.stringifyQueryParams)(queryParams)));
        },
        title: "Copy canvas link"
      }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
        icon: "link"
      })) : null;
    });
  }
};
exports.copyTool = copyTool;