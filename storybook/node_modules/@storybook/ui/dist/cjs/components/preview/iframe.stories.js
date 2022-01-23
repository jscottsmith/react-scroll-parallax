"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreparingDocs = exports.PreparingStory = exports.MissingStory = exports.WorkingStory = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _iframe = require("./iframe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _iframe.IFrame,
  title: 'UI/Iframe'
};
exports.default = _default;
var style = {
  maxWidth: '700px',
  height: '500px',
  border: '2px solid hotpink',
  position: 'relative'
};

var WorkingStory = function WorkingStory() {
  return /*#__PURE__*/_react.default.createElement(_iframe.IFrame, {
    active: true,
    id: "iframe",
    title: "Missing",
    src: "/iframe.html?id=ui-panel--default",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};

exports.WorkingStory = WorkingStory;
WorkingStory.displayName = "WorkingStory";
WorkingStory.parameters = {
  chromatic: {
    disable: true
  }
};

var MissingStory = function MissingStory() {
  return /*#__PURE__*/_react.default.createElement(_iframe.IFrame, {
    active: true,
    id: "iframe",
    title: "Missing",
    src: "/iframe.html?id=missing",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};

exports.MissingStory = MissingStory;
MissingStory.displayName = "MissingStory";

var PreparingStory = function PreparingStory() {
  return /*#__PURE__*/_react.default.createElement(_iframe.IFrame, {
    active: true,
    id: "iframe",
    title: "Preparing Story",
    src: "/iframe.html?__SPECIAL_TEST_PARAMETER__=preparing-story",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};

exports.PreparingStory = PreparingStory;
PreparingStory.displayName = "PreparingStory";
PreparingStory.parameters = {
  chromatic: {
    disable: true
  }
};

var PreparingDocs = function PreparingDocs() {
  return /*#__PURE__*/_react.default.createElement(_iframe.IFrame, {
    active: true,
    id: "iframe",
    title: "Preparing Docs",
    src: "/iframe.html?__SPECIAL_TEST_PARAMETER__=preparing-docs",
    allowFullScreen: true,
    style: style,
    scale: 1.0
  });
};

exports.PreparingDocs = PreparingDocs;
PreparingDocs.displayName = "PreparingDocs";
PreparingDocs.parameters = {
  chromatic: {
    disable: true
  }
};