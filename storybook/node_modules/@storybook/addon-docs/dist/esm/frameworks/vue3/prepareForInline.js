import React from 'react';
import * as Vue from 'vue';
import { app } from '@storybook/vue3'; // This is cast as `any` to workaround type errors caused by Vue 2 types

var _ref = Vue,
    render = _ref.render,
    h = _ref.h;
export var prepareForInline = function prepareForInline(storyFn, _ref2) {
  var args = _ref2.args;
  var component = storyFn();
  var vnode = h(component, args); // By attaching the app context from `@storybook/vue3` to the vnode
  // like this, these stoeis are able to access any app config stuff
  // the end-user set inside `.storybook/preview.js`

  vnode.appContext = app._context; // eslint-disable-line no-underscore-dangle

  return /*#__PURE__*/React.createElement('div', {
    ref: function ref(node) {
      return node ? render(vnode, node) : null;
    }
  });
};