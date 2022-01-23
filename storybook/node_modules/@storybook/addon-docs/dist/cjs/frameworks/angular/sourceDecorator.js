"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceDecorator = exports.skipSourceRender = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

var _addons = require("@storybook/addons");

var _renderer = require("@storybook/angular/renderer");

var _shared = require("../../shared");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var skipSourceRender = function skipSourceRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code


  return (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.CODE;
};

exports.skipSourceRender = skipSourceRender;
var prettyUpInternal;

var makePrettyUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var prettierHtml, prettier;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!prettyUpInternal) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", prettyUpInternal);

          case 2:
            _context.next = 4;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('prettier/parser-html'));
            });

          case 4:
            prettierHtml = _context.sent;
            _context.next = 7;
            return Promise.resolve().then(function () {
              return _interopRequireWildcard(require('prettier/standalone'));
            });

          case 7:
            prettier = _context.sent;

            prettyUpInternal = function prettyUpInternal(source) {
              return prettier.format(source, {
                parser: 'angular',
                plugins: [prettierHtml],
                htmlWhitespaceSensitivity: 'ignore'
              });
            };

            return _context.abrupt("return", prettyUpInternal);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function makePrettyUp() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Angular source decorator.
 * @param storyFn Fn
 * @param context  StoryContext
 */


var sourceDecorator = function sourceDecorator(storyFn, context) {
  var story = storyFn();

  if (skipSourceRender(context)) {
    return story;
  }

  var channel = _addons.addons.getChannel();

  var props = story.props,
      template = story.template,
      userDefinedTemplate = story.userDefinedTemplate;
  var component = context.component,
      argTypes = context.argTypes;
  var toEmit;
  var prettyUpPromise = makePrettyUp();
  (0, _addons.useEffect)(function () {
    prettyUpPromise.then(function (prettyUp) {
      if (toEmit) channel.emit(_shared.SNIPPET_RENDERED, context.id, prettyUp(toEmit));
    });
  });
  prettyUpPromise.then(function (prettyUp) {
    if (component && !userDefinedTemplate) {
      var _source = (0, _renderer.computesTemplateSourceFromComponent)(component, props, argTypes); // We might have a story with a Directive or Service defined as the component
      // In these cases there might exist a template, even if we aren't able to create source from component


      if (_source || template) {
        toEmit = prettyUp(_source || template);
      }
    } else if (template) {
      toEmit = prettyUp(template);
    }
  });
  return story;
};

exports.sourceDecorator = sourceDecorator;