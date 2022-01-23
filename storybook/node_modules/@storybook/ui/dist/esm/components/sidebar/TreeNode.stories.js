import React from 'react';
import { HighlightStyles } from './HighlightStyles';
import { ComponentNode, DocumentNode, GroupNode, StoryNode } from './TreeNode';
export default {
  title: 'UI/Sidebar/TreeNode',
  parameters: {
    layout: 'fullscreen'
  },
  component: StoryNode
};
export var Types = function Types() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ComponentNode, null, "Component"), /*#__PURE__*/React.createElement(GroupNode, null, "Group"), /*#__PURE__*/React.createElement(StoryNode, null, "Story"), /*#__PURE__*/React.createElement(DocumentNode, null, "Document"));
};
export var Expandable = function Expandable() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ComponentNode, {
    isExpandable: true
  }, "Collapsed component"), /*#__PURE__*/React.createElement(ComponentNode, {
    isExpandable: true,
    isExpanded: true
  }, "Expanded component"), /*#__PURE__*/React.createElement(GroupNode, {
    isExpandable: true
  }, "Collapsed group"), /*#__PURE__*/React.createElement(GroupNode, {
    isExpandable: true,
    isExpanded: true
  }, "Expanded group"));
};
export var Nested = function Nested() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DocumentNode, {
    depth: 0
  }, "Zero"), /*#__PURE__*/React.createElement(GroupNode, {
    isExpandable: true,
    isExpanded: true,
    depth: 0
  }, "Zero"), /*#__PURE__*/React.createElement(GroupNode, {
    isExpandable: true,
    isExpanded: true,
    depth: 1
  }, "One"), /*#__PURE__*/React.createElement(StoryNode, {
    depth: 2
  }, "Two"), /*#__PURE__*/React.createElement(ComponentNode, {
    isExpandable: true,
    isExpanded: true,
    depth: 2
  }, "Two"), /*#__PURE__*/React.createElement(StoryNode, {
    depth: 3
  }, "Three"));
};
export var Selection = function Selection() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HighlightStyles, {
    refId: "foo",
    itemId: "bar"
  }), /*#__PURE__*/React.createElement(StoryNode, {
    "data-ref-id": "baz",
    "data-item-id": "bar",
    "data-nodetype": "story",
    "data-selected": "false"
  }, "Default story"), /*#__PURE__*/React.createElement(StoryNode, {
    "data-ref-id": "baz",
    "data-item-id": "bar",
    "data-nodetype": "story",
    "data-selected": "true"
  }, "Selected story"), /*#__PURE__*/React.createElement(StoryNode, {
    "data-ref-id": "foo",
    "data-item-id": "bar",
    "data-nodetype": "story",
    "data-selected": "false"
  }, "Highlighted story"), /*#__PURE__*/React.createElement(StoryNode, {
    "data-ref-id": "foo",
    "data-item-id": "bar",
    "data-nodetype": "story",
    "data-selected": "true"
  }, "Highlighted + Selected story"), /*#__PURE__*/React.createElement(GroupNode, {
    "data-ref-id": "foo",
    "data-item-id": "baz",
    "data-nodetype": "group",
    "data-selected": "false"
  }, "Default group"), /*#__PURE__*/React.createElement(GroupNode, {
    "data-ref-id": "foo",
    "data-item-id": "bar",
    "data-nodetype": "group",
    "data-selected": "false"
  }, "Highlighted group"));
};