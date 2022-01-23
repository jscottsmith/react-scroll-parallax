import React, { Component, Fragment } from 'react';
import { shortcutToHumanString } from '@storybook/api/shortcut';
import { styled } from '@storybook/theming';
import { Tabs, Icons, IconButton } from '@storybook/components';
const DesktopOnlyIconButton = styled(IconButton)({
  // Hides full screen icon at mobile breakpoint defined in app.js
  '@media (max-width: 599px)': {
    display: 'none'
  }
});
const SafeTabContent = /*#__PURE__*/React.memo(({
  children
}) => children);

class SafeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    }); // eslint-disable-next-line no-console

    console.error(error, info);
  }

  render() {
    const {
      hasError
    } = this.state;
    const {
      children,
      title,
      id
    } = this.props;

    if (hasError) {
      return /*#__PURE__*/React.createElement("h1", null, "Something went wrong.");
    }

    return /*#__PURE__*/React.createElement(SafeTabContent, {
      id: id,
      title: title
    }, children);
  }

}

SafeTab.displayName = "SafeTab";
const AddonPanel = /*#__PURE__*/React.memo(({
  panels,
  shortcuts,
  actions,
  selectedPanel = null,
  panelPosition = 'right',
  absolute = true
}) => /*#__PURE__*/React.createElement(Tabs, {
  absolute: absolute,
  selected: selectedPanel,
  actions: actions,
  tools: /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(DesktopOnlyIconButton, {
    key: "position",
    onClick: actions.togglePosition,
    title: `Change addon orientation [${shortcutToHumanString(shortcuts.panelPosition)}]`
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: panelPosition === 'bottom' ? 'sidebaralt' : 'bottombar'
  })), /*#__PURE__*/React.createElement(DesktopOnlyIconButton, {
    key: "visibility",
    onClick: actions.toggleVisibility,
    title: `Hide addons [${shortcutToHumanString(shortcuts.togglePanel)}]`
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "close"
  }))),
  id: "storybook-panel-root"
}, Object.entries(panels).map(([k, v]) => /*#__PURE__*/React.createElement(SafeTab, {
  key: k,
  id: k,
  title: v.title
}, v.render))));
AddonPanel.displayName = 'AddonPanel';
export default AddonPanel;