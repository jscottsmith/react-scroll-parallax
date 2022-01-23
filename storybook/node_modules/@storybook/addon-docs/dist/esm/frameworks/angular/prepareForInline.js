import "regenerator-runtime/runtime.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from 'react';
import pLimit from 'p-limit';
import { nanoid } from 'nanoid';
import { rendererFactory } from '@storybook/angular/renderer';
var limit = pLimit(1);
/**
 * Uses the angular renderer to generate a story. Uses p-limit to run synchronously
 */

export var prepareForInline = function prepareForInline(storyFn, _ref) {
  var id = _ref.id,
      parameters = _ref.parameters,
      component = _ref.component;
  var el = React.useRef();
  React.useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              limit( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var renderer;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return rendererFactory.getRendererInstance("".concat(id, "-").concat(nanoid(10)).toLowerCase(), el.current);

                      case 2:
                        renderer = _context.sent;

                        if (!renderer) {
                          _context.next = 6;
                          break;
                        }

                        _context.next = 6;
                        return renderer.render({
                          forced: false,
                          component: component,
                          parameters: parameters,
                          storyFnAngular: storyFn(),
                          targetDOMNode: el.current
                        });

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  });
  return /*#__PURE__*/React.createElement('div', {
    ref: el
  });
};