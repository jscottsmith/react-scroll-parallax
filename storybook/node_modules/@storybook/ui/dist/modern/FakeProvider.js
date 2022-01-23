import React from 'react';
import { styled } from '@storybook/theming';
import { addons } from '@storybook/addons';
import Provider from './provider';
export class FakeProvider extends Provider {
  constructor() {
    super(); // @ts-ignore

    this.addons = addons; // @ts-ignore

    this.channel = {
      on: () => {},
      off: () => {},
      emit: () => {},
      addListener: () => {},
      removeListener: () => {}
    };
  } // @ts-ignore


  getElements(type) {
    return addons.getElements(type);
  }

  renderPreview() {
    return /*#__PURE__*/React.createElement("div", null, "This is from a 'renderPreview' call from FakeProvider");
  } // @ts-ignore


  handleAPI(api) {
    addons.loadAddons(api);
  } // @ts-ignore


  getConfig() {
    return {};
  }

}
export const Centered = styled.div({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
});
export class PrettyFakeProvider extends FakeProvider {
  renderPreview(...args) {
    return /*#__PURE__*/React.createElement(Centered, null, "This is from a 'renderPreview' call from FakeProvider", /*#__PURE__*/React.createElement("hr", null), "'renderPreview' was called with:", /*#__PURE__*/React.createElement("pre", null, JSON.stringify(args, null, 2)));
  }

}