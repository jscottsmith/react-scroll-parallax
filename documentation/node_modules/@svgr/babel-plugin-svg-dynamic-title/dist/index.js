'use strict';

var core = require('@babel/core');

const elements = ["svg", "Svg"];
const createTitleElement = (children = [], attributes = []) => {
  const title = core.types.jsxIdentifier("title");
  return core.types.jsxElement(core.types.jsxOpeningElement(title, attributes), core.types.jsxClosingElement(title), children);
};
const createTitleIdAttribute = () => core.types.jsxAttribute(core.types.jsxIdentifier("id"), core.types.jsxExpressionContainer(core.types.identifier("titleId")));
const addTitleIdAttribute = (attributes) => {
  const existingId = attributes.find((attribute) => core.types.isJSXAttribute(attribute) && attribute.name.name === "id");
  if (!existingId) {
    return [...attributes, createTitleIdAttribute()];
  }
  existingId.value = core.types.jsxExpressionContainer(core.types.isStringLiteral(existingId.value) ? core.types.logicalExpression("||", core.types.identifier("titleId"), existingId.value) : core.types.identifier("titleId"));
  return attributes;
};
const plugin = () => ({
  visitor: {
    JSXElement(path) {
      if (!elements.length)
        return;
      const openingElement = path.get("openingElement");
      const openingElementName = openingElement.get("name");
      if (!elements.some((element) => openingElementName.isJSXIdentifier({ name: element }))) {
        return;
      }
      const getTitleElement = (existingTitle) => {
        var _a;
        const titleExpression = core.types.identifier("title");
        if (existingTitle) {
          existingTitle.openingElement.attributes = addTitleIdAttribute(existingTitle.openingElement.attributes);
        }
        const conditionalTitle = core.types.conditionalExpression(titleExpression, createTitleElement([core.types.jsxExpressionContainer(titleExpression)], existingTitle ? existingTitle.openingElement.attributes : [createTitleIdAttribute()]), core.types.nullLiteral());
        if ((_a = existingTitle == null ? void 0 : existingTitle.children) == null ? void 0 : _a.length) {
          return core.types.jsxExpressionContainer(core.types.conditionalExpression(core.types.binaryExpression("===", titleExpression, core.types.identifier("undefined")), existingTitle, conditionalTitle));
        }
        return core.types.jsxExpressionContainer(conditionalTitle);
      };
      let titleElement = null;
      const hasTitle = path.get("children").some((childPath) => {
        if (childPath.node === titleElement)
          return false;
        if (!childPath.isJSXElement())
          return false;
        const name = childPath.get("openingElement").get("name");
        if (!name.isJSXIdentifier())
          return false;
        if (name.node.name !== "title")
          return false;
        titleElement = getTitleElement(childPath.node);
        childPath.replaceWith(titleElement);
        return true;
      });
      titleElement = titleElement || getTitleElement();
      if (!hasTitle) {
        path.node.children.unshift(titleElement);
        path.replaceWith(path.node);
      }
    }
  }
});

module.exports = plugin;
//# sourceMappingURL=index.js.map
