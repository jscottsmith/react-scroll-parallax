import React from 'react';
import { render } from 'lit-html';
export const prepareForInline = storyFn => {
  class Story extends React.Component {
    constructor(...args) {
      super(...args);
      this.wrapperRef = /*#__PURE__*/React.createRef();
    }

    componentDidMount() {
      render(storyFn(), this.wrapperRef.current);
    }

    render() {
      return /*#__PURE__*/React.createElement('div', {
        ref: this.wrapperRef
      });
    }

  }

  return /*#__PURE__*/React.createElement(Story);
};