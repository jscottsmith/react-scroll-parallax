import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.map.js";
import React from 'react';
import { styled } from '@storybook/theming';
import { storiesOf } from '@storybook/react';
import { Icons } from './icon';
import { icons } from './icons';
var Meta = styled.div({
  color: '#333',
  fontSize: 12
});
var Item = styled.div({
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
}, function (_ref) {
  var minimal = _ref.minimal;
  return minimal ? {
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
  } : {};
});
var List = styled.div({
  display: 'flex',
  flexFlow: 'row wrap'
});
var list = Object.keys(icons).sort();
storiesOf('Basics/Icon', module).add('labels', function () {
  return /*#__PURE__*/React.createElement(List, null, list.map(function (key) {
    return /*#__PURE__*/React.createElement(Item, {
      key: key
    }, /*#__PURE__*/React.createElement(Icons, {
      icon: key
    }), " ", /*#__PURE__*/React.createElement(Meta, null, key));
  }));
}).add('no labels', function () {
  return /*#__PURE__*/React.createElement(List, null, list.map(function (key) {
    return /*#__PURE__*/React.createElement(Item, {
      minimal: true,
      key: key
    }, /*#__PURE__*/React.createElement(Icons, {
      icon: key
    }));
  }));
});