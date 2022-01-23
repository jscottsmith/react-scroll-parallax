"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSvelteSource = generateSvelteSource;
exports.sourceDecorator = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.ends-with.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.find.js");

var _addons = require("@storybook/addons");

var _shared = require("../../shared");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Check if the sourcecode should be generated.
 *
 * @param context StoryContext
 */
var skipSourceRender = function skipSourceRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  var isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.CODE;
};
/**
 * Transform a key/value to a svelte declaration as string.
 *
 * Default values are ommited
 *
 * @param key Key
 * @param value Value
 * @param argTypes Component ArgTypes
 */


function toSvelteProperty(key, value, argTypes) {
  if (value === undefined || value === null) {
    return null;
  } // default value ?


  if (argTypes[key] && argTypes[key].defaultValue === value) {
    return null;
  }

  if (value === true) {
    return key;
  }

  if (typeof value === 'string') {
    return "".concat(key, "=").concat(JSON.stringify(value));
  }

  return "".concat(key, "={").concat(JSON.stringify(value), "}");
}
/**
 * Extract a component name.
 *
 * @param component Component
 */


function getComponentName(component) {
  if (component == null) {
    return null;
  }

  var _component$__docgen = component.__docgen,
      __docgen = _component$__docgen === void 0 ? {} : _component$__docgen;

  var name = __docgen.name;

  if (!name) {
    return component.name;
  }

  if (name.endsWith('.svelte')) {
    name = name.substring(0, name.length - 7);
  }

  return name;
}
/**
 * Generate a svelte template.
 *
 * @param component Component
 * @param args Args
 * @param argTypes ArgTypes
 * @param slotProperty Property used to simulate a slot
 */


function generateSvelteSource(component, args, argTypes, slotProperty) {
  var name = getComponentName(component);

  if (!name) {
    return null;
  }

  var props = Object.entries(args).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        k = _ref2[0];

    return k !== slotProperty;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return toSvelteProperty(k, v, argTypes);
  }).filter(function (p) {
    return p;
  }).join(' ');
  var slotValue = slotProperty ? args[slotProperty] : null;

  if (slotValue) {
    return "<".concat(name, " ").concat(props, ">\n    ").concat(slotValue, "\n</").concat(name, ">");
  }

  return "<".concat(name, " ").concat(props, "/>");
}
/**
 * Check if the story component is a wrapper to the real component.
 *
 * A component can be annoted with @wrapper to indicate that
 * it's just a wrapper for the real tested component. If it's the case
 * then the code generated references the real component, not the wrapper.
 *
 * moreover, a wrapper can annotate a property with @slot : this property
 * is then assumed to be an alias to the default slot.
 *
 * @param component Component
 */


function getWrapperProperties(component) {
  var __docgen = component.__docgen;

  if (!__docgen) {
    return {
      wrapper: false
    };
  } // the component should be declared as a wrapper


  if (!__docgen.keywords.find(function (kw) {
    return kw.name === 'wrapper';
  })) {
    return {
      wrapper: false
    };
  }

  var slotProp = __docgen.data.find(function (prop) {
    return prop.keywords.find(function (kw) {
      return kw.name === 'slot';
    });
  });

  return {
    wrapper: true,
    slotProperty: slotProp === null || slotProp === void 0 ? void 0 : slotProp.name
  };
}
/**
 * Svelte source decorator.
 * @param storyFn Fn
 * @param context  StoryContext
 */


var sourceDecorator = function sourceDecorator(storyFn, context) {
  var channel = _addons.addons.getChannel();

  var skip = skipSourceRender(context);
  var story = storyFn();
  var source;
  (0, _addons.useEffect)(function () {
    if (!skip && source) {
      channel.emit(_shared.SNIPPET_RENDERED, (context || {}).id, source);
    }
  });

  if (skip) {
    return story;
  }

  var _ref5 = context || {},
      _ref5$parameters = _ref5.parameters,
      parameters = _ref5$parameters === void 0 ? {} : _ref5$parameters,
      _ref5$args = _ref5.args,
      args = _ref5$args === void 0 ? {} : _ref5$args;

  var _story$Component = story.Component,
      component = _story$Component === void 0 ? {} : _story$Component;

  var _getWrapperProperties = getWrapperProperties(component),
      wrapper = _getWrapperProperties.wrapper,
      slotProperty = _getWrapperProperties.slotProperty;

  if (wrapper) {
    component = parameters.component;
  }

  source = generateSvelteSource(component, args, context === null || context === void 0 ? void 0 : context.argTypes, slotProperty);
  return story;
};

exports.sourceDecorator = sourceDecorator;