function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { Fragment, useMemo, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Consumer, merge } from '@storybook/api';
import { SET_CURRENT_STORY } from '@storybook/core-events';
import { addons, types } from '@storybook/addons';
import { Loader } from '@storybook/components';
import { Location } from '@storybook/router';
import * as S from './utils/components';
import { ZoomProvider, ZoomConsumer } from './tools/zoom';
import { defaultWrappers, ApplyWrappers } from './wrappers';
import { ToolbarComp } from './toolbar';
import { FramesRenderer } from './FramesRenderer';

const getWrappers = getFn => Object.values(getFn(types.PREVIEW));

const getTabs = getFn => Object.values(getFn(types.TAB));

const canvasMapper = ({
  state,
  api
}) => ({
  storyId: state.storyId,
  refId: state.refId,
  viewMode: state.viewMode,
  customCanvas: api.renderPreview,
  queryParams: state.customQueryParams,
  getElements: api.getElements,
  story: api.getData(state.storyId, state.refId),
  storiesConfigured: state.storiesConfigured,
  storiesFailed: state.storiesFailed,
  refs: state.refs,
  active: !!(state.viewMode && state.viewMode.match(/^(story|docs)$/))
});

const createCanvas = (id, baseUrl = 'iframe.html', withLoader = true) => ({
  id: 'canvas',
  title: 'Canvas',
  route: ({
    storyId,
    refId
  }) => refId ? `/story/${refId}_${storyId}` : `/story/${storyId}`,
  match: ({
    viewMode
  }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
  render: () => {
    return /*#__PURE__*/React.createElement(Consumer, {
      filter: canvasMapper
    }, ({
      story,
      refs,
      customCanvas,
      storyId,
      refId,
      viewMode,
      queryParams,
      getElements,
      storiesConfigured,
      storiesFailed,
      active
    }) => {
      const wrappers = useMemo(() => [...defaultWrappers, ...getWrappers(getElements)], [getElements, ...defaultWrappers]);
      const isLoading = story ? !!refs[refId] && !refs[refId].ready : !storiesFailed && !storiesConfigured;
      return /*#__PURE__*/React.createElement(ZoomConsumer, null, ({
        value: scale
      }) => {
        return /*#__PURE__*/React.createElement(React.Fragment, null, withLoader && isLoading && /*#__PURE__*/React.createElement(S.LoaderWrapper, null, /*#__PURE__*/React.createElement(Loader, {
          id: "preview-loader",
          role: "progressbar"
        })), /*#__PURE__*/React.createElement(ApplyWrappers, {
          id: id,
          storyId: storyId,
          viewMode: viewMode,
          active: active,
          wrappers: wrappers
        }, customCanvas ? customCanvas(storyId, viewMode, id, baseUrl, scale, queryParams) : /*#__PURE__*/React.createElement(FramesRenderer, {
          baseUrl: baseUrl,
          refs: refs,
          scale: scale,
          story: story,
          viewMode: viewMode,
          refId: refId,
          queryParams: queryParams,
          storyId: storyId
        })));
      });
    });
  }
});

const useTabs = (id, baseUrl, withLoader, getElements, story) => {
  const canvas = useMemo(() => {
    return createCanvas(id, baseUrl, withLoader);
  }, [id, baseUrl, withLoader]);
  const tabsFromConfig = useMemo(() => {
    return getTabs(getElements);
  }, [getElements]);
  return useMemo(() => {
    if (story !== null && story !== void 0 && story.parameters) {
      return filterTabs([canvas, ...tabsFromConfig], story.parameters);
    }

    return [canvas, ...tabsFromConfig];
  }, [story, canvas, ...tabsFromConfig]);
};

const Preview = /*#__PURE__*/React.memo(props => {
  const {
    api,
    id: previewId,
    options,
    viewMode,
    storyId,
    story = undefined,
    description,
    baseUrl,
    withLoader = true
  } = props;
  const {
    getElements
  } = api;
  const tabs = useTabs(previewId, baseUrl, withLoader, getElements, story);
  const shouldScale = viewMode === 'story';
  const {
    isToolshown
  } = options;
  const previousStoryId = useRef(storyId);
  const previousViewMode = useRef(viewMode);
  useEffect(() => {
    if (story && viewMode) {
      // Don't emit the event on first ("real") render, only when story or mode changes
      if (storyId !== previousStoryId.current || viewMode !== previousViewMode.current) {
        previousStoryId.current = storyId;
        previousViewMode.current = viewMode;

        if (viewMode.match(/docs|story/)) {
          const {
            refId,
            id
          } = story;
          api.emit(SET_CURRENT_STORY, {
            storyId: id,
            viewMode,
            options: {
              target: refId ? `storybook-ref-${refId}` : 'storybook-preview-iframe'
            }
          });
        }
      }
    }
  }, [story, viewMode]);
  return /*#__PURE__*/React.createElement(Fragment, null, previewId === 'main' && /*#__PURE__*/React.createElement(Helmet, {
    key: "description"
  }, /*#__PURE__*/React.createElement("title", null, description)), /*#__PURE__*/React.createElement(ZoomProvider, {
    shouldScale: shouldScale
  }, /*#__PURE__*/React.createElement(ToolbarComp, {
    key: "tools",
    story: story,
    api: api,
    isShown: isToolshown,
    tabs: tabs
  }), /*#__PURE__*/React.createElement(S.FrameWrap, {
    key: "frame",
    offset: isToolshown ? 40 : 0
  }, tabs.map((_ref, i) => {
    let {
      render: Render,
      match
    } = _ref,
        t = _objectWithoutPropertiesLoose(_ref, ["render", "match"]);

    // @ts-ignore
    const key = t.id || t.key || i;
    return /*#__PURE__*/React.createElement(Fragment, {
      key: key
    }, /*#__PURE__*/React.createElement(Location, null, lp => /*#__PURE__*/React.createElement(Render, {
      active: match(lp)
    })));
  }))));
});
export { Preview };

function filterTabs(panels, parameters) {
  const {
    previewTabs
  } = addons.getConfig();
  const parametersTabs = parameters ? parameters.previewTabs : undefined;

  if (previewTabs || parametersTabs) {
    // deep merge global and local settings
    const tabs = merge(previewTabs, parametersTabs);
    const arrTabs = Object.keys(tabs).map((key, index) => Object.assign({
      index
    }, typeof tabs[key] === 'string' ? {
      title: tabs[key]
    } : tabs[key], {
      id: key
    }));
    return panels.filter(panel => {
      const t = arrTabs.find(tab => tab.id === panel.id);
      return t === undefined || t.id === 'canvas' || !t.hidden;
    }).map((panel, index) => Object.assign({}, panel, {
      index
    })).sort((p1, p2) => {
      const tab_1 = arrTabs.find(tab => tab.id === p1.id); // @ts-ignore

      const index_1 = tab_1 ? tab_1.index : arrTabs.length + p1.index;
      const tab_2 = arrTabs.find(tab => tab.id === p2.id); // @ts-ignore

      const index_2 = tab_2 ? tab_2.index : arrTabs.length + p2.index;
      return index_1 - index_2;
    }).map(panel => {
      const t = arrTabs.find(tab => tab.id === panel.id);

      if (t) {
        return Object.assign({}, panel, {
          title: t.title || panel.title,
          disabled: t.disabled,
          hidden: t.hidden
        });
      }

      return panel;
    });
  }

  return panels;
}