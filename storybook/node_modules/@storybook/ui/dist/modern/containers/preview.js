function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import global from 'global';
import React from 'react';
import { Consumer, isRoot, isGroup, isStory } from '@storybook/api';
import { Preview } from '../components/preview/preview';
const {
  PREVIEW_URL
} = global;

const splitTitleAddExtraSpace = input => input.split('/').join(' / ').replace(/\s\s/, ' ');

const getDescription = item => {
  if (isRoot(item)) {
    return item.name ? `${item.name} ⋅ Storybook` : 'Storybook';
  }

  if (isGroup(item)) {
    return item.name ? `${item.name} ⋅ Storybook` : 'Storybook';
  }

  if (isStory(item)) {
    const {
      kind,
      name
    } = item;
    return kind && name ? splitTitleAddExtraSpace(`${kind} - ${name} ⋅ Storybook`) : 'Storybook';
  }

  return 'Storybook';
};

const mapper = ({
  api,
  state
}) => {
  const {
    layout,
    location,
    customQueryParams,
    storyId,
    refs,
    viewMode,
    path,
    refId
  } = state;
  const story = api.getData(storyId, refId);
  const docsOnly = story && story.parameters ? !!story.parameters.docsOnly : false;
  return {
    api,
    story,
    options: layout,
    description: getDescription(story),
    viewMode,
    path,
    refs,
    storyId,
    baseUrl: PREVIEW_URL || 'iframe.html',
    queryParams: customQueryParams,
    docsOnly,
    location
  };
};

const PreviewConnected = /*#__PURE__*/React.memo(props => /*#__PURE__*/React.createElement(Consumer, {
  filter: mapper
}, fromState => /*#__PURE__*/React.createElement(Preview, _extends({}, props, fromState))));
export default PreviewConnected;