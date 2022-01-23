import React from 'react'; // @ts-ignore

import HOC from './HOC.svelte';
export var prepareForInline = function prepareForInline(storyFn) {
  var el = React.useRef(null);
  React.useEffect(function () {
    var root = new HOC({
      target: el.current,
      props: {
        storyFn: storyFn
      }
    });
    return function () {
      return root.$destroy();
    };
  });
  return /*#__PURE__*/React.createElement('div', {
    ref: el
  });
};