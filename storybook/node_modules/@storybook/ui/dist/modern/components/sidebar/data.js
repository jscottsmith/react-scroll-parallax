function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

export const DEFAULT_REF_ID = 'storybook_internal';
export const collapseAllStories = stories => {
  // keep track of component IDs that have been rewritten to the ID of their first leaf child
  const componentIdToLeafId = {}; // 1) remove all leaves

  const leavesRemoved = Object.values(stories).filter(item => !(item.isLeaf && stories[item.parent].isComponent)); // 2) make all components leaves and rewrite their ID's to the first leaf child

  const componentsFlattened = leavesRemoved.map(item => {
    const {
      id,
      isComponent,
      children
    } = item,
          rest = _objectWithoutPropertiesLoose(item, ["id", "isComponent", "children"]); // this is a folder, so just leave it alone


    if (!isComponent) {
      return item;
    }

    const nonLeafChildren = [];
    const leafChildren = [];
    children.forEach(child => (stories[child].isLeaf ? leafChildren : nonLeafChildren).push(child));

    if (leafChildren.length === 0) {
      return item; // pass through, we'll handle you later
    }

    const leafId = leafChildren[0];
    const component = Object.assign({
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
      throw new Error(`Unexpected '${item.id}': ${JSON.stringify({
        isComponent,
        nonLeafChildren
      })}`);
    }

    return component;
  }); // 3) rewrite all the children as needed

  const childrenRewritten = componentsFlattened.map(item => {
    if (item.isLeaf) {
      return item;
    }

    const {
      children
    } = item,
          rest = _objectWithoutPropertiesLoose(item, ["children"]);

    const rewritten = children.map(child => componentIdToLeafId[child] || child);
    return Object.assign({
      children: rewritten
    }, rest);
  });
  const result = {};
  childrenRewritten.forEach(item => {
    result[item.id] = item;
  });
  return result;
};
export const collapseDocsOnlyStories = storiesHash => {
  // keep track of component IDs that have been rewritten to the ID of their first leaf child
  const componentIdToLeafId = {};
  const docsOnlyStoriesRemoved = Object.values(storiesHash).filter(item => {
    if (item.isLeaf && item.parameters && item.parameters.docsOnly) {
      componentIdToLeafId[item.parent] = item.id;
      return false; // filter it out
    }

    return true;
  });
  const docsOnlyComponentsCollapsed = docsOnlyStoriesRemoved.map(item => {
    // collapse docs-only components
    const {
      isComponent,
      children,
      id
    } = item;

    if (isComponent && children.length === 1) {
      const leafId = componentIdToLeafId[id];

      if (leafId) {
        const collapsed = Object.assign({
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
      const rewritten = children.map(child => componentIdToLeafId[child] || child);
      return Object.assign({}, item, {
        children: rewritten
      });
    } // pass through stories unmodified


    return item;
  });
  const result = {};
  docsOnlyComponentsCollapsed.forEach(item => {
    result[item.id] = item;
  });
  return result;
};