import React from 'react';
import * as Vue from 'vue';
import { app } from '@storybook/vue3'; // This is cast as `any` to workaround type errors caused by Vue 2 types

const {
  render,
  h
} = Vue;
export const prepareForInline = (storyFn, {
  args
}) => {
  const component = storyFn();
  const vnode = h(component, args); // By attaching the app context from `@storybook/vue3` to the vnode
  // like this, these stoeis are able to access any app config stuff
  // the end-user set inside `.storybook/preview.js`

  vnode.appContext = app._context; // eslint-disable-line no-underscore-dangle

  return /*#__PURE__*/React.createElement('div', {
    ref: node => node ? render(vnode, node) : null
  });
};