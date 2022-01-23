function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.array.reduce.js";
import React from 'react';
import pickBy from 'lodash/pickBy';
import { styled, ignoreSsrWarning } from '@storybook/theming';
import { opacify, transparentize, darken, lighten } from 'polished';
import { Icons } from '../../icon/icon';
import { ArgRow } from './ArgRow';
import { SectionRow } from './SectionRow';
import { EmptyBlock } from '../EmptyBlock';
import { Link } from '../../typography/link/link';
import { ResetWrapper } from '../../typography/DocumentFormatting';
export const TableWrapper = styled.table(({
  theme,
  compact,
  inAddonPanel
}) => ({
  '&&': {
    // Resets for cascading/system styles
    borderCollapse: 'collapse',
    borderSpacing: 0,
    color: theme.color.defaultText,
    'td, th': {
      padding: 0,
      border: 'none',
      verticalAlign: 'top',
      textOverflow: 'ellipsis'
    },
    // End Resets
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '20px',
    textAlign: 'left',
    width: '100%',
    // Margin collapse
    marginTop: inAddonPanel ? 0 : 25,
    marginBottom: inAddonPanel ? 0 : 40,
    'thead th:first-of-type, td:first-of-type': {
      // intentionally specify thead here
      width: '25%'
    },
    'th:first-of-type, td:first-of-type': {
      paddingLeft: 20
    },
    'th:nth-of-type(2), td:nth-of-type(2)': Object.assign({}, compact ? null : {
      // Description column
      width: '35%'
    }),
    'td:nth-of-type(3)': Object.assign({}, compact ? null : {
      // Defaults column
      width: '15%'
    }),
    'th:last-of-type, td:last-of-type': Object.assign({
      paddingRight: 20
    }, compact ? null : {
      // Controls column
      width: '25%'
    }),
    th: {
      color: theme.base === 'light' ? transparentize(0.25, theme.color.defaultText) : transparentize(0.45, theme.color.defaultText),
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15
    },
    td: {
      paddingTop: '10px',
      paddingBottom: '10px',
      '&:not(:first-of-type)': {
        paddingLeft: 15,
        paddingRight: 15
      },
      '&:last-of-type': {
        paddingRight: 20
      }
    },
    // Table "block" styling
    // Emphasize tbody's background and set borderRadius
    // Calling out because styling tables is finicky
    // Makes border alignment consistent w/other DocBlocks
    marginLeft: inAddonPanel ? 0 : 1,
    marginRight: inAddonPanel ? 0 : 1,
    [`tr:first-child${ignoreSsrWarning}`]: {
      [`td:first-child${ignoreSsrWarning}, th:first-child${ignoreSsrWarning}`]: {
        borderTopLeftRadius: inAddonPanel ? 0 : theme.appBorderRadius
      },
      [`td:last-child${ignoreSsrWarning}, th:last-child${ignoreSsrWarning}`]: {
        borderTopRightRadius: inAddonPanel ? 0 : theme.appBorderRadius
      }
    },
    [`tr:last-child${ignoreSsrWarning}`]: {
      [`td:first-child${ignoreSsrWarning}, th:first-child${ignoreSsrWarning}`]: {
        borderBottomLeftRadius: inAddonPanel ? 0 : theme.appBorderRadius
      },
      [`td:last-child${ignoreSsrWarning}, th:last-child${ignoreSsrWarning}`]: {
        borderBottomRightRadius: inAddonPanel ? 0 : theme.appBorderRadius
      }
    },
    tbody: {
      // slightly different than the other DocBlock shadows to account for table styling gymnastics
      boxShadow: !inAddonPanel && (theme.base === 'light' ? `rgba(0, 0, 0, 0.10) 0 1px 3px 1px,
          ${transparentize(0.035, theme.appBorderColor)} 0 0 0 1px` : `rgba(0, 0, 0, 0.20) 0 2px 5px 1px,
          ${opacify(0.05, theme.appBorderColor)} 0 0 0 1px`),
      borderRadius: theme.appBorderRadius,
      // for safari only
      // CSS hack courtesy of https://stackoverflow.com/questions/16348489/is-there-a-css-hack-for-safari-only-not-chrome
      '@media not all and (min-resolution:.001dpcm)': {
        '@supports (-webkit-appearance:none)': Object.assign({
          borderWidth: 1,
          borderStyle: 'solid'
        }, inAddonPanel && {
          borderColor: 'transparent'
        }, !inAddonPanel && {
          borderColor: theme.base === 'light' ? transparentize(0.035, theme.appBorderColor) : opacify(0.05, theme.appBorderColor)
        })
      },
      tr: Object.assign({
        background: 'transparent',
        overflow: 'hidden'
      }, inAddonPanel ? {
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: theme.base === 'light' ? darken(0.1, theme.background.content) : lighten(0.05, theme.background.content)
      } : {
        [`&:not(:first-child${ignoreSsrWarning})`]: {
          borderTopWidth: 1,
          borderTopStyle: 'solid',
          borderTopColor: theme.base === 'light' ? darken(0.1, theme.background.content) : lighten(0.05, theme.background.content)
        }
      }),
      td: {
        background: theme.background.content
      }
    } // End finicky table styling

  }
}), ({
  isLoading,
  theme
}) => isLoading ? {
  'th span, td span, td button': {
    display: 'inline',
    backgroundColor: theme.appBorderColor,
    animation: `${theme.animation.glow} 1.5s ease-in-out infinite`,
    color: 'transparent',
    boxShadow: 'none',
    borderRadius: 0
  }
} : {});
const ResetButton = styled.button(({
  theme
}) => ({
  border: 0,
  borderRadius: '3em',
  cursor: 'pointer',
  display: 'inline-block',
  overflow: 'hidden',
  padding: '3px 8px',
  transition: 'all 150ms ease-out',
  verticalAlign: 'top',
  userSelect: 'none',
  margin: 0,
  backgroundColor: theme.base === 'light' ? '#EAF3FC' : theme.color.border,
  boxShadow: theme.base === 'light' ? `${theme.color.border} 0 0 0 1px inset` : `${theme.color.darker}  0 0 0 1px inset`,
  color: theme.color.secondary,
  '&:hover': {
    background: theme.base === 'light' ? darken(0.03, '#EAF3FC') : opacify(0.1, theme.color.border)
  },
  '&:focus': {
    boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    outline: 'none'
  },
  svg: {
    display: 'block',
    height: 14,
    width: 14
  }
}));
const ControlHeadingWrapper = styled.span({
  display: 'flex',
  justifyContent: 'space-between'
});
export let ArgsTableError;

(function (ArgsTableError) {
  ArgsTableError["NO_COMPONENT"] = "No component found.";
  ArgsTableError["ARGS_UNSUPPORTED"] = "Args unsupported. See Args documentation for your framework.";
})(ArgsTableError || (ArgsTableError = {}));

const sortFns = {
  alpha: (a, b) => a.name.localeCompare(b.name),
  requiredFirst: (a, b) => {
    var _b$type, _a$type;

    return Number(!!((_b$type = b.type) !== null && _b$type !== void 0 && _b$type.required)) - Number(!!((_a$type = a.type) !== null && _a$type !== void 0 && _a$type.required)) || a.name.localeCompare(b.name);
  },
  none: undefined
};

const rowLoadingData = key => ({
  key,
  name: 'propertyName',
  description: 'This is a short description',
  control: {
    type: 'text'
  },
  table: {
    type: {
      summary: 'summary'
    },
    defaultValue: {
      summary: 'defaultValue'
    }
  }
});

export const argsTableLoadingData = {
  rows: {
    row1: rowLoadingData('row1'),
    row2: rowLoadingData('row2'),
    row3: rowLoadingData('row3')
  }
};

const groupRows = (rows, sort) => {
  const sections = {
    ungrouped: [],
    ungroupedSubsections: {},
    sections: {}
  };
  if (!rows) return sections;
  Object.entries(rows).forEach(([key, row]) => {
    const {
      category,
      subcategory
    } = (row === null || row === void 0 ? void 0 : row.table) || {};

    if (category) {
      const section = sections.sections[category] || {
        ungrouped: [],
        subsections: {}
      };

      if (!subcategory) {
        section.ungrouped.push(Object.assign({
          key
        }, row));
      } else {
        const subsection = section.subsections[subcategory] || [];
        subsection.push(Object.assign({
          key
        }, row));
        section.subsections[subcategory] = subsection;
      }

      sections.sections[category] = section;
    } else if (subcategory) {
      const subsection = sections.ungroupedSubsections[subcategory] || [];
      subsection.push(Object.assign({
        key
      }, row));
      sections.ungroupedSubsections[subcategory] = subsection;
    } else {
      sections.ungrouped.push(Object.assign({
        key
      }, row));
    }
  }); // apply sort

  const sortFn = sortFns[sort];

  const sortSubsection = record => {
    if (!sortFn) return record;
    return Object.keys(record).reduce((acc, cur) => Object.assign({}, acc, {
      [cur]: record[cur].sort(sortFn)
    }), {});
  };

  const sorted = {
    ungrouped: sections.ungrouped.sort(sortFn),
    ungroupedSubsections: sortSubsection(sections.ungroupedSubsections),
    sections: Object.keys(sections.sections).reduce((acc, cur) => Object.assign({}, acc, {
      [cur]: {
        ungrouped: sections.sections[cur].ungrouped.sort(sortFn),
        subsections: sortSubsection(sections.sections[cur].subsections)
      }
    }), {})
  };
  return sorted;
};
/**
 * Display the props for a component as a props table. Each row is a collection of
 * ArgDefs, usually derived from docgen info for the component.
 */


export const ArgsTable = props => {
  if ('error' in props) {
    return /*#__PURE__*/React.createElement(EmptyBlock, null, props.error, "\xA0", /*#__PURE__*/React.createElement(Link, {
      href: "http://storybook.js.org/docs/",
      target: "_blank",
      withArrow: true
    }, "Read the docs"));
  }

  const {
    updateArgs,
    resetArgs,
    compact,
    inAddonPanel,
    initialExpandedArgs,
    sort = 'none'
  } = props;
  const isLoading = ('isLoading' in props);
  const {
    rows,
    args
  } = 'rows' in props ? props : argsTableLoadingData;
  const groups = groupRows(pickBy(rows, row => {
    var _row$table;

    return !(row !== null && row !== void 0 && (_row$table = row.table) !== null && _row$table !== void 0 && _row$table.disable);
  }), sort);

  if (groups.ungrouped.length === 0 && Object.entries(groups.sections).length === 0 && Object.entries(groups.ungroupedSubsections).length === 0) {
    return /*#__PURE__*/React.createElement(EmptyBlock, null, "No inputs found for this component.\xA0", /*#__PURE__*/React.createElement(Link, {
      href: "http://storybook.js.org/docs/",
      target: "_blank",
      withArrow: true
    }, "Read the docs"));
  }

  let colSpan = 1;
  if (updateArgs) colSpan += 1;
  if (!compact) colSpan += 2;
  const expandable = Object.keys(groups.sections).length > 0;
  const common = {
    updateArgs,
    compact,
    inAddonPanel,
    initialExpandedArgs
  };
  return /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(TableWrapper, {
    "aria-hidden": isLoading,
    compact,
    inAddonPanel,
    isLoading,
    className: "docblock-argstable"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "docblock-argstable-head"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("span", null, "Name")), compact ? null : /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("span", null, "Description")), compact ? null : /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("span", null, "Default")), updateArgs ? /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement(ControlHeadingWrapper, null, "Control", ' ', !isLoading && resetArgs && /*#__PURE__*/React.createElement(ResetButton, {
    onClick: () => resetArgs(),
    title: "Reset controls"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "undo",
    "aria-hidden": true
  })))) : null)), /*#__PURE__*/React.createElement("tbody", {
    className: "docblock-argstable-body"
  }, groups.ungrouped.map(row => /*#__PURE__*/React.createElement(ArgRow, _extends({
    key: row.key,
    row: row,
    arg: args && args[row.key]
  }, common))), Object.entries(groups.ungroupedSubsections).map(([subcategory, subsection]) => /*#__PURE__*/React.createElement(SectionRow, {
    key: subcategory,
    label: subcategory,
    level: "subsection",
    colSpan: colSpan
  }, subsection.map(row => /*#__PURE__*/React.createElement(ArgRow, _extends({
    key: row.key,
    row: row,
    arg: args && args[row.key],
    expandable: expandable
  }, common))))), Object.entries(groups.sections).map(([category, section]) => /*#__PURE__*/React.createElement(SectionRow, {
    key: category,
    label: category,
    level: "section",
    colSpan: colSpan
  }, section.ungrouped.map(row => /*#__PURE__*/React.createElement(ArgRow, _extends({
    key: row.key,
    row: row,
    arg: args && args[row.key]
  }, common))), Object.entries(section.subsections).map(([subcategory, subsection]) => /*#__PURE__*/React.createElement(SectionRow, {
    key: subcategory,
    label: subcategory,
    level: "subsection",
    colSpan: colSpan
  }, subsection.map(row => /*#__PURE__*/React.createElement(ArgRow, _extends({
    key: row.key,
    row: row,
    arg: args && args[row.key],
    expandable: expandable
  }, common))))))))));
};
ArgsTable.displayName = "ArgsTable";