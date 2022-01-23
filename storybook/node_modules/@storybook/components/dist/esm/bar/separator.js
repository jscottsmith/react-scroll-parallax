import React, { Fragment } from 'react';
import { styled } from '@storybook/theming';
export var Separator = styled.span(function (_ref) {
  var theme = _ref.theme;
  return {
    width: 1,
    height: 20,
    background: theme.appBorderColor,
    marginTop: 10,
    marginLeft: 6,
    marginRight: 2
  };
}, function (_ref2) {
  var force = _ref2.force;
  return force ? {} : {
    '& + &': {
      display: 'none'
    }
  };
});
Separator.displayName = 'Separator';
export var interleaveSeparators = function interleaveSeparators(list) {
  return list.reduce(function (acc, item, index) {
    return item ? /*#__PURE__*/React.createElement(Fragment, {
      key: item.id || item.key || "f-".concat(index)
    }, acc, index > 0 ? /*#__PURE__*/React.createElement(Separator, {
      key: "s-".concat(index)
    }) : null, item.render() || item) : acc;
  }, null);
};