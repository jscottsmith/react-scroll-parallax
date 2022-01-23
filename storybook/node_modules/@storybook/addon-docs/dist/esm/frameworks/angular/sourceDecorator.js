import "regenerator-runtime/runtime.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { addons, useEffect } from '@storybook/addons';
import { computesTemplateSourceFromComponent } from '@storybook/angular/renderer';
import { SNIPPET_RENDERED, SourceType } from '../../shared';
export var skipSourceRender = function skipSourceRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code


  return (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.CODE;
};
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
            return import('prettier/parser-html');

          case 4:
            prettierHtml = _context.sent;
            _context.next = 7;
            return import('prettier/standalone');

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


export var sourceDecorator = function sourceDecorator(storyFn, context) {
  var story = storyFn();

  if (skipSourceRender(context)) {
    return story;
  }

  var channel = addons.getChannel();
  var props = story.props,
      template = story.template,
      userDefinedTemplate = story.userDefinedTemplate;
  var component = context.component,
      argTypes = context.argTypes;
  var toEmit;
  var prettyUpPromise = makePrettyUp();
  useEffect(function () {
    prettyUpPromise.then(function (prettyUp) {
      if (toEmit) channel.emit(SNIPPET_RENDERED, context.id, prettyUp(toEmit));
    });
  });
  prettyUpPromise.then(function (prettyUp) {
    if (component && !userDefinedTemplate) {
      var _source = computesTemplateSourceFromComponent(component, props, argTypes); // We might have a story with a Directive or Service defined as the component
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