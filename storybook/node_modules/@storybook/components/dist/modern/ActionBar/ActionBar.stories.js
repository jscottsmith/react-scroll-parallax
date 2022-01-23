import React from 'react';
import { action } from '@storybook/addon-actions';
import { ActionBar } from './ActionBar';
const action1 = action('action1');
const action2 = action('action2');
const action3 = action('action3');
export default {
  component: ActionBar,
  title: 'Basics/ActionBar',
  decorators: [storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '300px',
      height: '64px',
      margin: '1rem',
      background: 'papayawhip',
      border: '1px solid rgba(0,0,0,.05)'
    }
  }, storyFn())]
};
export const SingleItem = () => /*#__PURE__*/React.createElement(ActionBar, {
  actionItems: [{
    title: 'Clear',
    onClick: action1
  }]
});
SingleItem.displayName = "SingleItem";
export const ManyItems = () => /*#__PURE__*/React.createElement(ActionBar, {
  actionItems: [{
    title: 'Action string',
    onClick: action1
  }, {
    title: /*#__PURE__*/React.createElement("div", null, "Action node"),
    onClick: action2
  }, {
    title: 'Long action string',
    className: 'long-action-button',
    onClick: action3
  }]
});
ManyItems.displayName = "ManyItems";