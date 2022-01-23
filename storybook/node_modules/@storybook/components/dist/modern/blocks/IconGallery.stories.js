import React from 'react';
import { IconItem, IconGallery } from './IconGallery';
import { Icons as ExampleIcon } from '../icon/icon';
export default {
  title: 'Docs/IconGallery',
  component: IconGallery
};
export const DefaultStyle = () => /*#__PURE__*/React.createElement(IconGallery, null, /*#__PURE__*/React.createElement(IconItem, {
  name: "add"
}, /*#__PURE__*/React.createElement(ExampleIcon, {
  icon: "add"
})), /*#__PURE__*/React.createElement(IconItem, {
  name: "subtract"
}, /*#__PURE__*/React.createElement(ExampleIcon, {
  icon: "subtract"
})), /*#__PURE__*/React.createElement(IconItem, {
  name: "home"
}, /*#__PURE__*/React.createElement(ExampleIcon, {
  icon: "home"
})), /*#__PURE__*/React.createElement(IconItem, {
  name: "facehappy"
}, /*#__PURE__*/React.createElement(ExampleIcon, {
  icon: "facehappy"
})), /*#__PURE__*/React.createElement(IconItem, {
  name: "bar"
}, /*#__PURE__*/React.createElement("img", {
  src: "https://place-hold.it/50x50",
  alt: "example"
})), /*#__PURE__*/React.createElement(IconItem, {
  name: "bar"
}, /*#__PURE__*/React.createElement("img", {
  src: "https://place-hold.it/50x50",
  alt: "example"
})));
DefaultStyle.displayName = "DefaultStyle";