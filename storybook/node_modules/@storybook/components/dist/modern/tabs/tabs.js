import React, { Children, Component, Fragment, memo } from 'react';
import { styled } from '@storybook/theming';
import { sanitize } from '@storybook/csf';
import { Placeholder } from '../placeholder/placeholder';
import { FlexBar } from '../bar/bar';
import { TabButton } from '../bar/button';
const ignoreSsrWarning = '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */';
const Wrapper = styled.div(({
  theme,
  bordered
}) => bordered ? {
  backgroundClip: 'padding-box',
  border: `1px solid ${theme.appBorderColor}`,
  borderRadius: theme.appBorderRadius,
  overflow: 'hidden',
  boxSizing: 'border-box'
} : {}, ({
  absolute
}) => absolute ? {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column'
} : {
  display: 'block'
});
export const TabBar = styled.div({
  overflow: 'hidden',
  '&:first-of-type': {
    marginLeft: -3
  }
});
const Content = styled.div({
  display: 'block',
  position: 'relative'
}, ({
  theme
}) => ({
  fontSize: theme.typography.size.s2 - 1,
  background: theme.background.content
}), ({
  bordered,
  theme
}) => bordered ? {
  borderRadius: `0 0 ${theme.appBorderRadius - 1}px ${theme.appBorderRadius - 1}px`
} : {}, ({
  absolute,
  bordered
}) => absolute ? {
  height: `calc(100% - ${bordered ? 42 : 40}px)`,
  position: 'absolute',
  left: 0 + (bordered ? 1 : 0),
  right: 0 + (bordered ? 1 : 0),
  bottom: 0 + (bordered ? 1 : 0),
  top: 40 + (bordered ? 1 : 0),
  overflow: 'auto',
  [`& > *:first-child${ignoreSsrWarning}`]: {
    position: 'absolute',
    left: 0 + (bordered ? 1 : 0),
    right: 0 + (bordered ? 1 : 0),
    bottom: 0 + (bordered ? 1 : 0),
    top: 0 + (bordered ? 1 : 0),
    height: `calc(100% - ${bordered ? 2 : 0}px)`,
    overflow: 'auto'
  }
} : {});
const VisuallyHidden = styled.div(({
  active
}) => active ? {
  display: 'block'
} : {
  display: 'none'
});
export const TabWrapper = ({
  active,
  render,
  children
}) => /*#__PURE__*/React.createElement(VisuallyHidden, {
  active: active
}, render ? render() : children);
TabWrapper.displayName = "TabWrapper";
export const panelProps = {};

const childrenToList = (children, selected) => Children.toArray(children).map(({
  props: {
    title,
    id,
    color,
    children: childrenOfChild
  }
}, index) => {
  const content = Array.isArray(childrenOfChild) ? childrenOfChild[0] : childrenOfChild;
  return {
    active: selected ? id === selected : index === 0,
    title,
    id,
    color,
    render: typeof content === 'function' ? content : ({
      active,
      key
    }) => /*#__PURE__*/React.createElement(VisuallyHidden, {
      key: key,
      active: active,
      role: "tabpanel"
    }, content)
  };
});

export const Tabs = /*#__PURE__*/memo(({
  children,
  selected,
  actions,
  absolute,
  bordered,
  tools,
  backgroundColor,
  id: htmlId
}) => {
  const list = childrenToList(children, selected);
  return list.length ? /*#__PURE__*/React.createElement(Wrapper, {
    absolute: absolute,
    bordered: bordered,
    id: htmlId
  }, /*#__PURE__*/React.createElement(FlexBar, {
    border: true,
    backgroundColor: backgroundColor
  }, /*#__PURE__*/React.createElement(TabBar, {
    role: "tablist"
  }, list.map(({
    title,
    id,
    active,
    color
  }) => {
    const tabTitle = typeof title === 'function' ? title() : title;
    return /*#__PURE__*/React.createElement(TabButton, {
      id: `tabbutton-${sanitize(tabTitle)}`,
      className: `tabbutton ${active ? 'tabbutton-active' : ''}`,
      type: "button",
      key: id,
      active: active,
      textColor: color,
      onClick: e => {
        e.preventDefault();
        actions.onSelect(id);
      },
      role: "tab"
    }, tabTitle);
  })), tools ? /*#__PURE__*/React.createElement(Fragment, null, tools) : null), /*#__PURE__*/React.createElement(Content, {
    id: "panel-tab-content",
    bordered: bordered,
    absolute: absolute
  }, list.map(({
    id,
    active,
    render
  }) => render({
    key: id,
    active
  })))) : /*#__PURE__*/React.createElement(Placeholder, null, /*#__PURE__*/React.createElement(Fragment, {
    key: "title"
  }, "Nothing found"));
});
Tabs.displayName = 'Tabs';
Tabs.defaultProps = {
  id: null,
  children: null,
  tools: null,
  selected: null,
  absolute: false,
  bordered: false
};
export class TabsState extends Component {
  constructor(props) {
    super(props);
    this.handlers = {
      onSelect: id => this.setState({
        selected: id
      })
    };
    this.state = {
      selected: props.initial
    };
  }

  render() {
    const {
      bordered = false,
      absolute = false,
      children,
      backgroundColor
    } = this.props;
    const {
      selected
    } = this.state;
    return /*#__PURE__*/React.createElement(Tabs, {
      bordered: bordered,
      absolute: absolute,
      selected: selected,
      backgroundColor: backgroundColor,
      actions: this.handlers
    }, children);
  }

}
TabsState.displayName = "TabsState";
TabsState.defaultProps = {
  children: [],
  initial: null,
  absolute: false,
  bordered: false,
  backgroundColor: ''
};