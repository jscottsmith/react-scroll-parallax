import React from 'react';
const styles = {
  border: '1px solid #eee',
  borderRadius: 3,
  backgroundColor: '#FFFFFF',
  cursor: 'pointer',
  fontSize: 15,
  padding: '3px 10px',
  margin: 10
};

const Button = ({
  children,
  onClick
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  style: styles,
  type: "button"
}, children);

Button.displayName = 'Button';
Button.defaultProps = {
  onClick: () => {}
};
export default Button;