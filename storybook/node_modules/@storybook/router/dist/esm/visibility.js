import React from 'react';
export var ToggleVisibility = function ToggleVisibility(_ref) {
  var hidden = _ref.hidden,
      children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    hidden: hidden
  }, children);
};
ToggleVisibility.displayName = "ToggleVisibility";