"use strict";

function _interopDefault(ex) {
  return ex && "object" == typeof ex && "default" in ex ? ex.default : ex;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var React = require("react"), useIsomorphicLayoutEffect = _interopDefault(require("use-isomorphic-layout-effect")), useLatest = function(value) {
  var ref = React.useRef(value);
  return useIsomorphicLayoutEffect((function() {
    ref.current = value;
  })), ref;
};

exports.default = useLatest;
