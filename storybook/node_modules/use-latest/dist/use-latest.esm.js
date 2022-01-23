import { useRef } from 'react';
import useIsomorphicLayoutEffect from 'use-isomorphic-layout-effect';

var useLatest = function useLatest(value) {
  var ref = useRef(value);
  useIsomorphicLayoutEffect(function () {
    ref.current = value;
  });
  return ref;
};

export default useLatest;
