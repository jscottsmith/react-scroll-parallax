/* eslint-disable prefer-destructuring */
import { start } from '@storybook/core/client';
import './globals';
import { renderToDOM, render } from './render';
const framework = 'react';
const api = start(renderToDOM, {
  render
});
export const storiesOf = (kind, m) => {
  return api.clientApi.storiesOf(kind, m).addParameters({
    framework
  });
};
export const configure = (...args) => api.configure(framework, ...args);
export const addDecorator = api.clientApi.addDecorator;
export const addParameters = api.clientApi.addParameters;
export const clearDecorators = api.clientApi.clearDecorators;
export const setAddon = api.clientApi.setAddon;
export const forceReRender = api.forceReRender;
export const getStorybook = api.clientApi.getStorybook;
export const raw = api.clientApi.raw;