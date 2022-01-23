"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = exports.getDescriptionProps = exports.DescriptionType = void 0;

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _DocsContext = require("./DocsContext");

var _types = require("./types");

var _docgen = require("../lib/docgen");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DescriptionType;
exports.DescriptionType = DescriptionType;

(function (DescriptionType) {
  DescriptionType["INFO"] = "info";
  DescriptionType["NOTES"] = "notes";
  DescriptionType["DOCGEN"] = "docgen";
  DescriptionType["LEGACY_5_2"] = "legacy-5.2";
  DescriptionType["AUTO"] = "auto";
})(DescriptionType || (exports.DescriptionType = DescriptionType = {}));

var getNotes = function getNotes(notes) {
  return notes && (typeof notes === 'string' ? notes : (0, _docgen.str)(notes.markdown) || (0, _docgen.str)(notes.text));
};

var getInfo = function getInfo(info) {
  return info && (typeof info === 'string' ? info : (0, _docgen.str)(info.text));
};

var noDescription = function noDescription(component) {
  return null;
};

var getDescriptionProps = function getDescriptionProps(_ref, _ref2) {
  var of = _ref.of,
      type = _ref.type,
      markdown = _ref.markdown,
      children = _ref.children;
  var id = _ref2.id,
      storyById = _ref2.storyById;

  var _storyById = storyById(id),
      component = _storyById.component,
      parameters = _storyById.parameters;

  if (children || markdown) {
    return {
      markdown: children || markdown
    };
  }

  var notes = parameters.notes,
      info = parameters.info,
      docs = parameters.docs;

  var _ref3 = docs || {},
      _ref3$extractComponen = _ref3.extractComponentDescription,
      extractComponentDescription = _ref3$extractComponen === void 0 ? noDescription : _ref3$extractComponen,
      description = _ref3.description;

  var target = of === _types.CURRENT_SELECTION ? component : of; // override component description

  var componentDescriptionParameter = description === null || description === void 0 ? void 0 : description.component;

  if (componentDescriptionParameter) {
    return {
      markdown: componentDescriptionParameter
    };
  }

  switch (type) {
    case DescriptionType.INFO:
      return {
        markdown: getInfo(info)
      };

    case DescriptionType.NOTES:
      return {
        markdown: getNotes(notes)
      };
    // FIXME: remove in 6.0

    case DescriptionType.LEGACY_5_2:
      return {
        markdown: "\n".concat(getNotes(notes) || getInfo(info) || '', "\n\n").concat(extractComponentDescription(target) || '', "\n").trim()
      };

    case DescriptionType.DOCGEN:
    case DescriptionType.AUTO:
    default:
      return {
        markdown: extractComponentDescription(target, Object.assign({
          component: component
        }, parameters))
      };
  }
};

exports.getDescriptionProps = getDescriptionProps;

var DescriptionContainer = function DescriptionContainer(props) {
  var context = (0, _react.useContext)(_DocsContext.DocsContext);

  var _getDescriptionProps = getDescriptionProps(props, context),
      markdown = _getDescriptionProps.markdown;

  return markdown ? /*#__PURE__*/_react.default.createElement(_components.Description, {
    markdown: markdown
  }) : null;
}; // since we are in the docs blocks, assume default description if for primary component story


exports.Description = DescriptionContainer;
DescriptionContainer.defaultProps = {
  of: '.'
};