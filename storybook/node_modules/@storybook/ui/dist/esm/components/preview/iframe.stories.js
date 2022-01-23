import React from 'react';
import { IFrame } from './iframe';
export default {
  component: IFrame,
  title: 'UI/Iframe'
};
var style = {
  maxWidth: '700px',
  height: '500px',
  border: '2px solid hotpink',
  position: 'relative'
};
export var WorkingStory = function WorkingStory() {
  return /*#__PURE__*/React.createElement(IFrame, {
    active: true,
    id: "iframe",
    title: "Missing",
    src: "/iframe.html?id=ui-panel--default",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};
WorkingStory.displayName = "WorkingStory";
WorkingStory.parameters = {
  chromatic: {
    disable: true
  }
};
export var MissingStory = function MissingStory() {
  return /*#__PURE__*/React.createElement(IFrame, {
    active: true,
    id: "iframe",
    title: "Missing",
    src: "/iframe.html?id=missing",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};
MissingStory.displayName = "MissingStory";
export var PreparingStory = function PreparingStory() {
  return /*#__PURE__*/React.createElement(IFrame, {
    active: true,
    id: "iframe",
    title: "Preparing Story",
    src: "/iframe.html?__SPECIAL_TEST_PARAMETER__=preparing-story",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};
PreparingStory.displayName = "PreparingStory";
PreparingStory.parameters = {
  chromatic: {
    disable: true
  }
};
export var PreparingDocs = function PreparingDocs() {
  return /*#__PURE__*/React.createElement(IFrame, {
    active: true,
    id: "iframe",
    title: "Preparing Docs",
    src: "/iframe.html?__SPECIAL_TEST_PARAMETER__=preparing-docs",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};
PreparingDocs.displayName = "PreparingDocs";
PreparingDocs.parameters = {
  chromatic: {
    disable: true
  }
};