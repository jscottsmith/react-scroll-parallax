import React from 'react';
import { EmptyBlock } from './EmptyBlock';
export default {
  title: 'Docs/EmptyBlock',
  component: EmptyBlock
};
export var Error = function Error() {
  return /*#__PURE__*/React.createElement(EmptyBlock, null, "Generic error message");
};
Error.displayName = "Error";