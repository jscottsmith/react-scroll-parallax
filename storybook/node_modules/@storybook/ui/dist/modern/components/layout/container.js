function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* eslint-disable react/no-did-update-set-state */
import React, { Component, Fragment } from 'react';
import { styled, withTheme } from '@storybook/theming';
import * as persistence from './persist';
import { Draggable, Handle } from './draggers';
const MIN_NAV_WIDTH = 200; // visually there's an additional 10px due to the canvas' left margin

const MIN_CANVAS_WIDTH = 200; // visually it's 10px less due to the canvas' left margin

const MIN_CANVAS_HEIGHT = 200; // visually it's 50px less due to the canvas toolbar and top margin

const MIN_PANEL_WIDTH = 200; // visually it's 10px less due to the canvas' right margin

const MIN_PANEL_HEIGHT = 200; // visually it's 50px less due to the panel toolbar and bottom margin

const DEFAULT_NAV_WIDTH = 220;
const DEFAULT_PANEL_WIDTH = 400;
const Pane = styled.div({
  position: 'absolute',
  boxSizing: 'border-box',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}, ({
  hidden
}) => hidden ? {
  opacity: 0
} : {
  opacity: 1
}, ({
  top
}) => top ? {
  zIndex: 9
} : {}, ({
  border,
  theme
}) => {
  switch (border) {
    case 'left':
      {
        return {
          borderLeft: `1px solid ${theme.appBorderColor}`
        };
      }

    case 'right':
      {
        return {
          borderRight: `1px solid ${theme.appBorderColor}`
        };
      }

    case 'top':
      {
        return {
          borderTop: `1px solid ${theme.appBorderColor}`
        };
      }

    case 'bottom':
      {
        return {
          borderBottom: `1px solid ${theme.appBorderColor}`
        };
      }

    default:
      {
        return {};
      }
  }
}, ({
  animate
}) => animate ? {
  transition: ['width', 'height', 'top', 'left', 'background', 'opacity', 'transform'].map(p => `${p} 0.1s ease-out`).join(',')
} : {});
const Paper = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}, ({
  isFullscreen,
  theme
}) => isFullscreen ? {
  boxShadow: 'none',
  borderRadius: 0
} : {
  borderRadius: theme.appBorderRadius,
  overflow: 'hidden',
  boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1)'
});
export const Sidebar = (_ref) => {
  let {
    hidden = false,
    children,
    position = undefined
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["hidden", "children", "position"]);

  return hidden ? null : /*#__PURE__*/React.createElement(Pane, _extends({
    style: position
  }, props), children);
};
export const Main = (_ref2) => {
  let {
    isFullscreen = false,
    children,
    position = undefined
  } = _ref2,
      props = _objectWithoutPropertiesLoose(_ref2, ["isFullscreen", "children", "position"]);

  return /*#__PURE__*/React.createElement(Pane, _extends({
    style: position,
    top: true
  }, props, {
    role: "main"
  }), /*#__PURE__*/React.createElement(Paper, {
    isFullscreen: isFullscreen
  }, children));
};
Main.displayName = "Main";
export const Preview = (_ref3) => {
  let {
    hidden = false,
    children,
    position = undefined
  } = _ref3,
      props = _objectWithoutPropertiesLoose(_ref3, ["hidden", "children", "position"]);

  return /*#__PURE__*/React.createElement(Pane, _extends({
    style: position,
    top: true,
    hidden: hidden
  }, props), children);
};
Preview.displayName = "Preview";
export const Panel = (_ref4) => {
  let {
    hidden = false,
    children,
    position = undefined,
    align = 'right'
  } = _ref4,
      props = _objectWithoutPropertiesLoose(_ref4, ["hidden", "children", "position", "align"]);

  return /*#__PURE__*/React.createElement(Pane, _extends({
    style: position,
    hidden: hidden
  }, props, {
    border: align === 'bottom' ? 'top' : 'left'
  }), children);
};
Panel.displayName = "Panel";
const HoverBlocker = styled.div({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 15,
  height: '100vh',
  width: '100vw'
});

const getPreviewPosition = ({
  panelPosition,
  isPanelHidden,
  isNavHidden,
  isFullscreen,
  bounds,
  resizerPanel,
  resizerNav,
  margin
}) => {
  if (isFullscreen || isPanelHidden) {
    return {};
  }

  const navX = isNavHidden ? 0 : resizerNav.x;
  const panelX = resizerPanel.x;
  const panelY = resizerPanel.y;
  return panelPosition === 'bottom' ? {
    height: panelY - margin,
    left: 0,
    top: 0,
    width: bounds.width - navX - 2 * margin
  } : {
    height: bounds.height - 2 * margin,
    left: 0,
    top: 0,
    width: panelX - navX - margin
  };
};

const getMainPosition = ({
  bounds,
  resizerNav,
  isNavHidden,
  isFullscreen,
  margin
}) => {
  if (isFullscreen) {
    return {};
  }

  const navX = isNavHidden ? 0 : resizerNav.x;
  return {
    height: bounds.height - margin * 2,
    left: navX + margin,
    top: margin,
    width: bounds.width - navX - margin * 2
  };
};

const getPanelPosition = ({
  isPanelBottom,
  isPanelHidden,
  isNavHidden,
  bounds,
  resizerPanel,
  resizerNav,
  margin
}) => {
  const navX = isNavHidden ? 0 : resizerNav.x;
  const panelX = resizerPanel.x;
  const panelY = resizerPanel.y;

  if (isPanelBottom && isPanelHidden) {
    return {
      height: bounds.height - panelY - margin,
      left: 0,
      top: panelY - margin,
      width: bounds.width - navX - 2 * margin
    };
  }

  if (!isPanelBottom && isPanelHidden) {
    return {
      height: bounds.height - 2 * margin,
      left: panelX - navX - margin,
      top: 0,
      width: bounds.width - panelX - margin
    };
  }

  return isPanelBottom ? {
    height: bounds.height - panelY - margin,
    left: 0,
    top: panelY - margin,
    width: bounds.width - navX - 2 * margin
  } : {
    height: bounds.height - 2 * margin,
    left: panelX - navX - margin,
    top: 0,
    width: bounds.width - panelX - margin
  };
};

class Layout extends Component {
  constructor(props) {
    super(props);

    this.resizeNav = (e, data) => {
      if (data.deltaX) {
        this.setState({
          resizerNav: {
            x: data.x,
            y: data.y
          }
        });
      }
    };

    this.resizePanel = (e, data) => {
      const {
        options
      } = this.props;

      if (data.deltaY && options.panelPosition === 'bottom' || data.deltaX && options.panelPosition === 'right') {
        this.setState({
          resizerPanel: {
            x: data.x,
            y: data.y
          }
        });
      }
    };

    this.setDragNav = () => {
      this.setState({
        isDragging: 'nav'
      });
    };

    this.setDragPanel = () => {
      this.setState({
        isDragging: 'panel'
      });
    };

    this.unsetDrag = () => {
      this.setState({
        isDragging: false
      });
    };

    const {
      bounds,
      options: _options
    } = props;
    const {
      resizerNav,
      resizerPanel
    } = persistence.get();
    this.state = {
      isDragging: false,
      resizerNav: resizerNav || {
        x: DEFAULT_NAV_WIDTH,
        y: 0
      },
      resizerPanel: resizerPanel || (_options.panelPosition === 'bottom' ? {
        x: 0,
        y: Math.round(bounds.height * 0.6)
      } : {
        x: bounds.width - DEFAULT_PANEL_WIDTH,
        y: 0
      })
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {
      bounds,
      options
    } = props;
    const {
      resizerPanel,
      resizerNav
    } = state;
    const isNavHidden = options.isFullscreen || !options.showNav;
    const isPanelHidden = options.isFullscreen || !options.showPanel;
    const {
      panelPosition
    } = options;
    const isPanelRight = panelPosition === 'right';
    const isPanelBottom = panelPosition === 'bottom';
    const navX = resizerNav.x;
    const panelX = resizerPanel.x;
    const panelY = resizerPanel.y;
    const mutation = {};

    if (!isNavHidden) {
      const minPanelWidth = !isPanelHidden && isPanelRight ? MIN_PANEL_WIDTH : 0;
      const minMainWidth = MIN_CANVAS_WIDTH + minPanelWidth;
      const maxNavX = bounds.width - minMainWidth;
      const minNavX = MIN_NAV_WIDTH; // coordinate translates directly to width here

      if (navX > maxNavX) {
        // upper bound
        mutation.resizerNav = {
          x: maxNavX,
          y: 0
        };
      } else if (navX < minNavX || maxNavX < minNavX) {
        // lower bound, supercedes upper bound if needed
        mutation.resizerNav = {
          x: minNavX,
          y: 0
        };
      }
    }

    if (isPanelRight && !isPanelHidden) {
      const maxPanelX = bounds.width - MIN_PANEL_WIDTH;
      const minPanelX = navX + MIN_CANVAS_WIDTH;

      if (panelX > maxPanelX || panelX === 0) {
        // upper bound or when switching orientation
        mutation.resizerPanel = {
          x: maxPanelX,
          y: 0
        };
      } else if (panelX < minPanelX) {
        // lower bound
        mutation.resizerPanel = {
          x: minPanelX,
          y: 0
        };
      }
    }

    if (isPanelBottom && !isPanelHidden) {
      const maxPanelY = bounds.height - MIN_PANEL_HEIGHT;

      if (panelY > maxPanelY || panelY === 0) {
        // lower bound or when switching orientation
        mutation.resizerPanel = {
          x: 0,
          y: bounds.height - 200
        };
      } // upper bound is enforced by the Draggable's bounds

    }

    return mutation.resizerPanel || mutation.resizerNav ? Object.assign({}, state, mutation) : state;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      resizerPanel,
      resizerNav
    } = this.state;
    persistence.set({
      resizerPanel,
      resizerNav
    });
    const {
      width: prevWidth,
      height: prevHeight
    } = prevProps.bounds;
    const {
      bounds,
      options
    } = this.props;
    const {
      width,
      height
    } = bounds;

    if (width !== prevWidth || height !== prevHeight) {
      const {
        panelPosition
      } = options;
      const isPanelBottom = panelPosition === 'bottom';

      if (isPanelBottom) {
        this.setState({
          resizerPanel: {
            x: prevState.resizerPanel.x,
            y: prevState.resizerPanel.y - (prevHeight - height)
          }
        });
      } else {
        this.setState({
          resizerPanel: {
            x: prevState.resizerPanel.x - (prevWidth - width),
            y: prevState.resizerPanel.y
          }
        });
      }
    }
  }

  render() {
    const {
      children,
      bounds,
      options,
      theme,
      viewMode,
      docsOnly,
      panelCount
    } = this.props;
    const {
      isDragging,
      resizerNav,
      resizerPanel
    } = this.state;
    const margin = theme.layoutMargin;
    const isNavHidden = options.isFullscreen || !options.showNav;
    const isPanelHidden = options.isFullscreen || !options.showPanel || docsOnly || viewMode !== 'story' || panelCount === 0;
    const isFullscreen = options.isFullscreen || isNavHidden && isPanelHidden;
    const {
      isToolshown
    } = options;
    const {
      panelPosition
    } = options;
    const isPanelBottom = panelPosition === 'bottom';
    const isPanelRight = panelPosition === 'right';
    const panelX = resizerPanel.x;
    const navX = resizerNav.x;
    return bounds ? /*#__PURE__*/React.createElement(Fragment, null, isNavHidden ? null : /*#__PURE__*/React.createElement(Draggable, {
      axis: "x",
      position: resizerNav,
      bounds: {
        left: MIN_NAV_WIDTH,
        top: 0,
        right: isPanelRight && !isPanelHidden ? panelX - MIN_CANVAS_WIDTH : bounds.width - MIN_CANVAS_WIDTH,
        bottom: 0
      },
      onStart: this.setDragNav,
      onDrag: this.resizeNav,
      onStop: this.unsetDrag
    }, /*#__PURE__*/React.createElement(Handle, {
      axis: "x",
      isDragging: isDragging === 'nav'
    })), isPanelHidden ? null : /*#__PURE__*/React.createElement(Draggable, {
      axis: isPanelBottom ? 'y' : 'x',
      position: resizerPanel,
      bounds: isPanelBottom ? {
        left: 0,
        top: MIN_CANVAS_HEIGHT,
        right: 0,
        bottom: bounds.height - MIN_PANEL_HEIGHT
      } : {
        left: isNavHidden ? MIN_CANVAS_WIDTH : navX + MIN_CANVAS_WIDTH,
        top: 0,
        right: bounds.width - MIN_PANEL_WIDTH,
        bottom: 0
      },
      onStart: this.setDragPanel,
      onDrag: this.resizePanel,
      onStop: this.unsetDrag
    }, /*#__PURE__*/React.createElement(Handle, {
      isDragging: isDragging === 'panel',
      style: isPanelBottom ? {
        left: navX + margin,
        width: bounds.width - navX - 2 * margin,
        marginTop: -margin
      } : {
        marginLeft: -margin
      },
      axis: isPanelBottom ? 'y' : 'x'
    })), isDragging ? /*#__PURE__*/React.createElement(HoverBlocker, null) : null, children({
      mainProps: {
        viewMode,
        animate: !isDragging,
        isFullscreen,
        position: getMainPosition({
          bounds,
          resizerNav,
          isNavHidden,
          isFullscreen,
          margin
        })
      },
      previewProps: {
        viewMode,
        docsOnly,
        animate: !isDragging,
        isFullscreen,
        isToolshown,
        position: getPreviewPosition({
          isFullscreen,
          isNavHidden,
          isPanelHidden,
          resizerNav,
          resizerPanel,
          bounds,
          panelPosition,
          margin
        })
      },
      navProps: {
        viewMode,
        animate: !isDragging,
        hidden: isNavHidden,
        position: {
          height: bounds.height,
          left: 0,
          top: 0,
          width: navX + margin
        }
      },
      panelProps: {
        viewMode,
        animate: !isDragging,
        align: options.panelPosition,
        hidden: isPanelHidden,
        position: getPanelPosition({
          isPanelBottom,
          isPanelHidden,
          isNavHidden,
          bounds,
          resizerPanel,
          resizerNav,
          margin
        })
      }
    })) : null;
  }

}

Layout.displayName = "Layout";
Layout.defaultProps = {
  viewMode: undefined,
  docsOnly: false
};
const ThemedLayout = withTheme(Layout);
export { ThemedLayout as Layout };