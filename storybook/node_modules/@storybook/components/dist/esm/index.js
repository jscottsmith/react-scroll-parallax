import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.assign.js";
import { createElement, forwardRef } from 'react';
import { components as rawComponents } from './typography/DocumentFormatting';
export { Badge } from './Badge/Badge'; // Typography

export { Link } from './typography/link/link';
export { DocumentWrapper } from './typography/DocumentWrapper';
export { SyntaxHighlighter } from './syntaxhighlighter/lazy-syntaxhighlighter'; // UI

export { ActionBar } from './ActionBar/ActionBar';
export { Spaced } from './spaced/Spaced';
export { Placeholder } from './placeholder/placeholder';
export { ScrollArea } from './ScrollArea/ScrollArea';
export { Zoom } from './Zoom/Zoom'; // Forms

export { Button } from './Button/Button';
export { Form } from './form/index'; // Tooltips

export { WithTooltip, WithTooltipPure } from './tooltip/lazy-WithTooltip';
export { TooltipMessage } from './tooltip/TooltipMessage';
export { TooltipNote } from './tooltip/TooltipNote';
export { TooltipLinkList } from './tooltip/TooltipLinkList'; // Toolbar and subcomponents

export { Tabs, TabsState, TabBar, TabWrapper } from './tabs/tabs';
export { IconButton, TabButton } from './bar/button';
export { Separator, interleaveSeparators } from './bar/separator';
export { Bar, FlexBar } from './bar/bar';
export { AddonPanel } from './addon-panel/addon-panel'; // Graphics

export { Icons, Symbols } from './icon/icon';
export { StorybookLogo } from './brand/StorybookLogo';
export { StorybookIcon } from './brand/StorybookIcon'; // Doc blocks

export * from './blocks';
export * from './controls'; // Loader

export { Loader } from './Loader/Loader';
export * from './typography/DocumentFormatting';
export { rawComponents as components };
var resetComponents = {};
Object.keys(rawComponents).forEach(function (key) {
  resetComponents[key] = /*#__PURE__*/forwardRef(function (props, ref) {
    return /*#__PURE__*/createElement(key, Object.assign({}, props, {
      ref: ref
    }));
  });
});
export { resetComponents };