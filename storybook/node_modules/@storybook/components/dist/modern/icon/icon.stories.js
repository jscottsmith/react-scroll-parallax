import React from 'react';
import { styled } from '@storybook/theming';
import { storiesOf } from '@storybook/react';
import { Icons } from './icon';
import { icons } from './icons';
const Meta = styled.div({
  color: '#333',
  fontSize: 12
});
const Item = styled.div({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '0 1 20%',
  minWidth: 120,
  padding: '0px 7.5px 20px',
  '& svg': {
    marginRight: 10,
    width: 24,
    height: 24
  }
}, ({
  minimal
}) => minimal ? {
  flex: 'none',
  minWidth: 'auto',
  padding: 0,
  background: '#fff',
  border: '1px solid #666',
  '& svg': {
    display: 'block',
    marginRight: 0,
    width: 48,
    height: 48
  }
} : {});
const List = styled.div({
  display: 'flex',
  flexFlow: 'row wrap'
});
const list = Object.keys(icons).sort();
storiesOf('Basics/Icon', module).add('labels', () => /*#__PURE__*/React.createElement(List, null, list.map(key => /*#__PURE__*/React.createElement(Item, {
  key: key
}, /*#__PURE__*/React.createElement(Icons, {
  icon: key
}), " ", /*#__PURE__*/React.createElement(Meta, null, key))))).add('no labels', () => /*#__PURE__*/React.createElement(List, null, list.map(key => /*#__PURE__*/React.createElement(Item, {
  minimal: true,
  key: key
}, /*#__PURE__*/React.createElement(Icons, {
  icon: key
})))));