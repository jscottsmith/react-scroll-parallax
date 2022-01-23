import React, { Component, Children } from 'react';
import { ActiveTabs } from '@storybook/api';
import { styled } from '@storybook/theming';
import { TabButton } from '@storybook/components';
import { Root } from './Root';
const {
  SIDEBAR,
  CANVAS,
  ADDONS
} = ActiveTabs;
const Pane = styled.div({
  transition: 'transform .2s ease',
  position: 'absolute',
  top: 0,
  height: '100%',
  overflow: 'auto'
}, ({
  theme
}) => ({
  background: theme.background.content,
  '&:nth-of-type(1)': {
    borderRight: `1px solid ${theme.appBorderColor}`
  },
  '&:nth-of-type(3)': {
    borderLeft: `1px solid ${theme.appBorderColor}`
  }
}), ({
  index
}) => {
  switch (index) {
    case 0:
      {
        return {
          width: '80vw',
          transform: 'translateX(-80vw)',
          left: 0
        };
      }

    case 1:
      {
        return {
          width: '100%',
          transform: 'translateX(0) scale(1)',
          left: 0
        };
      }

    case 2:
      {
        return {
          width: '80vw',
          transform: 'translateX(80vw)',
          right: 0
        };
      }

    default:
      {
        return {};
      }
  }
}, ({
  active,
  index
}) => {
  switch (true) {
    case index === 0 && active === SIDEBAR:
      {
        return {
          transform: 'translateX(-0px)'
        };
      }

    case index === 1 && active === SIDEBAR:
      {
        return {
          transform: 'translateX(40vw) translateY(-42.5vh) translateY(40px) scale(0.2)'
        };
      }

    case index === 1 && active === ADDONS:
      {
        return {
          transform: 'translateX(-40vw) translateY(-42.5vh) translateY(40px) scale(0.2)'
        };
      }

    case index === 2 && active === ADDONS:
      {
        return {
          transform: 'translateX(0px)'
        };
      }

    default:
      {
        return {};
      }
  }
});
const Panels = /*#__PURE__*/React.memo(({
  children,
  active
}) => /*#__PURE__*/React.createElement(PanelsContainer, null, Children.toArray(children).map((item, index) =>
/*#__PURE__*/
// eslint-disable-next-line react/no-array-index-key
React.createElement(Pane, {
  key: index,
  index: index,
  active: active
}, item))));
Panels.displayName = 'Panels';
const PanelsContainer = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: 'calc(100% - 40px)'
});
const Bar = styled.nav({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100vw',
  height: 40,
  display: 'flex',
  boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.1)',
  '& > *': {
    flex: 1
  }
}, ({
  theme
}) => ({
  background: theme.barBg
}));

class Mobile extends Component {
  constructor(props) {
    super(props);
    const {
      options
    } = props;
    this.state = {
      active: options.initialActive || SIDEBAR
    };
  }

  render() {
    const {
      Sidebar,
      Preview,
      Panel,
      Notifications,
      pages,
      viewMode,
      options,
      docsOnly
    } = this.props;
    const {
      active
    } = this.state;
    return /*#__PURE__*/React.createElement(Root, null, /*#__PURE__*/React.createElement(Notifications, {
      placement: {
        position: 'fixed',
        bottom: 60,
        left: 20,
        right: 20
      }
    }), /*#__PURE__*/React.createElement(Panels, {
      active: active
    }, /*#__PURE__*/React.createElement(Sidebar, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      hidden: !viewMode
    }, /*#__PURE__*/React.createElement(Preview, {
      isToolshown: options.isToolshown,
      id: "main",
      viewMode: viewMode
    })), pages.map(({
      key,
      route: Route,
      render: Content
    }) => /*#__PURE__*/React.createElement(Route, {
      key: key
    }, /*#__PURE__*/React.createElement(Content, null)))), /*#__PURE__*/React.createElement(Panel, {
      hidden: !viewMode
    })), /*#__PURE__*/React.createElement(Bar, null, /*#__PURE__*/React.createElement(TabButton, {
      onClick: () => this.setState({
        active: SIDEBAR
      }),
      active: active === SIDEBAR
    }, "Sidebar"), /*#__PURE__*/React.createElement(TabButton, {
      onClick: () => this.setState({
        active: CANVAS
      }),
      active: active === CANVAS
    }, viewMode ? 'Canvas' : null, pages.map(({
      key,
      route: Route
    }) => /*#__PURE__*/React.createElement(Route, {
      key: key
    }, key))), viewMode && !docsOnly ? /*#__PURE__*/React.createElement(TabButton, {
      onClick: () => this.setState({
        active: ADDONS
      }),
      active: active === ADDONS
    }, "Addons") : null));
  }

}

Mobile.displayName = "Mobile";
export { Mobile };