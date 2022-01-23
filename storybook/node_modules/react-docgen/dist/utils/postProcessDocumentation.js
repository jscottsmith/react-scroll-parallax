"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function postProcessProps(props) {
  // props with default values should not be required
  Object.keys(props).forEach(prop => {
    const propInfo = props[prop];

    if (propInfo.defaultValue) {
      propInfo.required = false;
    }
  });
}

function _default(documentation) {
  const props = documentation.props;

  if (props) {
    postProcessProps(props);
  }

  return documentation;
}