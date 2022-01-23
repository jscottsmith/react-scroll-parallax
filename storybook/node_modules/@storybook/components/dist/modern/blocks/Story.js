function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { createElement, Fragment } from 'react';
import { IFrame } from './IFrame';
import { EmptyBlock } from './EmptyBlock';
import { ZoomContext } from './ZoomContext';
import { Loader } from '..';
const BASE_URL = 'iframe.html';
export let StoryError;
/** error message for Story with null storyFn
 * if the story id exists, it must be pointing to a non-existing story
 *  if there is assigned story id, the story must be empty
 */

(function (StoryError) {
  StoryError["NO_STORY"] = "No component or story to display";
})(StoryError || (StoryError = {}));

const MISSING_STORY = id => id ? `Story "${id}" doesn't exist.` : StoryError.NO_STORY;

const InlineStory = ({
  storyFn,
  height,
  id
}) => /*#__PURE__*/React.createElement(Fragment, null, height ? /*#__PURE__*/React.createElement("style", null, `#story--${id} { min-height: ${height}; transform: translateZ(0); overflow: auto }`) : null, /*#__PURE__*/React.createElement(Fragment, null, storyFn ? /*#__PURE__*/createElement(storyFn) : /*#__PURE__*/React.createElement(EmptyBlock, null, MISSING_STORY(id))));

InlineStory.displayName = "InlineStory";

const IFrameStory = ({
  id,
  title,
  height = '500px'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: '100%',
    height
  }
}, /*#__PURE__*/React.createElement(ZoomContext.Consumer, null, ({
  scale
}) => {
  return /*#__PURE__*/React.createElement(IFrame, {
    key: "iframe",
    id: `iframe--${id}`,
    title: title,
    src: `${BASE_URL}?id=${id}&viewMode=story`,
    allowFullScreen: true,
    scale: scale,
    style: {
      width: '100%',
      height: '100%',
      border: '0 none'
    }
  });
}));

IFrameStory.displayName = "IFrameStory";

/**
 * A story element, either rendered inline or in an iframe,
 * with configurable height.
 */
const Story = (_ref) => {
  let {
    error,
    inline
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "error", "inline"]);

  const {
    id,
    title,
    height
  } = props;

  if (error) {
    return /*#__PURE__*/React.createElement(EmptyBlock, null, error);
  }

  return inline ? /*#__PURE__*/React.createElement(InlineStory, props) : /*#__PURE__*/React.createElement(IFrameStory, {
    id: id,
    title: title,
    height: height
  });
};

const StorySkeleton = () => /*#__PURE__*/React.createElement(Loader, null);

StorySkeleton.displayName = "StorySkeleton";
export { Story, StorySkeleton };