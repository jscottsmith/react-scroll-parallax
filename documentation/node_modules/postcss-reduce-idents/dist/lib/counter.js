"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _postcssValueParser = _interopRequireWildcard(require("postcss-value-parser"));

var _cache = _interopRequireDefault(require("./cache"));

var _isNum = _interopRequireDefault(require("./isNum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const RESERVED_KEYWORDS = ['unset', 'initial', 'inherit', 'none'];

function _default() {
  let cache = {};
  let declOneCache = [];
  let declTwoCache = [];
  return {
    collect(node, encoder) {
      const {
        prop,
        type
      } = node;

      if (type !== 'decl') {
        return;
      }

      if (/counter-(reset|increment)/i.test(prop)) {
        node.value = (0, _postcssValueParser.default)(node.value).walk(child => {
          if (child.type === 'word' && !(0, _isNum.default)(child) && RESERVED_KEYWORDS.indexOf(child.value.toLowerCase()) === -1) {
            (0, _cache.default)(child.value, encoder, cache);
            child.value = cache[child.value].ident;
          }
        });
        declOneCache.push(node);
      } else if (/content/i.test(prop)) {
        declTwoCache.push(node);
      }
    },

    transform() {
      declTwoCache.forEach(decl => {
        decl.value = (0, _postcssValueParser.default)(decl.value).walk(node => {
          const {
            type
          } = node;
          const value = node.value.toLowerCase();

          if (type === 'function' && (value === 'counter' || value === 'counters')) {
            (0, _postcssValueParser.walk)(node.nodes, child => {
              if (child.type === 'word' && child.value in cache) {
                cache[child.value].count++;
                child.value = cache[child.value].ident;
              }
            });
          }

          if (type === 'space') {
            node.value = ' ';
          }

          return false;
        }).toString();
      });
      declOneCache.forEach(decl => {
        decl.value = decl.value.walk(node => {
          if (node.type === 'word' && !(0, _isNum.default)(node)) {
            Object.keys(cache).forEach(key => {
              const cached = cache[key];

              if (cached.ident === node.value && !cached.count) {
                node.value = key;
              }
            });
          }
        }).toString();
      }); // reset cache after transform

      declOneCache = [];
      declTwoCache = [];
    }

  };
}

module.exports = exports.default;