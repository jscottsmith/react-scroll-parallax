import global from 'global';
import React from 'react';
import { IconButton, Icons } from '@storybook/components';
import { Consumer } from '@storybook/api';
import { stringifyQueryParams } from '../utils/stringifyQueryParams';
const {
  PREVIEW_URL
} = global;

const ejectMapper = ({
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

export const ejectTool = {
  title: 'eject',
  id: 'eject',
  match: ({
    viewMode
  }) => viewMode === 'story',
  render: () => /*#__PURE__*/React.createElement(Consumer, {
    filter: ejectMapper
  }, ({
    baseUrl,
    storyId,
    queryParams
  }) => storyId ? /*#__PURE__*/React.createElement(IconButton, {
    key: "opener",
    href: `${baseUrl}?id=${storyId}${stringifyQueryParams(queryParams)}`,
    target: "_blank",
    title: "Open canvas in new tab"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "sharealt"
  })) : null)
};