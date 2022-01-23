function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { styled } from '@storybook/theming';
import global from 'global';
import { Spaced } from '../spaced/Spaced';
import { Preview, PreviewSkeleton } from './Preview';
import { Story } from './Story';
import { Button } from '../Button/Button';
import * as Source from './Source.stories';
const {
  window: globalWindow
} = global;
export default {
  title: 'Docs/Preview',
  component: Preview
};
export const Loading = () => /*#__PURE__*/React.createElement(PreviewSkeleton, null);
Loading.displayName = "Loading";
export const CodeCollapsed = () => /*#__PURE__*/React.createElement(Preview, {
  isExpanded: false,
  withSource: Source.JSX.args
}, /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 1"));
CodeCollapsed.displayName = "CodeCollapsed";
export const CodeExpanded = () => /*#__PURE__*/React.createElement(Preview, {
  isExpanded: true,
  withSource: Source.JSX.args
}, /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 1"));
CodeExpanded.displayName = "CodeExpanded";
export const CodeError = () => /*#__PURE__*/React.createElement(Preview, {
  isExpanded: true,
  withSource: Source.SourceUnavailable.args
}, /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 1"));
CodeError.displayName = "CodeError";
export const Single = () => /*#__PURE__*/React.createElement(Preview, null, /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 1"));
Single.displayName = "Single";
export const Row = () => /*#__PURE__*/React.createElement(Preview, null, /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 1"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 2"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 3"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 4"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 5"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 6"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 7"));
Row.displayName = "Row";
export const Column = () => /*#__PURE__*/React.createElement(Preview, {
  isColumn: true
}, /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 1"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 2"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 3"));
Column.displayName = "Column";
export const GridWith3Columns = () => /*#__PURE__*/React.createElement(Preview, {
  columns: 3
}, /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 1"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 2"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 3"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 4"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 5"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 6"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 7 long long long long long title"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 8"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 9"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 10"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 11"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 12"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 13"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 14"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 15"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 16"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 17"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 18"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 19"), /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 20"));
GridWith3Columns.displayName = "GridWith3Columns";

const buttonFn = () => /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Hello Button");

buttonFn.displayName = "buttonFn";
export const WithToolbar = () => /*#__PURE__*/React.createElement(Preview, {
  withToolbar: true
}, /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "with toolbar"
}));
WithToolbar.displayName = "WithToolbar";
const Horizontal = styled(props => /*#__PURE__*/React.createElement(Spaced, _extends({
  col: 1
}, props)))({
  display: 'grid',
  gridTemplateColumns: '100px calc(100vw + 100px) 100px'
});
export const Wide = () => /*#__PURE__*/React.createElement(Preview, {
  withToolbar: true
}, /*#__PURE__*/React.createElement(Horizontal, null, /*#__PURE__*/React.createElement("div", null, "START"), /*#__PURE__*/React.createElement("div", null, "middle"), /*#__PURE__*/React.createElement("div", null, "END")));
Wide.displayName = "Wide";
export const WithToolbarMulti = () => /*#__PURE__*/React.createElement(Preview, {
  withToolbar: true
}, /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "story1"
}), /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "story2"
}));
WithToolbarMulti.displayName = "WithToolbarMulti";
export const WithFullscreenSingle = () => /*#__PURE__*/React.createElement(Preview, {
  withToolbar: true
}, /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "story1",
  parameters: {
    layout: 'fullscreen'
  }
}));
WithFullscreenSingle.displayName = "WithFullscreenSingle";
export const WithFullscreenMulti = () => /*#__PURE__*/React.createElement(Preview, {
  withToolbar: true
}, /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "story1",
  parameters: {
    layout: 'fullscreen'
  }
}), /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "story2",
  parameters: {
    layout: 'fullscreen'
  }
}));
WithFullscreenMulti.displayName = "WithFullscreenMulti";
export const WithCenteredSingle = () => /*#__PURE__*/React.createElement(Preview, {
  withToolbar: true
}, /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "story1",
  parameters: {
    layout: 'centered'
  }
}));
WithCenteredSingle.displayName = "WithCenteredSingle";
export const WithCenteredMulti = () => /*#__PURE__*/React.createElement(Preview, {
  withToolbar: true
}, /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "story1",
  parameters: {
    layout: 'centered'
  }
}), /*#__PURE__*/React.createElement(Story, {
  inline: true,
  storyFn: buttonFn,
  title: "story2",
  parameters: {
    layout: 'centered'
  }
}));
WithCenteredMulti.displayName = "WithCenteredMulti";
export const WithAdditionalActions = () => /*#__PURE__*/React.createElement(Preview, {
  additionalActions: [{
    title: 'Open on GitHub',
    onClick: () => {
      globalWindow.location.href = 'https://github.com/storybookjs/storybook/blob/next/lib/components/src/blocks/Preview.stories.tsx#L140-L147';
    }
  }]
}, /*#__PURE__*/React.createElement(Button, {
  secondary: true
}, "Button 1"));
WithAdditionalActions.displayName = "WithAdditionalActions";