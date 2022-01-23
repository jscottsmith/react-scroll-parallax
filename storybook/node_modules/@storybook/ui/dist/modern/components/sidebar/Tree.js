import "core-js/modules/es.array.reduce.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { isRoot, isStory } from '@storybook/api';
import { styled } from '@storybook/theming';
import { Button, Icons } from '@storybook/components';
import { transparentize } from 'polished';
import React, { useCallback, useMemo, useRef } from 'react';
import { ComponentNode, DocumentNode, GroupNode, RootNode, StoryNode, CollapseIcon } from './TreeNode';
import { useExpanded } from './useExpanded';
import { createId, getAncestorIds, getDescendantIds, getLink } from './utils';
export const Action = styled.button(({
  theme
}) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
  margin: 0,
  marginLeft: 'auto',
  padding: 0,
  outline: 0,
  lineHeight: 'normal',
  background: 'none',
  border: `1px solid transparent`,
  borderRadius: '100%',
  cursor: 'pointer',
  transition: 'all 150ms ease-out',
  color: theme.base === 'light' ? transparentize(0.3, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText),
  '&:hover': {
    color: theme.color.secondary
  },
  '&:focus': {
    color: theme.color.secondary,
    borderColor: theme.color.secondary,
    '&:not(:focus-visible)': {
      borderColor: 'transparent'
    }
  },
  svg: {
    width: 10,
    height: 10
  }
}));
const CollapseButton = styled.button(({
  theme
}) => ({
  // Reset button
  background: 'transparent',
  border: 'none',
  outline: 'none',
  boxSizing: 'content-box',
  cursor: 'pointer',
  position: 'relative',
  textAlign: 'left',
  lineHeight: 'normal',
  font: 'inherit',
  color: 'inherit',
  letterSpacing: 'inherit',
  textTransform: 'inherit',
  display: 'flex',
  flex: '0 1 auto',
  padding: '3px 10px 1px 1px',
  margin: 0,
  marginLeft: -19,
  overflow: 'hidden',
  borderRadius: 26,
  transition: 'color 150ms, box-shadow 150ms',
  'span:first-of-type': {
    marginTop: 4,
    marginRight: 7
  },
  '&:focus': {
    boxShadow: `0 0 0 1px ${theme.color.secondary}`,
    color: theme.color.secondary,
    'span:first-of-type': {
      color: theme.color.secondary
    },
    '&:not(:focus-visible)': {
      boxShadow: 'none'
    }
  }
}));
const LeafNodeStyleWrapper = styled.div(({
  theme
}) => ({
  position: 'relative'
}));
const SkipToContentLink = styled(Button)(({
  theme
}) => ({
  display: 'none',
  '@media (min-width: 600px)': {
    display: 'block',
    zIndex: -1,
    position: 'absolute',
    top: 1,
    right: 20,
    height: '20px',
    fontSize: '10px',
    padding: '5px 10px',
    '&:focus': {
      background: 'white',
      zIndex: 1
    }
  }
}));
const Node = /*#__PURE__*/React.memo(({
  item,
  refId,
  isOrphan,
  isDisplayed,
  isSelected,
  isFullyExpanded,
  setFullyExpanded,
  isExpanded,
  setExpanded,
  onSelectStoryId
}) => {
  var _item$renderLabel3;

  if (!isDisplayed) return null;
  const id = createId(item.id, refId);

  if (isStory(item)) {
    var _item$renderLabel;

    const LeafNode = item.isComponent ? DocumentNode : StoryNode;
    return /*#__PURE__*/React.createElement(LeafNodeStyleWrapper, null, /*#__PURE__*/React.createElement(LeafNode, {
      key: id,
      id: id,
      className: "sidebar-item",
      "data-ref-id": refId,
      "data-item-id": item.id,
      "data-parent-id": item.parent,
      "data-nodetype": item.isComponent ? 'document' : 'story',
      "data-selected": isSelected,
      "data-highlightable": isDisplayed,
      depth: isOrphan ? item.depth : item.depth - 1,
      href: getLink(item.id, refId),
      onClick: event => {
        event.preventDefault();
        onSelectStoryId(item.id);
      }
    }, ((_item$renderLabel = item.renderLabel) === null || _item$renderLabel === void 0 ? void 0 : _item$renderLabel.call(item, item)) || item.name), isSelected && /*#__PURE__*/React.createElement(SkipToContentLink, {
      secondary: true,
      outline: true,
      isLink: true,
      href: "#storybook-preview-wrapper"
    }, "Skip to canvas"));
  }

  if (isRoot(item)) {
    var _item$renderLabel2;

    return /*#__PURE__*/React.createElement(RootNode, {
      key: id,
      id: id,
      className: "sidebar-subheading",
      "data-ref-id": refId,
      "data-item-id": item.id,
      "data-nodetype": "root",
      "aria-expanded": isExpanded
    }, /*#__PURE__*/React.createElement(CollapseButton, {
      type: "button",
      "data-action": "collapse-root",
      onClick: event => {
        event.preventDefault();
        setExpanded({
          ids: [item.id],
          value: !isExpanded
        });
      }
    }, /*#__PURE__*/React.createElement(CollapseIcon, {
      isExpanded: isExpanded
    }), ((_item$renderLabel2 = item.renderLabel) === null || _item$renderLabel2 === void 0 ? void 0 : _item$renderLabel2.call(item, item)) || item.name), isExpanded && /*#__PURE__*/React.createElement(Action, {
      type: "button",
      className: "sidebar-subheading-action",
      "aria-label": "expand",
      "data-action": "expand-all",
      "data-expanded": isFullyExpanded,
      onClick: event => {
        event.preventDefault();
        setFullyExpanded();
      }
    }, /*#__PURE__*/React.createElement(Icons, {
      icon: isFullyExpanded ? 'collapse' : 'expandalt'
    })));
  }

  const BranchNode = item.isComponent ? ComponentNode : GroupNode;
  return /*#__PURE__*/React.createElement(BranchNode, {
    key: id,
    id: id,
    className: "sidebar-item",
    "data-ref-id": refId,
    "data-item-id": item.id,
    "data-parent-id": item.parent,
    "data-nodetype": item.isComponent ? 'component' : 'group',
    "data-highlightable": isDisplayed,
    "aria-controls": item.children && item.children[0],
    "aria-expanded": isExpanded,
    depth: isOrphan ? item.depth : item.depth - 1,
    isComponent: item.isComponent,
    isExpandable: item.children && item.children.length > 0,
    isExpanded: isExpanded,
    onClick: event => {
      event.preventDefault();
      setExpanded({
        ids: [item.id],
        value: !isExpanded
      });
      if (item.isComponent && !isExpanded) onSelectStoryId(item.id);
    }
  }, ((_item$renderLabel3 = item.renderLabel) === null || _item$renderLabel3 === void 0 ? void 0 : _item$renderLabel3.call(item, item)) || item.name);
});
const Root = /*#__PURE__*/React.memo((_ref) => {
  let {
    setExpanded,
    isFullyExpanded,
    expandableDescendants
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["setExpanded", "isFullyExpanded", "expandableDescendants"]);

  const setFullyExpanded = useCallback(() => setExpanded({
    ids: expandableDescendants,
    value: !isFullyExpanded
  }), [setExpanded, isFullyExpanded, expandableDescendants]);
  return /*#__PURE__*/React.createElement(Node, _extends({}, props, {
    setExpanded: setExpanded,
    isFullyExpanded: isFullyExpanded,
    setFullyExpanded: setFullyExpanded
  }));
});
const Container = styled.div(props => ({
  marginTop: props.hasOrphans ? 20 : 0,
  marginBottom: 20
}));
export const Tree = /*#__PURE__*/React.memo(({
  isBrowsing,
  isMain,
  refId,
  data,
  highlightedRef,
  setHighlightedItemId,
  selectedStoryId,
  onSelectStoryId
}) => {
  const containerRef = useRef(null); // Find top-level nodes and group them so we can hoist any orphans and expand any roots.

  const [rootIds, orphanIds, initialExpanded] = useMemo(() => Object.keys(data).reduce((acc, id) => {
    const item = data[id];
    if (isRoot(item)) acc[0].push(id);else if (!item.parent) acc[1].push(id);
    if (isRoot(item) && item.startCollapsed) acc[2][id] = false;
    return acc;
  }, [[], [], {}]), [data]); // Pull up (hoist) any "orphan" items that don't have a root item as ancestor so they get
  // displayed at the top of the tree, before any root items.
  // Also create a map of expandable descendants for each root/orphan item, which is needed later.
  // Doing that here is a performance enhancement, as it avoids traversing the tree again later.

  const {
    orphansFirst,
    expandableDescendants
  } = useMemo(() => {
    return orphanIds.concat(rootIds).reduce((acc, nodeId) => {
      const descendantIds = getDescendantIds(data, nodeId, false);
      acc.orphansFirst.push(nodeId, ...descendantIds);
      acc.expandableDescendants[nodeId] = descendantIds.filter(d => !data[d].isLeaf);
      return acc;
    }, {
      orphansFirst: [],
      expandableDescendants: {}
    });
  }, [data, rootIds, orphanIds]); // Create a list of component IDs which have exactly one story, which name exactly matches the component name.

  const singleStoryComponentIds = useMemo(() => {
    return orphansFirst.filter(nodeId => {
      const {
        children = [],
        isComponent,
        isLeaf,
        name
      } = data[nodeId];
      return !isLeaf && isComponent && children.length === 1 && isStory(data[children[0]]) && data[children[0]].name === name;
    });
  }, [data, orphansFirst]); // Omit single-story components from the list of nodes.

  const collapsedItems = useMemo(() => {
    return orphansFirst.filter(id => !singleStoryComponentIds.includes(id));
  }, [orphanIds, orphansFirst, singleStoryComponentIds]); // Rewrite the dataset to place the child story in place of the component.

  const collapsedData = useMemo(() => {
    return singleStoryComponentIds.reduce((acc, id) => {
      const {
        children,
        parent
      } = data[id];
      const [childId] = children;

      if (parent) {
        const siblings = [...data[parent].children];
        siblings[siblings.indexOf(id)] = childId;
        acc[parent] = Object.assign({}, data[parent], {
          children: siblings
        });
      }

      acc[childId] = Object.assign({}, data[childId], {
        parent,
        depth: data[childId].depth - 1
      });
      return acc;
    }, Object.assign({}, data));
  }, [data]);
  const ancestry = useMemo(() => {
    return collapsedItems.reduce((acc, id) => Object.assign(acc, {
      [id]: getAncestorIds(collapsedData, id)
    }), {});
  }, [collapsedItems, collapsedData]); // Track expanded nodes, keep it in sync with props and enable keyboard shortcuts.

  const [expanded, setExpanded] = useExpanded({
    containerRef,
    isBrowsing,
    // only enable keyboard shortcuts when tree is visible
    refId,
    data: collapsedData,
    initialExpanded,
    rootIds,
    highlightedRef,
    setHighlightedItemId,
    selectedStoryId,
    onSelectStoryId
  });
  return /*#__PURE__*/React.createElement(Container, {
    ref: containerRef,
    hasOrphans: isMain && orphanIds.length > 0
  }, collapsedItems.map(itemId => {
    const item = collapsedData[itemId];
    const id = createId(itemId, refId);

    if (isRoot(item)) {
      const descendants = expandableDescendants[item.id];
      const isFullyExpanded = descendants.every(d => expanded[d]);
      return /*#__PURE__*/React.createElement(Root, {
        key: id,
        item: item,
        refId: refId,
        isOrphan: false,
        isDisplayed: true,
        isSelected: selectedStoryId === itemId,
        isExpanded: !!expanded[itemId],
        setExpanded: setExpanded,
        isFullyExpanded: isFullyExpanded,
        expandableDescendants: descendants,
        onSelectStoryId: onSelectStoryId
      });
    }

    const isDisplayed = !item.parent || ancestry[itemId].every(a => expanded[a]);
    return /*#__PURE__*/React.createElement(Node, {
      key: id,
      item: item,
      refId: refId,
      isOrphan: orphanIds.some(oid => itemId === oid || itemId.startsWith(`${oid}-`)),
      isDisplayed: isDisplayed,
      isSelected: selectedStoryId === itemId,
      isExpanded: !!expanded[itemId],
      setExpanded: setExpanded,
      onSelectStoryId: onSelectStoryId
    });
  }));
});