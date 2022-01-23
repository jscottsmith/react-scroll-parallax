import React, { useState } from 'react';
import { styled } from '@storybook/theming';
import memoize from 'memoizerific';
import uniq from 'lodash/uniq';
import { WithTooltipPure } from '../../tooltip/lazy-WithTooltip';
import { Icons } from '../../icon/icon';
import { SyntaxHighlighter } from '../../syntaxhighlighter/lazy-syntaxhighlighter';
import { codeCommon } from '../../typography/shared';
const ITEMS_BEFORE_EXPANSION = 8;
const Summary = styled.div(({
  isExpanded
}) => ({
  display: 'flex',
  flexDirection: isExpanded ? 'column' : 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  marginBottom: '-4px',
  minWidth: 100
}));
const Text = styled.span(codeCommon, ({
  theme,
  simple = false
}) => Object.assign({
  flex: '0 0 auto',
  fontFamily: theme.typography.fonts.mono,
  fontSize: theme.typography.size.s1,
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  maxWidth: '100%',
  margin: 0,
  marginRight: '4px',
  marginBottom: '4px',
  paddingTop: '2px',
  paddingBottom: '2px',
  lineHeight: '13px'
}, simple && {
  background: 'transparent',
  border: '0 none',
  paddingLeft: 0
}));
const ExpandButton = styled.button(({
  theme
}) => ({
  fontFamily: theme.typography.fonts.mono,
  color: theme.color.secondary,
  marginBottom: '4px',
  background: 'none',
  border: 'none'
}));
const Expandable = styled.div(codeCommon, ({
  theme
}) => ({
  fontFamily: theme.typography.fonts.mono,
  color: theme.color.secondary,
  fontSize: theme.typography.size.s1,
  // overrides codeCommon
  margin: 0,
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center'
}));
const Detail = styled.div(({
  theme,
  width
}) => ({
  width,
  minWidth: 200,
  maxWidth: 800,
  padding: 15,
  // Dont remove the mono fontFamily here even if it seem useless, this is used by the browser to calculate the length of a "ch" unit.
  fontFamily: theme.typography.fonts.mono,
  fontSize: theme.typography.size.s1,
  // Most custom stylesheet will reset the box-sizing to "border-box" and will break the tooltip.
  boxSizing: 'content-box',
  '& code': {
    padding: '0 !important'
  }
}));
const ArrowIcon = styled(Icons)({
  height: 10,
  width: 10,
  minWidth: 10,
  marginLeft: 4
});

const EmptyArg = () => {
  return /*#__PURE__*/React.createElement("span", null, "-");
};

EmptyArg.displayName = "EmptyArg";

const ArgText = ({
  text,
  simple
}) => {
  return /*#__PURE__*/React.createElement(Text, {
    simple: simple
  }, text);
};

ArgText.displayName = "ArgText";
const calculateDetailWidth = memoize(1000)(detail => {
  const lines = detail.split(/\r?\n/);
  return `${Math.max(...lines.map(x => x.length))}ch`;
});

const getSummaryItems = summary => {
  if (!summary) return [summary];
  const splittedItems = summary.split('|');
  const summaryItems = splittedItems.map(value => value.trim());
  return uniq(summaryItems);
};

const renderSummaryItems = (summaryItems, isExpanded = true) => {
  let items = summaryItems;

  if (!isExpanded) {
    items = summaryItems.slice(0, ITEMS_BEFORE_EXPANSION);
  }

  return items.map(item => /*#__PURE__*/React.createElement(ArgText, {
    key: item,
    text: item === '' ? '""' : item
  }));
};

const ArgSummary = ({
  value,
  initialExpandedArgs
}) => {
  const {
    summary,
    detail
  } = value;
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(initialExpandedArgs || false);
  if (summary === undefined || summary === null) return null; // summary is used for the default value
  // below check fixes not displaying default values for boolean typescript vars

  const summaryAsString = typeof summary.toString === 'function' ? summary.toString() : summary;

  if (detail == null) {
    const cannotBeSafelySplitted = /[(){}[\]<>]/.test(summaryAsString);

    if (cannotBeSafelySplitted) {
      return /*#__PURE__*/React.createElement(ArgText, {
        text: summaryAsString
      });
    }

    const summaryItems = getSummaryItems(summaryAsString);
    const itemsCount = summaryItems.length;
    const hasManyItems = itemsCount > ITEMS_BEFORE_EXPANSION;
    return hasManyItems ? /*#__PURE__*/React.createElement(Summary, {
      isExpanded: isExpanded
    }, renderSummaryItems(summaryItems, isExpanded), /*#__PURE__*/React.createElement(ExpandButton, {
      onClick: () => setIsExpanded(!isExpanded)
    }, isExpanded ? 'Show less...' : `Show ${itemsCount - ITEMS_BEFORE_EXPANSION} more...`)) : /*#__PURE__*/React.createElement(Summary, null, renderSummaryItems(summaryItems));
  }

  return /*#__PURE__*/React.createElement(WithTooltipPure, {
    closeOnClick: true,
    trigger: "click",
    placement: "bottom",
    tooltipShown: isOpen,
    onVisibilityChange: isVisible => {
      setIsOpen(isVisible);
    },
    tooltip: /*#__PURE__*/React.createElement(Detail, {
      width: calculateDetailWidth(detail)
    }, /*#__PURE__*/React.createElement(SyntaxHighlighter, {
      language: "jsx",
      format: false
    }, detail))
  }, /*#__PURE__*/React.createElement(Expandable, {
    className: "sbdocs-expandable"
  }, /*#__PURE__*/React.createElement("span", null, summaryAsString), /*#__PURE__*/React.createElement(ArrowIcon, {
    icon: isOpen ? 'arrowup' : 'arrowdown'
  })));
};

ArgSummary.displayName = "ArgSummary";
export const ArgValue = ({
  value,
  initialExpandedArgs
}) => {
  return value == null ? /*#__PURE__*/React.createElement(EmptyArg, null) : /*#__PURE__*/React.createElement(ArgSummary, {
    value: value,
    initialExpandedArgs: initialExpandedArgs
  });
};