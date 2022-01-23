import global from 'global';
import React, { Component } from 'react';
import { styled } from '@storybook/theming';
import { Sidebar } from '../sidebar/Sidebar';
import Panel from '../panel/panel';
import { Preview } from '../preview/preview';
import { previewProps } from '../preview/preview.mockdata';
import { mockDataset } from '../sidebar/mockdata';
const {
  setInterval
} = global;
export const shortcuts = {
  fullScreen: ['F'],
  togglePanel: ['A'],
  panelPosition: ['D'],
  toggleNav: ['S'],
  toolbar: ['T'],
  search: ['/'],
  focusNav: ['1'],
  focusIframe: ['2'],
  focusPanel: ['3'],
  prevComponent: ['alt', 'ArrowUp'],
  nextComponent: ['alt', 'ArrowDown'],
  prevStory: ['alt', 'ArrowLeft'],
  nextStory: ['alt', 'ArrowRight'],
  shortcutsPage: ['ctrl', 'shift', ','],
  aboutPage: [','],
  escape: ['escape'],
  collapseAll: ['ctrl', 'shift', 'ArrowUp'],
  expandAll: ['ctrl', 'shift', 'ArrowDown']
};
export const panels = {
  test1: {
    title: 'Test 1',
    render: ({
      active,
      key
    }) => active ? /*#__PURE__*/React.createElement("div", {
      id: "test1",
      key: key
    }, "TEST 1") : null
  },
  test2: {
    title: 'Test 2',
    render: ({
      active,
      key
    }) => active ? /*#__PURE__*/React.createElement("div", {
      id: "test2",
      key: key
    }, "TEST 2") : null
  }
};
const realSidebarProps = {
  stories: mockDataset.withRoot,
  menu: [],
  refs: {},
  storiesConfigured: true
};
const PlaceholderBlock = styled.div(({
  color
}) => ({
  background: color || 'hotpink',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden'
}));

class PlaceholderClock extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      count: 1
    };
    this.interval = void 0;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const {
        count
      } = this.state;
      this.setState({
        count: count + 1
      });
    }, 1000);
  }

  componentWillUnmount() {
    const {
      interval
    } = this;
    clearInterval(interval);
  }

  render() {
    const {
      children,
      color
    } = this.props;
    const {
      count
    } = this.state;
    return /*#__PURE__*/React.createElement(PlaceholderBlock, {
      color: color
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: 'rgba(0,0,0,0.2)',
        fontSize: '150px',
        lineHeight: '150px',
        margin: '-20px'
      }
    }, count), children);
  }

}

PlaceholderClock.displayName = "PlaceholderClock";

const MockSidebar = props => /*#__PURE__*/React.createElement(PlaceholderClock, {
  color: "hotpink"
}, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(props, null, 2)));

MockSidebar.displayName = "MockSidebar";

const MockPreview = props => /*#__PURE__*/React.createElement(PlaceholderClock, {
  color: "deepskyblue"
}, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(props, null, 2)));

MockPreview.displayName = "MockPreview";

const MockPanel = props => /*#__PURE__*/React.createElement(PlaceholderClock, {
  color: "orangered"
}, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(props, null, 2)));

MockPanel.displayName = "MockPanel";
export const MockPage = props => /*#__PURE__*/React.createElement(PlaceholderClock, {
  color: "cyan"
}, /*#__PURE__*/React.createElement("pre", null, JSON.stringify(props, null, 2)));
MockPage.displayName = "MockPage";
export const mockProps = {
  Sidebar: MockSidebar,
  Preview: MockPreview,
  Panel: MockPanel,
  Notifications: () => null,
  pages: [],
  options: {
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    isToolshown: true,
    initialActive: 'canvas'
  },
  viewMode: 'story',
  panelCount: 2,
  width: 900,
  height: 600,
  docsOnly: false
};
export const realProps = {
  Sidebar: () => /*#__PURE__*/React.createElement(Sidebar, realSidebarProps),
  Preview: () => /*#__PURE__*/React.createElement(Preview, previewProps),
  Notifications: () => null,
  Panel: () => /*#__PURE__*/React.createElement(Panel, {
    panels: panels,
    actions: {
      onSelect: () => {},
      toggleVisibility: () => {},
      togglePosition: () => {}
    },
    selectedPanel: "test2",
    panelPosition: "bottom",
    shortcuts: shortcuts,
    absolute: false
  }),
  pages: [],
  options: {
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    isToolshown: true,
    initialActive: 'canvas'
  },
  viewMode: 'story',
  panelCount: 2,
  width: 900,
  height: 600,
  docsOnly: false
};