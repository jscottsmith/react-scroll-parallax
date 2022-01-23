"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collapseDocsOnlyStories = exports.collapseAllStories = exports.DEFAULT_REF_ID = void 0;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.array.concat.js");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DEFAULT_REF_ID = 'storybook_internal';
exports.DEFAULT_REF_ID = DEFAULT_REF_ID;

var collapseAllStories = function collapseAllStories(stories) {
  // keep track of component IDs that have been rewritten to the ID of their first leaf child
  var componentIdToLeafId = {}; // 1) remove all leaves

  var leavesRemoved = Object.values(stories).filter(function (item) {
    return !(item.isLeaf && stories[item.parent].isComponent);
  }); // 2) make all components leaves and rewrite their ID's to the first leaf child

  var componentsFlattened = leavesRemoved.map(function (item) {
    var id = item.id,
        isComponent = item.isComponent,
        children = item.children,
        rest = _objectWithoutProperties(item, ["id", "isComponent", "children"]); // this is a folder, so just leave it alone


    if (!isComponent) {
      return item;
    }

    var nonLeafChildren = [];
    var leafChildren = [];
    children.forEach(function (child) {
      return (stories[child].isLeaf ? leafChildren : nonLeafChildren).push(child);
    });

    if (leafChildren.length === 0) {
      return item; // pass through, we'll handle you later
    }

    var leafId = leafChildren[0];
    var component = Object.assign({
      args: {}
    }, rest, {
      id: leafId,
      kind: stories[leafId].kind,
      isRoot: false,
      isLeaf: true,
      isComponent: true,
      children: []
    });
    componentIdToLeafId[id] = leafId; // this is a component, so it should not have any non-leaf children

    if (nonLeafChildren.length !== 0) {
      throw new Error("Unexpected '".concat(item.id, "': ").concat(JSON.stringify({
        isComponent: isComponent,
        nonLeafChildren: nonLeafChildren
      })));
    }

    return component;
  }); // 3) rewrite all the children as needed

  var childrenRewritten = componentsFlattened.map(function (item) {
    if (item.isLeaf) {
      return item;
    }

    var children = item.children,
        rest = _objectWithoutProperties(item, ["children"]);

    var rewritten = children.map(function (child) {
      return componentIdToLeafId[child] || child;
    });
    return Object.assign({
      children: rewritten
    }, rest);
  });
  var result = {};
  childrenRewritten.forEach(function (item) {
    result[item.id] = item;
  });
  return result;
};

exports.collapseAllStories = collapseAllStories;

var collapseDocsOnlyStories = function collapseDocsOnlyStories(storiesHash) {
  // keep track of component IDs that have been rewritten to the ID of their first leaf child
  var componentIdToLeafId = {};
  var docsOnlyStoriesRemoved = Object.values(storiesHash).filter(function (item) {
    if (item.isLeaf && item.parameters && item.parameters.docsOnly) {
      componentIdToLeafId[item.parent] = item.id;
      return false; // filter it out
    }

    return true;
  });
  var docsOnlyComponentsCollapsed = docsOnlyStoriesRemoved.map(function (item) {
    // collapse docs-only components
    var isComponent = item.isComponent,
        children = item.children,
        id = item.id;

    if (isComponent && children.length === 1) {
      var leafId = componentIdToLeafId[id];

      if (leafId) {
        var collapsed = Object.assign({
          args: {}
        }, item, {
          id: leafId,
          isLeaf: true,
          children: []
        });
        return collapsed;
      }
    } // update groups


    if (children) {
      var rewritten = children.map(function (child) {
        return componentIdToLeafId[child] || child;
      });
      return Object.assign({}, item, {
        children: rewritten
      });
    } // pass through stories unmodified


    return item;
  });
  var result = {};
  docsOnlyComponentsCollapsed.forEach(function (item) {
    result[item.id] = item;
  });
  return result;
};

exports.collapseDocsOnlyStories = collapseDocsOnlyStories;