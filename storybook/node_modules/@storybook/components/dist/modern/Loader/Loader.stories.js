import React from 'react';
import { PureLoader as Loader } from './Loader';

const withBackground = storyFn => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(to right, rgba(56,56,56,1) 0%, rgba(0,0,0,1) 50%, rgba(255,255,255,1) 50%, rgba(224,224,224,1) 100%)'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    position: 'absolute',
    top: '50%',
    left: 0,
    height: '50vh',
    width: '100vw',
    background: 'linear-gradient(to right, red 0%, orangered 50%, blue 50%, deepskyblue 100%)'
  }
}), storyFn());

withBackground.displayName = "withBackground";
export default {
  title: 'Basics/Loader'
};
export const InfiniteState = () => /*#__PURE__*/React.createElement(Loader, {
  role: "progressbar"
});
InfiniteState.displayName = "InfiniteState";
InfiniteState.decorators = [withBackground];
export const SizeAdjusted = () => /*#__PURE__*/React.createElement(Loader, {
  size: 64,
  role: "progressbar"
});
SizeAdjusted.displayName = "SizeAdjusted";
SizeAdjusted.decorators = [withBackground];
export const ProgressBar = () => /*#__PURE__*/React.createElement(Loader, {
  progress: {
    value: 0.3,
    message: 'Building',
    modules: {
      complete: 500,
      total: 1337
    }
  }
});
ProgressBar.displayName = "ProgressBar";
export const ProgressError = () => /*#__PURE__*/React.createElement(Loader, {
  error: new Error('Connection closed')
});
ProgressError.displayName = "ProgressError";