'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var useIsomorphicLayoutEffect = _interopDefault(require('use-isomorphic-layout-effect'));

var useLatest = function useLatest(value) {
  var ref = React.useRef(value);
  useIsomorphicLayoutEffect(function () {
    ref.current = value;
  });
  return ref;
};

exports.default = useLatest;
