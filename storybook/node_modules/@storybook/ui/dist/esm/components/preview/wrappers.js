import React, { Fragment } from 'react';
import { IframeWrapper } from './utils/components';
export var ApplyWrappers = function ApplyWrappers(_ref) {
  var wrappers = _ref.wrappers,
      id = _ref.id,
      storyId = _ref.storyId,
      active = _ref.active,
      children = _ref.children;
  return /*#__PURE__*/React.createElement(Fragment, null, wrappers.reduceRight(function (acc, wrapper, index) {
    return wrapper.render({
      index: index,
      children: acc,
      id: id,
      storyId: storyId,
      active: active
    });
  }, children));
};
ApplyWrappers.displayName = "ApplyWrappers";
export var defaultWrappers = [{
  render: function render(p) {
    return /*#__PURE__*/React.createElement(IframeWrapper, {
      id: "storybook-preview-wrapper",
      hidden: !p.active
    }, p.children);
  }
}];