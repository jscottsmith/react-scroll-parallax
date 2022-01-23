import "core-js/modules/es.array.reduce-right.js";
import React, { Fragment } from 'react';
import { IframeWrapper } from './utils/components';
export const ApplyWrappers = ({
  wrappers,
  id,
  storyId,
  active,
  children
}) => {
  return /*#__PURE__*/React.createElement(Fragment, null, wrappers.reduceRight((acc, wrapper, index) => wrapper.render({
    index,
    children: acc,
    id,
    storyId,
    active
  }), children));
};
ApplyWrappers.displayName = "ApplyWrappers";
export const defaultWrappers = [{
  render: p => /*#__PURE__*/React.createElement(IframeWrapper, {
    id: "storybook-preview-wrapper",
    hidden: !p.active
  }, p.children)
}];