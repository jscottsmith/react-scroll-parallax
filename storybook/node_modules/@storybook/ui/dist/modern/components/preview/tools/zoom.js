import React, { Component, useCallback } from 'react';
import { Icons, IconButton, Separator } from '@storybook/components';
const initialZoom = 1;
const Context = /*#__PURE__*/React.createContext({
  value: initialZoom,
  set: v => {}
});

class ZoomProvider extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      value: initialZoom
    };

    this.set = value => this.setState({
      value
    });
  }

  render() {
    const {
      children,
      shouldScale
    } = this.props;
    const {
      set
    } = this;
    const {
      value
    } = this.state;
    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: {
        value: shouldScale ? value : initialZoom,
        set
      }
    }, children);
  }

}

ZoomProvider.displayName = "ZoomProvider";
const {
  Consumer: ZoomConsumer
} = Context;
const Zoom = /*#__PURE__*/React.memo(({
  zoomIn,
  zoomOut,
  reset
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
  key: "zoomin",
  onClick: zoomIn,
  title: "Zoom in"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "zoom"
})), /*#__PURE__*/React.createElement(IconButton, {
  key: "zoomout",
  onClick: zoomOut,
  title: "Zoom out"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "zoomout"
})), /*#__PURE__*/React.createElement(IconButton, {
  key: "zoomreset",
  onClick: reset,
  title: "Reset zoom"
}, /*#__PURE__*/React.createElement(Icons, {
  icon: "zoomreset"
}))));
export { Zoom, ZoomConsumer, ZoomProvider };
const ZoomWrapper = /*#__PURE__*/React.memo(({
  set,
  value
}) => {
  const zoomIn = useCallback(e => {
    e.preventDefault();
    set(0.8 * value);
  }, [set, value]);
  const zoomOut = useCallback(e => {
    e.preventDefault();
    set(1.25 * value);
  }, [set, value]);
  const reset = useCallback(e => {
    e.preventDefault();
    set(initialZoom);
  }, [set, initialZoom]);
  return /*#__PURE__*/React.createElement(Zoom, {
    key: "zoom",
    zoomIn,
    zoomOut,
    reset
  });
});
export const zoomTool = {
  title: 'zoom',
  id: 'zoom',
  match: ({
    viewMode
  }) => viewMode === 'story',
  render: /*#__PURE__*/React.memo(() => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ZoomConsumer, null, ({
    set,
    value
  }) => /*#__PURE__*/React.createElement(ZoomWrapper, {
    set,
    value
  })), /*#__PURE__*/React.createElement(Separator, null)))
};