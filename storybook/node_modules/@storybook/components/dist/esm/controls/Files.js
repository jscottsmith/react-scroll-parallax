import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/web.url.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.from.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
import { getControlId } from './helpers';
var FileInput = styled(Form.Input)({
  padding: 10
});

function revokeOldUrls(urls) {
  urls.forEach(function (url) {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
}

export var FilesControl = function FilesControl(_ref) {
  var onChange = _ref.onChange,
      name = _ref.name,
      _ref$accept = _ref.accept,
      accept = _ref$accept === void 0 ? 'image/*' : _ref$accept,
      value = _ref.value;

  function handleFileChange(e) {
    if (!e.target.files) {
      return;
    }

    var fileUrls = Array.from(e.target.files).map(function (file) {
      return URL.createObjectURL(file);
    });
    onChange(fileUrls);
    revokeOldUrls(value);
  }

  return /*#__PURE__*/React.createElement(FileInput, {
    id: getControlId(name),
    type: "file",
    name: name,
    multiple: true,
    onChange: handleFileChange,
    accept: accept,
    size: "flex"
  });
};
FilesControl.displayName = "FilesControl";