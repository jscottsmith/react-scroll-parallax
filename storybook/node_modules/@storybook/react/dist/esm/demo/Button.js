import React from 'react';
var styles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10
};

var Button = function Button(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: styles,
    type: "button"
  }, children);
};

Button.displayName = 'Button';
Button.defaultProps = {
  onClick: function onClick() {}
};
export default Button;