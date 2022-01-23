import React from 'react';
import { storiesOf } from '@storybook/react';
import ListItem from './ListItem';
import { Icons } from '../icon/icon';
storiesOf('basics/Tooltip/ListItem', module).add('all', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ListItem, {
  loading: true
}), /*#__PURE__*/React.createElement(ListItem, {
  title: "Default"
}), /*#__PURE__*/React.createElement(ListItem, {
  title: "Default icon",
  right: /*#__PURE__*/React.createElement(Icons, {
    icon: "eye"
  })
}), /*#__PURE__*/React.createElement(ListItem, {
  left: "left",
  title: "title",
  center: "center",
  right: "right"
}), /*#__PURE__*/React.createElement(ListItem, {
  active: true,
  left: "left",
  title: "active",
  center: "center",
  right: "right"
}), /*#__PURE__*/React.createElement(ListItem, {
  active: true,
  left: "left",
  title: "active icon",
  center: "center",
  right: /*#__PURE__*/React.createElement(Icons, {
    icon: "eye"
  })
}), /*#__PURE__*/React.createElement(ListItem, {
  disabled: true,
  left: "left",
  title: "disabled",
  center: "center",
  right: "right"
}))).add('loading', () => /*#__PURE__*/React.createElement(ListItem, {
  loading: true
})).add('default', () => /*#__PURE__*/React.createElement(ListItem, {
  title: "Default"
})).add('default icon', () => /*#__PURE__*/React.createElement(ListItem, {
  title: "Default icon",
  right: /*#__PURE__*/React.createElement(Icons, {
    icon: "eye"
  })
})).add('active icon', () => /*#__PURE__*/React.createElement(ListItem, {
  active: true,
  title: "active icon",
  right: /*#__PURE__*/React.createElement(Icons, {
    icon: "eye"
  })
})).add('w/positions', () => /*#__PURE__*/React.createElement(ListItem, {
  left: "left",
  title: "title",
  center: "center",
  right: "right"
})).add('w/positions active', () => /*#__PURE__*/React.createElement(ListItem, {
  active: true,
  left: "left",
  title: "active",
  center: "center",
  right: "right"
})).add('disabled', () => /*#__PURE__*/React.createElement(ListItem, {
  disabled: true,
  left: "left",
  title: "disabled",
  center: "center",
  right: "right"
}));