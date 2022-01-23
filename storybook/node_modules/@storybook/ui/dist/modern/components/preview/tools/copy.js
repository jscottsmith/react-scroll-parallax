import global from 'global';
import React from 'react';
import copy from 'copy-to-clipboard';
import { IconButton, Icons } from '@storybook/components';
import { Consumer } from '@storybook/api';
import { stringifyQueryParams } from '../utils/stringifyQueryParams';
const {
  PREVIEW_URL
} = global;

const copyMapper = ({
  state
}) => {
  const {
    storyId,
    refId,
    refs
  } = state;
  const ref = refs[refId];
  return {
    refId,
    baseUrl: ref ? `${ref.url}/iframe.html` : PREVIEW_URL || 'iframe.html',
    storyId,
    queryParams: state.customQueryParams
  };
};

export const copyTool = {
  title: 'copy',
  id: 'copy',
  match: ({
    viewMode
  }) => viewMode === 'story',
  render: () => /*#__PURE__*/React.createElement(Consumer, {
    filter: copyMapper
  }, ({
    baseUrl,
    storyId,
    queryParams
  }) => storyId ? /*#__PURE__*/React.createElement(IconButton, {
    key: "copy",
    onClick: () => copy(`${baseUrl}?id=${storyId}${stringifyQueryParams(queryParams)}`),
    title: "Copy canvas link"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "link"
  })) : null)
};