import React from 'react';
import { styled } from '@storybook/theming';
import { Form } from '../form';
import { getControlId } from './helpers';
const FileInput = styled(Form.Input)({
  padding: 10
});

function revokeOldUrls(urls) {
  urls.forEach(url => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  });
}

export const FilesControl = ({
  onChange,
  name,
  accept = 'image/*',
  value
}) => {
  function handleFileChange(e) {
    if (!e.target.files) {
      return;
    }

    const fileUrls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
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