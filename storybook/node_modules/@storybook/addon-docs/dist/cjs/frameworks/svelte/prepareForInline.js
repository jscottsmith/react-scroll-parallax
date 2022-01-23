"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareForInline = void 0;

var _react = _interopRequireDefault(require("react"));

var _HOC = _interopRequireDefault(require("./HOC.svelte"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
var prepareForInline = function prepareForInline(storyFn) {
  var el = _react.default.useRef(null);

  _react.default.useEffect(function () {
    var root = new _HOC.default({
      target: el.current,
      props: {
        storyFn: storyFn
      }
    });
    return function () {
      return root.$destroy();
    };
  });

  return /*#__PURE__*/_react.default.createElement('div', {
    ref: el
  });
};

exports.prepareForInline = prepareForInline;