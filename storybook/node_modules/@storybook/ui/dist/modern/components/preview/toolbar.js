function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Fragment, useMemo } from 'react';
import { styled } from '@storybook/theming';
import { FlexBar, IconButton, Icons, Separator, TabButton, TabBar } from '@storybook/components';
import { Consumer, merge } from '@storybook/api';
import { shortcutToHumanString } from '@storybook/api/shortcut';
import { addons, types } from '@storybook/addons';
import { Location } from '@storybook/router';
import { zoomTool } from './tools/zoom';
import * as S from './utils/components';
import { copyTool } from './tools/copy';
import { ejectTool } from './tools/eject';
import { menuTool } from './tools/menu';
export const getTools = getFn => Object.values(getFn(types.TOOL));
export const getToolsExtra = getFn => Object.values(getFn(types.TOOLEXTRA));

const Bar = (_ref) => {
  let props = _objectWithoutPropertiesLoose(_ref, ["shown"]);

  return /*#__PURE__*/React.createElement(FlexBar, props);
};

Bar.displayName = "Bar";
export const Toolbar = styled(Bar)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  transition: 'transform .2s linear'
}, ({
  shown
}) => ({
  transform: shown ? 'translateY(0px)' : 'translateY(-40px)'
}));

const fullScreenMapper = ({
  api,
  state
}) => ({
  toggle: api.toggleFullscreen,
  value: state.layout.isFullscreen,
  shortcut: shortcutToHumanString(api.getShortcutKeys().fullScreen),
  hasPanel: Object.keys(api.getPanels()).length > 0,
  singleStory: state.singleStory
});

export const fullScreenTool = {
  title: 'fullscreen',
  id: 'fullscreen',
  match: p => ['story', 'docs'].includes(p.viewMode),
  render: () => /*#__PURE__*/React.createElement(Consumer, {
    filter: fullScreenMapper
  }, ({
    toggle,
    value,
    shortcut,
    hasPanel,
    singleStory
  }) => (!singleStory || singleStory && hasPanel) && /*#__PURE__*/React.createElement(S.DesktopOnly, null, /*#__PURE__*/React.createElement(IconButton, {
    key: "full",
    onClick: toggle,
    title: `${value ? 'Exit full screen' : 'Go full screen'} [${shortcut}]`
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: value ? 'close' : 'expand'
  }))))
};

const tabsMapper = ({
  state
}) => ({
  viewMode: state.docsOnly,
  storyId: state.storyId,
  path: state.path,
  location: state.location,
  refId: state.refId
});

export const createTabsTool = tabs => ({
  title: 'title',
  id: 'title',
  render: () => /*#__PURE__*/React.createElement(Consumer, {
    filter: tabsMapper
  }, rp => /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(TabBar, {
    key: "tabs"
  }, tabs.filter(p => !p.hidden).map((t, index) => {
    const to = t.route(rp);
    const isActive = rp.path === to;
    return /*#__PURE__*/React.createElement(S.UnstyledLink, {
      key: t.id || `l${index}`,
      to: to
    }, /*#__PURE__*/React.createElement(TabButton, {
      disabled: t.disabled,
      active: isActive
    }, t.title));
  })), /*#__PURE__*/React.createElement(Separator, null)))
});
export const defaultTools = [zoomTool];
export const defaultToolsExtra = [fullScreenTool, ejectTool, copyTool];

const useTools = (getElements, tabs, viewMode, story, location, path) => {
  const toolsFromConfig = useMemo(() => getTools(getElements), [getElements]);
  const toolsExtraFromConfig = useMemo(() => getToolsExtra(getElements), [getElements]);
  const tools = useMemo(() => [...defaultTools, ...toolsFromConfig], [defaultTools, toolsFromConfig]);
  const toolsExtra = useMemo(() => [...defaultToolsExtra, ...toolsExtraFromConfig], [defaultToolsExtra, toolsExtraFromConfig]);
  return useMemo(() => {
    return story && story.parameters ? filterTools(tools, toolsExtra, tabs, {
      viewMode,
      story,
      location,
      path
    }) : {
      left: tools,
      right: toolsExtra
    };
  }, [viewMode, story, location, path, tools, toolsExtra, tabs]);
};

export const ToolRes = /*#__PURE__*/React.memo(({
  api,
  story,
  tabs,
  isShown,
  location,
  path,
  viewMode
}) => {
  const {
    left,
    right
  } = useTools(api.getElements, tabs, viewMode, story, location, path);
  return left || right ? /*#__PURE__*/React.createElement(Toolbar, {
    key: "toolbar",
    shown: isShown,
    border: true
  }, /*#__PURE__*/React.createElement(Tools, {
    key: "left",
    list: left
  }), /*#__PURE__*/React.createElement(Tools, {
    key: "right",
    list: right
  })) : null;
});
export const ToolbarComp = /*#__PURE__*/React.memo(props => /*#__PURE__*/React.createElement(Location, null, ({
  location,
  path,
  viewMode
}) => /*#__PURE__*/React.createElement(ToolRes, _extends({}, props, {
  location,
  path,
  viewMode
}))));
export const Tools = /*#__PURE__*/React.memo(({
  list
}) => /*#__PURE__*/React.createElement(React.Fragment, null, list.filter(Boolean).map((_ref2, index) => {
  let {
    render: Render,
    id
  } = _ref2,
      t = _objectWithoutPropertiesLoose(_ref2, ["render", "id"]);

  return (
    /*#__PURE__*/
    // @ts-ignore
    React.createElement(Render, {
      key: id || t.key || `f-${index}`
    })
  );
})));

function toolbarItemHasBeenExcluded(item, story) {
  var _toolbarItems$item$id;

  const toolbarItemsFromStoryParameters = 'toolbar' in story.parameters ? story.parameters.toolbar : undefined;
  const {
    toolbar: toolbarItemsFromAddonsConfig
  } = addons.getConfig();
  const toolbarItems = merge(toolbarItemsFromAddonsConfig, toolbarItemsFromStoryParameters);
  return toolbarItems ? !!((_toolbarItems$item$id = toolbarItems[item.id]) !== null && _toolbarItems$item$id !== void 0 && _toolbarItems$item$id.hidden) : false;
}

export function filterTools(tools, toolsExtra, tabs, {
  viewMode,
  story,
  location,
  path
}) {
  const toolsLeft = [menuTool, tabs.filter(p => !p.hidden).length >= 1 && createTabsTool(tabs), ...tools];
  const toolsRight = [...toolsExtra];

  const filter = item => item && (!item.match || item.match({
    storyId: story.id,
    refId: story.refId,
    viewMode,
    location,
    path
  })) && !toolbarItemHasBeenExcluded(item, story);

  const left = toolsLeft.filter(filter);
  const right = toolsRight.filter(filter);
  return {
    left,
    right
  };
}