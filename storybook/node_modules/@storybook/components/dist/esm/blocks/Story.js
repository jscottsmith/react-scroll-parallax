function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import React, { createElement, Fragment } from 'react';
import { IFrame } from './IFrame';
import { EmptyBlock } from './EmptyBlock';
import { ZoomContext } from './ZoomContext';
import { Loader } from '..';
var BASE_URL = 'iframe.html';
export var StoryError;
/** error message for Story with null storyFn
 * if the story id exists, it must be pointing to a non-existing story
 *  if there is assigned story id, the story must be empty
 */

(function (StoryError) {
  StoryError["NO_STORY"] = "No component or story to display";
})(StoryError || (StoryError = {}));

var MISSING_STORY = function MISSING_STORY(id) {
  return id ? "Story \"".concat(id, "\" doesn't exist.") : StoryError.NO_STORY;
};

var InlineStory = function InlineStory(_ref) {
  var storyFn = _ref.storyFn,
      height = _ref.height,
      id = _ref.id;
  return /*#__PURE__*/React.createElement(Fragment, null, height ? /*#__PURE__*/React.createElement("style", null, "#story--".concat(id, " { min-height: ").concat(height, "; transform: translateZ(0); overflow: auto }")) : null, /*#__PURE__*/React.createElement(Fragment, null, storyFn ? /*#__PURE__*/createElement(storyFn) : /*#__PURE__*/React.createElement(EmptyBlock, null, MISSING_STORY(id))));
};

InlineStory.displayName = "InlineStory";

var IFrameStory = function IFrameStory(_ref2) {
  var id = _ref2.id,
      title = _ref2.title,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? '500px' : _ref2$height;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: height
    }
  }, /*#__PURE__*/React.createElement(ZoomContext.Consumer, null, function (_ref3) {
    var scale = _ref3.scale;
    return /*#__PURE__*/React.createElement(IFrame, {
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
    return /*#__PURE__*/React.createElement(EmptyBlock, null, error);
  }

  return inline ? /*#__PURE__*/React.createElement(InlineStory, props) : /*#__PURE__*/React.createElement(IFrameStory, {
    id: id,
    title: title,
    height: height
  });
};

var StorySkeleton = function StorySkeleton() {
  return /*#__PURE__*/React.createElement(Loader, null);
};

StorySkeleton.displayName = "StorySkeleton";
export { Story, StorySkeleton };