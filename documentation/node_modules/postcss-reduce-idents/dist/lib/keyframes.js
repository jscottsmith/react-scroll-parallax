"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _postcssValueParser = _interopRequireDefault(require("postcss-value-parser"));

var _cache = _interopRequireDefault(require("./cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RESERVED_KEYWORDS = ['none', 'inherit', 'initial', 'unset'];

function _default() {
  let cache = {};
  let atRules = [];
  let decls = [];
  return {
    collect(node, encoder) {
      const {
        name,
        prop,
        type
      } = node;

      if (type === 'atrule' && /keyframes/i.test(name) && RESERVED_KEYWORDS.indexOf(node.params.toLowerCase()) === -1) {
        (0, _cache.default)(node.params, encoder, cache);
        atRules.push(node);
      }

      if (type === 'decl' && /animation/i.test(prop)) {
        decls.push(node);
      }
    },

    transform() {
      let referenced = []; // Iterate each property and change their names

      decls.forEach(decl => {
        decl.value = (0, _postcssValueParser.default)(decl.value).walk(node => {
          if (node.type === 'word' && node.value in cache) {
            if (!~referenced.indexOf(node.value)) {
              referenced.push(node.value);
            }

            cache[node.value].count++;
            node.value = cache[node.value].ident;
          }
        }).toString();
      }); // Iterate each at rule and change their name if references to them have been found

      atRules.forEach(rule => {
        const cached = cache[rule.params];

        if (cached && cached.count > 0 && !!~referenced.indexOf(rule.params)) {
          rule.params = cached.ident;
        }
      }); // reset cache after transform

      atRules = [];
      decls = [];
    }

  };
}

module.exports = exports.default;