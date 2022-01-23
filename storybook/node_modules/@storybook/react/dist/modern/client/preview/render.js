import global from 'global';
import React, { Component as ReactComponent, StrictMode, Fragment } from 'react';
import ReactDOM from 'react-dom';
const {
  FRAMEWORK_OPTIONS
} = global;
export const render = (args, context) => {
  const {
    id,
    component: Component
  } = context;

  if (!Component) {
    throw new Error(`Unable to render story ${id} as the component annotation is missing from the default export`);
  }

  return /*#__PURE__*/React.createElement(Component, args);
};

const renderElement = async (node, el) => new Promise(resolve => {
  ReactDOM.render(node, el, () => resolve(null));
});

class ErrorBoundary extends ReactComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidMount() {
    const {
      hasError
    } = this.state;
    const {
      showMain
    } = this.props;

    if (!hasError) {
      showMain();
    }
  }

  componentDidCatch(err) {
    const {
      showException
    } = this.props; // message partially duplicates stack, strip it

    showException(err);
  }

  render() {
    const {
      hasError
    } = this.state;
    const {
      children
    } = this.props;
    return hasError ? null : children;
  }

}

const Wrapper = FRAMEWORK_OPTIONS !== null && FRAMEWORK_OPTIONS !== void 0 && FRAMEWORK_OPTIONS.strictMode ? StrictMode : Fragment;
export async function renderToDOM({
  storyContext,
  unboundStoryFn,
  showMain,
  showException,
  forceRemount
}, domElement) {
  const Story = unboundStoryFn;
  const content = /*#__PURE__*/React.createElement(ErrorBoundary, {
    showMain: showMain,
    showException: showException
  }, /*#__PURE__*/React.createElement(Story, storyContext)); // For React 15, StrictMode & Fragment doesn't exists.

  const element = Wrapper ? /*#__PURE__*/React.createElement(Wrapper, null, content) : content; // In most cases, we need to unmount the existing set of components in the DOM node.
  // Otherwise, React may not recreate instances for every story run.
  // This could leads to issues like below:
  // https://github.com/storybookjs/react-storybook/issues/81
  // (This is not the case when we change args or globals to the story however)

  if (forceRemount) {
    ReactDOM.unmountComponentAtNode(domElement);
  }

  await renderElement(element, domElement);
}