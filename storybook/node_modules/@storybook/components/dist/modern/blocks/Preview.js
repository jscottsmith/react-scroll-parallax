function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.array.reduce.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Children, useCallback, useState } from 'react';
import { darken } from 'polished';
import { styled } from '@storybook/theming';
import global from 'global';
import { getBlockBackgroundStyle } from './BlockBackgroundStyles';
import { Source } from './Source';
import { ActionBar } from '../ActionBar/ActionBar';
import { Toolbar } from './Toolbar';
import { ZoomContext } from './ZoomContext';
import { Zoom } from '../Zoom/Zoom';
import { StorySkeleton } from '.';
const ChildrenContainer = styled.div(({
  isColumn,
  columns,
  layout
}) => ({
  display: isColumn || !columns ? 'block' : 'flex',
  position: 'relative',
  flexWrap: 'wrap',
  overflow: 'auto',
  flexDirection: isColumn ? 'column' : 'row',
  '& .innerZoomElementWrapper > *': isColumn ? {
    width: layout !== 'fullscreen' ? 'calc(100% - 20px)' : '100%',
    display: 'block'
  } : {
    maxWidth: layout !== 'fullscreen' ? 'calc(100% - 20px)' : '100%',
    display: 'inline-block'
  }
}), ({
  layout = 'padded'
}) => layout === 'centered' || layout === 'padded' ? {
  padding: '30px 20px',
  margin: -10,
  '& .innerZoomElementWrapper > *': {
    width: 'auto',
    border: '10px solid transparent!important'
  }
} : {}, ({
  layout = 'padded'
}) => layout === 'centered' ? {
  display: 'flex',
  justifyContent: 'center',
  justifyItems: 'center',
  alignContent: 'center',
  alignItems: 'center'
} : {}, ({
  columns
}) => columns && columns > 1 ? {
  '.innerZoomElementWrapper > *': {
    minWidth: `calc(100% / ${columns} - 20px)`
  }
} : {});
const StyledSource = styled(Source)(({
  theme
}) => ({
  margin: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: theme.appBorderRadius,
  borderBottomRightRadius: theme.appBorderRadius,
  border: 'none',
  background: theme.base === 'light' ? 'rgba(0, 0, 0, 0.85)' : darken(0.05, theme.background.content),
  color: theme.color.lightest,
  button: {
    background: theme.base === 'light' ? 'rgba(0, 0, 0, 0.85)' : darken(0.05, theme.background.content)
  }
}));
const PreviewContainer = styled.div(({
  theme,
  withSource,
  isExpanded
}) => Object.assign({
  position: 'relative',
  overflow: 'hidden',
  margin: '25px 0 40px'
}, getBlockBackgroundStyle(theme), {
  borderBottomLeftRadius: withSource && isExpanded && 0,
  borderBottomRightRadius: withSource && isExpanded && 0,
  borderBottomWidth: isExpanded && 0
}), ({
  withToolbar
}) => withToolbar && {
  paddingTop: 40
});

const getSource = (withSource, expanded, setExpanded) => {
  switch (true) {
    case !!(withSource && withSource.error):
      {
        return {
          source: null,
          actionItem: {
            title: 'No code available',
            className: 'docblock-code-toggle docblock-code-toggle--disabled',
            disabled: true,
            onClick: () => setExpanded(false)
          }
        };
      }

    case expanded:
      {
        return {
          source: /*#__PURE__*/React.createElement(StyledSource, _extends({}, withSource, {
            dark: true
          })),
          actionItem: {
            title: 'Hide code',
            className: 'docblock-code-toggle docblock-code-toggle--expanded',
            onClick: () => setExpanded(false)
          }
        };
      }

    default:
      {
        return {
          source: /*#__PURE__*/React.createElement(StyledSource, _extends({}, withSource, {
            dark: true
          })),
          actionItem: {
            title: 'Show code',
            className: 'docblock-code-toggle',
            onClick: () => setExpanded(true)
          }
        };
      }
  }
};

function getStoryId(children) {
  if (Children.count(children) === 1) {
    const elt = children;

    if (elt.props) {
      return elt.props.id;
    }
  }

  return null;
}

const PositionedToolbar = styled(Toolbar)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 40
});
const Relative = styled.div({
  overflow: 'hidden',
  position: 'relative'
});

const getLayout = children => {
  return children.reduce((result, c) => {
    if (result) {
      return result;
    }

    if (typeof c === 'string' || typeof c === 'number') {
      return 'padded';
    }

    return c.props && c.props.parameters && c.props.parameters.layout || 'padded';
  }, undefined);
};
/**
 * A preview component for showing one or more component `Story`
 * items. The preview also shows the source for the component
 * as a drop-down.
 */


export const Preview = (_ref) => {
  let {
    isLoading,
    isColumn,
    columns,
    children,
    withSource,
    withToolbar = false,
    isExpanded = false,
    additionalActions,
    className
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["isLoading", "isColumn", "columns", "children", "withSource", "withToolbar", "isExpanded", "additionalActions", "className"]);

  const [expanded, setExpanded] = useState(isExpanded);
  const {
    source,
    actionItem
  } = getSource(withSource, expanded, setExpanded);
  const [scale, setScale] = useState(1);
  const previewClasses = [className].concat(['sbdocs', 'sbdocs-preview']);
  const defaultActionItems = withSource ? [actionItem] : [];
  const [additionalActionItems, setAdditionalActionItems] = useState(additionalActions ? [...additionalActions] : []);
  const actionItems = [...defaultActionItems, ...additionalActionItems]; // @ts-ignore

  const layout = getLayout(Children.count(children) === 1 ? [children] : children);
  const {
    window: globalWindow
  } = global;
  const copyToClipboard = useCallback(async text => {
    const {
      createCopyToClipboardFunction
    } = await import('../syntaxhighlighter/syntaxhighlighter');
    createCopyToClipboardFunction();
  }, []);

  const onCopyCapture = e => {
    e.preventDefault();

    if (additionalActionItems.filter(item => item.title === 'Copied').length === 0) {
      copyToClipboard(source.props.code).then(() => {
        setAdditionalActionItems([...additionalActionItems, {
          title: 'Copied',
          onClick: () => {}
        }]);
        globalWindow.setTimeout(() => setAdditionalActionItems(additionalActionItems.filter(item => item.title !== 'Copied')), 1500);
      });
    }
  };

  return /*#__PURE__*/React.createElement(PreviewContainer, _extends({
    withSource,
    withToolbar
  }, props, {
    className: previewClasses.join(' ')
  }), withToolbar && /*#__PURE__*/React.createElement(PositionedToolbar, {
    isLoading: isLoading,
    border: true,
    zoom: z => setScale(scale * z),
    resetZoom: () => setScale(1),
    storyId: getStoryId(children),
    baseUrl: "./iframe.html"
  }), /*#__PURE__*/React.createElement(ZoomContext.Provider, {
    value: {
      scale
    }
  }, /*#__PURE__*/React.createElement(Relative, {
    className: "docs-story",
    onCopyCapture: withSource && onCopyCapture
  }, /*#__PURE__*/React.createElement(ChildrenContainer, {
    isColumn: isColumn || !Array.isArray(children),
    columns: columns,
    layout: layout
  }, /*#__PURE__*/React.createElement(Zoom.Element, {
    scale: scale
  }, Array.isArray(children) ? // eslint-disable-next-line react/no-array-index-key
  children.map((child, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, child)) : /*#__PURE__*/React.createElement("div", null, children))), /*#__PURE__*/React.createElement(ActionBar, {
    actionItems: actionItems
  }))), withSource && expanded && source);
};
Preview.displayName = "Preview";
const StyledPreview = styled(Preview)(() => ({
  '.docs-story': {
    paddingTop: 32,
    paddingBottom: 40
  }
}));
export const PreviewSkeleton = () => /*#__PURE__*/React.createElement(StyledPreview, {
  isLoading: true,
  withToolbar: true
}, /*#__PURE__*/React.createElement(StorySkeleton, null));
PreviewSkeleton.displayName = "PreviewSkeleton";