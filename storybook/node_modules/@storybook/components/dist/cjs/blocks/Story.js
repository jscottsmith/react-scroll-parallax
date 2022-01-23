"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorySkeleton = exports.Story = exports.StoryError = void 0;

require("core-js/modules/es.array.concat.js");

var _react = _interopRequireWildcard(require("react"));

var _IFrame = require("./IFrame");

var _EmptyBlock = require("./EmptyBlock");

var _ZoomContext = require("./ZoomContext");

var _ = require("..");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var BASE_URL = 'iframe.html';
var StoryError;
/** error message for Story with null storyFn
 * if the story id exists, it must be pointing to a non-existing story
 *  if there is assigned story id, the story must be empty
 */

exports.StoryError = StoryError;

(function (StoryError) {
  StoryError["NO_STORY"] = "No component or story to display";
})(StoryError || (exports.StoryError = StoryError = {}));

var MISSING_STORY = function MISSING_STORY(id) {
  return id ? "Story \"".concat(id, "\" doesn't exist.") : StoryError.NO_STORY;
};

var InlineStory = function InlineStory(_ref) {
  var storyFn = _ref.storyFn,
      height = _ref.height,
      id = _ref.id;
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, height ? /*#__PURE__*/_react.default.createElement("style", null, "#story--".concat(id, " { min-height: ").concat(height, "; transform: translateZ(0); overflow: auto }")) : null, /*#__PURE__*/_react.default.createElement(_react.Fragment, null, storyFn ? /*#__PURE__*/(0, _react.createElement)(storyFn) : /*#__PURE__*/_react.default.createElement(_EmptyBlock.EmptyBlock, null, MISSING_STORY(id))));
};

InlineStory.displayName = "InlineStory";

var IFrameStory = function IFrameStory(_ref2) {
  var id = _ref2.id,
      title = _ref2.title,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? '500px' : _ref2$height;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: height
    }
  }, /*#__PURE__*/_react.default.createElement(_ZoomContext.ZoomContext.Consumer, null, function (_ref3) {
    var scale = _ref3.scale;
    return /*#__PURE__*/_react.default.createElement(_IFrame.IFrame, {
      key: "iframe",
      id: "iframe--".concat(id),
      title: title,
      src: "".concat(BASE_URL, "?id=").concat(id, "&viewMode=story"),
      allowFullScreen: true,
      scale: scale,
      style: {
        width: '100%',
        height: '100%',
        border: '0 none'
      }
    });
  }));
};

IFrameStory.displayName = "IFrameStory";

/**
 * A story element, either rendered inline or in an iframe,
 * with configurable height.
 */
var Story = function Story(_ref4) {
  var children = _ref4.children,
      error = _ref4.error,
      inline = _ref4.inline,
      props = _objectWithoutProperties(_ref4, ["children", "error", "inline"]);

  var id = props.id,
      title = props.title,
      height = props.height;

  if (error) {
    return /*#__PURE__*/_react.default.createElement(_EmptyBlock.EmptyBlock, null, error);
  }

  return inline ? /*#__PURE__*/_react.default.createElement(InlineStory, props) : /*#__PURE__*/_react.default.createElement(IFrameStory, {
    id: id,
    title: title,
    height: height
  });
};

exports.Story = Story;

var StorySkeleton = function StorySkeleton() {
  return /*#__PURE__*/_react.default.createElement(_.Loader, null);
};

exports.StorySkeleton = StorySkeleton;
StorySkeleton.displayName = "StorySkeleton";