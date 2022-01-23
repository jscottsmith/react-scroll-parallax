"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = exports.Nested = exports.Expandable = exports.Types = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _HighlightStyles = require("./HighlightStyles");

var _TreeNode = require("./TreeNode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: 'UI/Sidebar/TreeNode',
  parameters: {
    layout: 'fullscreen'
  },
  component: _TreeNode.StoryNode
};
exports.default = _default;

var Types = function Types() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TreeNode.ComponentNode, null, "Component"), /*#__PURE__*/_react.default.createElement(_TreeNode.GroupNode, null, "Group"), /*#__PURE__*/_react.default.createElement(_TreeNode.StoryNode, null, "Story"), /*#__PURE__*/_react.default.createElement(_TreeNode.DocumentNode, null, "Document"));
};

exports.Types = Types;

var Expandable = function Expandable() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TreeNode.ComponentNode, {
    isExpandable: true
  }, "Collapsed component"), /*#__PURE__*/_react.default.createElement(_TreeNode.ComponentNode, {
    isExpandable: true,
    isExpanded: true
  }, "Expanded component"), /*#__PURE__*/_react.default.createElement(_TreeNode.GroupNode, {
    isExpandable: true
  }, "Collapsed group"), /*#__PURE__*/_react.default.createElement(_TreeNode.GroupNode, {
    isExpandable: true,
    isExpanded: true
  }, "Expanded group"));
};

exports.Expandable = Expandable;

var Nested = function Nested() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TreeNode.DocumentNode, {
    depth: 0
  }, "Zero"), /*#__PURE__*/_react.default.createElement(_TreeNode.GroupNode, {
    isExpandable: true,
    isExpanded: true,
    depth: 0
  }, "Zero"), /*#__PURE__*/_react.default.createElement(_TreeNode.GroupNode, {
    isExpandable: true,
    isExpanded: true,
    depth: 1
  }, "One"), /*#__PURE__*/_react.default.createElement(_TreeNode.StoryNode, {
    depth: 2
  }, "Two"), /*#__PURE__*/_react.default.createElement(_TreeNode.ComponentNode, {
    isExpandable: true,
    isExpanded: true,
    depth: 2
  }, "Two"), /*#__PURE__*/_react.default.createElement(_TreeNode.StoryNode, {
    depth: 3
  }, "Three"));
};

exports.Nested = Nested;

var Selection = function Selection() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_HighlightStyles.HighlightStyles, {
    refId: "foo",
    itemId: "bar"
  }), /*#__PURE__*/_react.default.createElement(_TreeNode.StoryNode, {
    "data-ref-id": "baz",
    "data-item-id": "bar",
    "data-nodetype": "story",
    "data-selected": "false"
  }, "Default story"), /*#__PURE__*/_react.default.createElement(_TreeNode.StoryNode, {
    "data-ref-id": "baz",
    "data-item-id": "bar",
    "data-nodetype": "story",
    "data-selected": "true"
  }, "Selected story"), /*#__PURE__*/_react.default.createElement(_TreeNode.StoryNode, {
    "data-ref-id": "foo",
    "data-item-id": "bar",
    "data-nodetype": "story",
    "data-selected": "false"
  }, "Highlighted story"), /*#__PURE__*/_react.default.createElement(_TreeNode.StoryNode, {
    "data-ref-id": "foo",
    "data-item-id": "bar",
    "data-nodetype": "story",
    "data-selected": "true"
  }, "Highlighted + Selected story"), /*#__PURE__*/_react.default.createElement(_TreeNode.GroupNode, {
    "data-ref-id": "foo",
    "data-item-id": "baz",
    "data-nodetype": "group",
    "data-selected": "false"
  }, "Default group"), /*#__PURE__*/_react.default.createElement(_TreeNode.GroupNode, {
    "data-ref-id": "foo",
    "data-item-id": "bar",
    "data-nodetype": "group",
    "data-selected": "false"
  }, "Highlighted group"));
};

exports.Selection = Selection;