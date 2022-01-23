"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = exports.Action = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.starts-with.js");

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _polished = require("polished");

var _react = _interopRequireWildcard(require("react"));

var _TreeNode = require("./TreeNode");

var _useExpanded3 = require("./useExpanded");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Action = _theming.styled.button(function (_ref) {
  var theme = _ref.theme;
  return {
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
    border: "1px solid transparent",
    borderRadius: '100%',
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.3, theme.color.defaultText) : (0, _polished.transparentize)(0.6, theme.color.defaultText),
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
  };
});

exports.Action = Action;

var CollapseButton = _theming.styled.button(function (_ref2) {
  var theme = _ref2.theme;
  return {
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
      boxShadow: "0 0 0 1px ".concat(theme.color.secondary),
      color: theme.color.secondary,
      'span:first-of-type': {
        color: theme.color.secondary
      },
      '&:not(:focus-visible)': {
        boxShadow: 'none'
      }
    }
  };
});

var LeafNodeStyleWrapper = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    position: 'relative'
  };
});

var SkipToContentLink = (0, _theming.styled)(_components.Button)(function (_ref4) {
  var theme = _ref4.theme;
  return {
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
  };
});

var Node = /*#__PURE__*/_react.default.memo(function (_ref5) {
  var _item$renderLabel3;

  var item = _ref5.item,
      refId = _ref5.refId,
      isOrphan = _ref5.isOrphan,
      isDisplayed = _ref5.isDisplayed,
      isSelected = _ref5.isSelected,
      isFullyExpanded = _ref5.isFullyExpanded,
      setFullyExpanded = _ref5.setFullyExpanded,
      isExpanded = _ref5.isExpanded,
      setExpanded = _ref5.setExpanded,
      onSelectStoryId = _ref5.onSelectStoryId;
  if (!isDisplayed) return null;
  var id = (0, _utils.createId)(item.id, refId);

  if ((0, _api.isStory)(item)) {
    var _item$renderLabel;

    var LeafNode = item.isComponent ? _TreeNode.DocumentNode : _TreeNode.StoryNode;
    return /*#__PURE__*/_react.default.createElement(LeafNodeStyleWrapper, null, /*#__PURE__*/_react.default.createElement(LeafNode, {
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
      href: (0, _utils.getLink)(item.id, refId),
      onClick: function onClick(event) {
        event.preventDefault();
        onSelectStoryId(item.id);
      }
    }, ((_item$renderLabel = item.renderLabel) === null || _item$renderLabel === void 0 ? void 0 : _item$renderLabel.call(item, item)) || item.name), isSelected && /*#__PURE__*/_react.default.createElement(SkipToContentLink, {
      secondary: true,
      outline: true,
      isLink: true,
      href: "#storybook-preview-wrapper"
    }, "Skip to canvas"));
  }

  if ((0, _api.isRoot)(item)) {
    var _item$renderLabel2;

    return /*#__PURE__*/_react.default.createElement(_TreeNode.RootNode, {
      key: id,
      id: id,
      className: "sidebar-subheading",
      "data-ref-id": refId,
      "data-item-id": item.id,
      "data-nodetype": "root",
      "aria-expanded": isExpanded
    }, /*#__PURE__*/_react.default.createElement(CollapseButton, {
      type: "button",
      "data-action": "collapse-root",
      onClick: function onClick(event) {
        event.preventDefault();
        setExpanded({
          ids: [item.id],
          value: !isExpanded
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_TreeNode.CollapseIcon, {
      isExpanded: isExpanded
    }), ((_item$renderLabel2 = item.renderLabel) === null || _item$renderLabel2 === void 0 ? void 0 : _item$renderLabel2.call(item, item)) || item.name), isExpanded && /*#__PURE__*/_react.default.createElement(Action, {
      type: "button",
      className: "sidebar-subheading-action",
      "aria-label": "expand",
      "data-action": "expand-all",
      "data-expanded": isFullyExpanded,
      onClick: function onClick(event) {
        event.preventDefault();
        setFullyExpanded();
      }
    }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
      icon: isFullyExpanded ? 'collapse' : 'expandalt'
    })));
  }

  var BranchNode = item.isComponent ? _TreeNode.ComponentNode : _TreeNode.GroupNode;
  return /*#__PURE__*/_react.default.createElement(BranchNode, {
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
    onClick: function onClick(event) {
      event.preventDefault();
      setExpanded({
        ids: [item.id],
        value: !isExpanded
      });
      if (item.isComponent && !isExpanded) onSelectStoryId(item.id);
    }
  }, ((_item$renderLabel3 = item.renderLabel) === null || _item$renderLabel3 === void 0 ? void 0 : _item$renderLabel3.call(item, item)) || item.name);
});

var Root = /*#__PURE__*/_react.default.memo(function (_ref6) {
  var setExpanded = _ref6.setExpanded,
      isFullyExpanded = _ref6.isFullyExpanded,
      expandableDescendants = _ref6.expandableDescendants,
      props = _objectWithoutProperties(_ref6, ["setExpanded", "isFullyExpanded", "expandableDescendants"]);

  var setFullyExpanded = (0, _react.useCallback)(function () {
    return setExpanded({
      ids: expandableDescendants,
      value: !isFullyExpanded
    });
  }, [setExpanded, isFullyExpanded, expandableDescendants]);
  return /*#__PURE__*/_react.default.createElement(Node, _extends({}, props, {
    setExpanded: setExpanded,
    isFullyExpanded: isFullyExpanded,
    setFullyExpanded: setFullyExpanded
  }));
});

var Container = _theming.styled.div(function (props) {
  return {
    marginTop: props.hasOrphans ? 20 : 0,
    marginBottom: 20
  };
});

var Tree = /*#__PURE__*/_react.default.memo(function (_ref7) {
  var isBrowsing = _ref7.isBrowsing,
      isMain = _ref7.isMain,
      refId = _ref7.refId,
      data = _ref7.data,
      highlightedRef = _ref7.highlightedRef,
      setHighlightedItemId = _ref7.setHighlightedItemId,
      selectedStoryId = _ref7.selectedStoryId,
      onSelectStoryId = _ref7.onSelectStoryId;
  var containerRef = (0, _react.useRef)(null); // Find top-level nodes and group them so we can hoist any orphans and expand any roots.

  var _useMemo = (0, _react.useMemo)(function () {
    return Object.keys(data).reduce(function (acc, id) {
      var item = data[id];
      if ((0, _api.isRoot)(item)) acc[0].push(id);else if (!item.parent) acc[1].push(id);
      if ((0, _api.isRoot)(item) && item.startCollapsed) acc[2][id] = false;
      return acc;
    }, [[], [], {}]);
  }, [data]),
      _useMemo2 = _slicedToArray(_useMemo, 3),
      rootIds = _useMemo2[0],
      orphanIds = _useMemo2[1],
      initialExpanded = _useMemo2[2]; // Pull up (hoist) any "orphan" items that don't have a root item as ancestor so they get
  // displayed at the top of the tree, before any root items.
  // Also create a map of expandable descendants for each root/orphan item, which is needed later.
  // Doing that here is a performance enhancement, as it avoids traversing the tree again later.


  var _useMemo3 = (0, _react.useMemo)(function () {
    return orphanIds.concat(rootIds).reduce(function (acc, nodeId) {
      var _acc$orphansFirst;

      var descendantIds = (0, _utils.getDescendantIds)(data, nodeId, false);

      (_acc$orphansFirst = acc.orphansFirst).push.apply(_acc$orphansFirst, [nodeId].concat(_toConsumableArray(descendantIds)));

      acc.expandableDescendants[nodeId] = descendantIds.filter(function (d) {
        return !data[d].isLeaf;
      });
      return acc;
    }, {
      orphansFirst: [],
      expandableDescendants: {}
    });
  }, [data, rootIds, orphanIds]),
      orphansFirst = _useMemo3.orphansFirst,
      expandableDescendants = _useMemo3.expandableDescendants; // Create a list of component IDs which have exactly one story, which name exactly matches the component name.


  var singleStoryComponentIds = (0, _react.useMemo)(function () {
    return orphansFirst.filter(function (nodeId) {
      var _data$nodeId = data[nodeId],
          _data$nodeId$children = _data$nodeId.children,
          children = _data$nodeId$children === void 0 ? [] : _data$nodeId$children,
          isComponent = _data$nodeId.isComponent,
          isLeaf = _data$nodeId.isLeaf,
          name = _data$nodeId.name;
      return !isLeaf && isComponent && children.length === 1 && (0, _api.isStory)(data[children[0]]) && data[children[0]].name === name;
    });
  }, [data, orphansFirst]); // Omit single-story components from the list of nodes.

  var collapsedItems = (0, _react.useMemo)(function () {
    return orphansFirst.filter(function (id) {
      return !singleStoryComponentIds.includes(id);
    });
  }, [orphanIds, orphansFirst, singleStoryComponentIds]); // Rewrite the dataset to place the child story in place of the component.

  var collapsedData = (0, _react.useMemo)(function () {
    return singleStoryComponentIds.reduce(function (acc, id) {
      var _ref8 = data[id],
          children = _ref8.children,
          parent = _ref8.parent;

      var _children = _slicedToArray(children, 1),
          childId = _children[0];

      if (parent) {
        var siblings = _toConsumableArray(data[parent].children);

        siblings[siblings.indexOf(id)] = childId;
        acc[parent] = Object.assign({}, data[parent], {
          children: siblings
        });
      }

      acc[childId] = Object.assign({}, data[childId], {
        parent: parent,
        depth: data[childId].depth - 1
      });
      return acc;
    }, Object.assign({}, data));
  }, [data]);
  var ancestry = (0, _react.useMemo)(function () {
    return collapsedItems.reduce(function (acc, id) {
      return Object.assign(acc, _defineProperty({}, id, (0, _utils.getAncestorIds)(collapsedData, id)));
    }, {});
  }, [collapsedItems, collapsedData]); // Track expanded nodes, keep it in sync with props and enable keyboard shortcuts.

  var _useExpanded = (0, _useExpanded3.useExpanded)({
    containerRef: containerRef,
    isBrowsing: isBrowsing,
    // only enable keyboard shortcuts when tree is visible
    refId: refId,
    data: collapsedData,
    initialExpanded: initialExpanded,
    rootIds: rootIds,
    highlightedRef: highlightedRef,
    setHighlightedItemId: setHighlightedItemId,
    selectedStoryId: selectedStoryId,
    onSelectStoryId: onSelectStoryId
  }),
      _useExpanded2 = _slicedToArray(_useExpanded, 2),
      expanded = _useExpanded2[0],
      setExpanded = _useExpanded2[1];

  return /*#__PURE__*/_react.default.createElement(Container, {
    ref: containerRef,
    hasOrphans: isMain && orphanIds.length > 0
  }, collapsedItems.map(function (itemId) {
    var item = collapsedData[itemId];
    var id = (0, _utils.createId)(itemId, refId);

    if ((0, _api.isRoot)(item)) {
      var descendants = expandableDescendants[item.id];
      var isFullyExpanded = descendants.every(function (d) {
        return expanded[d];
      });
      return /*#__PURE__*/_react.default.createElement(Root, {
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

    var isDisplayed = !item.parent || ancestry[itemId].every(function (a) {
      return expanded[a];
    });
    return /*#__PURE__*/_react.default.createElement(Node, {
      key: id,
      item: item,
      refId: refId,
      isOrphan: orphanIds.some(function (oid) {
        return itemId === oid || itemId.startsWith("".concat(oid, "-"));
      }),
      isDisplayed: isDisplayed,
      isSelected: selectedStoryId === itemId,
      isExpanded: !!expanded[itemId],
      setExpanded: setExpanded,
      onSelectStoryId: onSelectStoryId
    });
  }));
});

exports.Tree = Tree;