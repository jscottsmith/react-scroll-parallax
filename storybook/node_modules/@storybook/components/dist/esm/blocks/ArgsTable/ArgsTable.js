function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
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
export var TableWrapper = styled.table(function (_ref) {
  var _trFirstChild$conca, _trLastChild$concat, _;

  var theme = _ref.theme,
      compact = _ref.compact,
      inAddonPanel = _ref.inAddonPanel;
  return {
    '&&': (_ = {
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
      marginRight: inAddonPanel ? 0 : 1
    }, _defineProperty(_, "tr:first-child".concat(ignoreSsrWarning), (_trFirstChild$conca = {}, _defineProperty(_trFirstChild$conca, "td:first-child".concat(ignoreSsrWarning, ", th:first-child").concat(ignoreSsrWarning), {
      borderTopLeftRadius: inAddonPanel ? 0 : theme.appBorderRadius
    }), _defineProperty(_trFirstChild$conca, "td:last-child".concat(ignoreSsrWarning, ", th:last-child").concat(ignoreSsrWarning), {
      borderTopRightRadius: inAddonPanel ? 0 : theme.appBorderRadius
    }), _trFirstChild$conca)), _defineProperty(_, "tr:last-child".concat(ignoreSsrWarning), (_trLastChild$concat = {}, _defineProperty(_trLastChild$concat, "td:first-child".concat(ignoreSsrWarning, ", th:first-child").concat(ignoreSsrWarning), {
      borderBottomLeftRadius: inAddonPanel ? 0 : theme.appBorderRadius
    }), _defineProperty(_trLastChild$concat, "td:last-child".concat(ignoreSsrWarning, ", th:last-child").concat(ignoreSsrWarning), {
      borderBottomRightRadius: inAddonPanel ? 0 : theme.appBorderRadius
    }), _trLastChild$concat)), _defineProperty(_, "tbody", {
      // slightly different than the other DocBlock shadows to account for table styling gymnastics
      boxShadow: !inAddonPanel && (theme.base === 'light' ? "rgba(0, 0, 0, 0.10) 0 1px 3px 1px,\n          ".concat(transparentize(0.035, theme.appBorderColor), " 0 0 0 1px") : "rgba(0, 0, 0, 0.20) 0 2px 5px 1px,\n          ".concat(opacify(0.05, theme.appBorderColor), " 0 0 0 1px")),
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
      } : _defineProperty({}, "&:not(:first-child".concat(ignoreSsrWarning, ")"), {
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        borderTopColor: theme.base === 'light' ? darken(0.1, theme.background.content) : lighten(0.05, theme.background.content)
      })),
      td: {
        background: theme.background.content
      }
    }), _)
  };
}, function (_ref3) {
  var isLoading = _ref3.isLoading,
      theme = _ref3.theme;
  return isLoading ? {
    'th span, td span, td button': {
      display: 'inline',
      backgroundColor: theme.appBorderColor,
      animation: "".concat(theme.animation.glow, " 1.5s ease-in-out infinite"),
      color: 'transparent',
      boxShadow: 'none',
      borderRadius: 0
    }
  } : {};
});
var ResetButton = styled.button(function (_ref4) {
  var theme = _ref4.theme;
  return {
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
    boxShadow: theme.base === 'light' ? "".concat(theme.color.border, " 0 0 0 1px inset") : "".concat(theme.color.darker, "  0 0 0 1px inset"),
    color: theme.color.secondary,
    '&:hover': {
      background: theme.base === 'light' ? darken(0.03, '#EAF3FC') : opacify(0.1, theme.color.border)
    },
    '&:focus': {
      boxShadow: "".concat(theme.color.secondary, " 0 0 0 1px inset"),
      outline: 'none'
    },
    svg: {
      display: 'block',
      height: 14,
      width: 14
    }
  };
});
var ControlHeadingWrapper = styled.span({
  display: 'flex',
  justifyContent: 'space-between'
});
export var ArgsTableError;

(function (ArgsTableError) {
  ArgsTableError["NO_COMPONENT"] = "No component found.";
  ArgsTableError["ARGS_UNSUPPORTED"] = "Args unsupported. See Args documentation for your framework.";
})(ArgsTableError || (ArgsTableError = {}));

var sortFns = {
  alpha: function alpha(a, b) {
    return a.name.localeCompare(b.name);
  },
  requiredFirst: function requiredFirst(a, b) {
    var _b$type, _a$type;

    return Number(!!((_b$type = b.type) !== null && _b$type !== void 0 && _b$type.required)) - Number(!!((_a$type = a.type) !== null && _a$type !== void 0 && _a$type.required)) || a.name.localeCompare(b.name);
  },
  none: undefined
};

var rowLoadingData = function rowLoadingData(key) {
  return {
    key: key,
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
  };
};

export var argsTableLoadingData = {
  rows: {
    row1: rowLoadingData('row1'),
    row2: rowLoadingData('row2'),
    row3: rowLoadingData('row3')
  }
};

var groupRows = function groupRows(rows, sort) {
  var sections = {
    ungrouped: [],
    ungroupedSubsections: {},
    sections: {}
  };
  if (!rows) return sections;
  Object.entries(rows).forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        row = _ref6[1];

    var _ref7 = (row === null || row === void 0 ? void 0 : row.table) || {},
        category = _ref7.category,
        subcategory = _ref7.subcategory;

    if (category) {
      var section = sections.sections[category] || {
        ungrouped: [],
        subsections: {}
      };

      if (!subcategory) {
        section.ungrouped.push(Object.assign({
          key: key
        }, row));
      } else {
        var subsection = section.subsections[subcategory] || [];
        subsection.push(Object.assign({
          key: key
        }, row));
        section.subsections[subcategory] = subsection;
      }

      sections.sections[category] = section;
    } else if (subcategory) {
      var _subsection = sections.ungroupedSubsections[subcategory] || [];

      _subsection.push(Object.assign({
        key: key
      }, row));

      sections.ungroupedSubsections[subcategory] = _subsection;
    } else {
      sections.ungrouped.push(Object.assign({
        key: key
      }, row));
    }
  }); // apply sort

  var sortFn = sortFns[sort];

  var sortSubsection = function sortSubsection(record) {
    if (!sortFn) return record;
    return Object.keys(record).reduce(function (acc, cur) {
      return Object.assign({}, acc, _defineProperty({}, cur, record[cur].sort(sortFn)));
    }, {});
  };

  var sorted = {
    ungrouped: sections.ungrouped.sort(sortFn),
    ungroupedSubsections: sortSubsection(sections.ungroupedSubsections),
    sections: Object.keys(sections.sections).reduce(function (acc, cur) {
      return Object.assign({}, acc, _defineProperty({}, cur, {
        ungrouped: sections.sections[cur].ungrouped.sort(sortFn),
        subsections: sortSubsection(sections.sections[cur].subsections)
      }));
    }, {})
  };
  return sorted;
};
/**
 * Display the props for a component as a props table. Each row is a collection of
 * ArgDefs, usually derived from docgen info for the component.
 */


export var ArgsTable = function ArgsTable(props) {
  if ('error' in props) {
    return /*#__PURE__*/React.createElement(EmptyBlock, null, props.error, "\xA0", /*#__PURE__*/React.createElement(Link, {
      href: "http://storybook.js.org/docs/",
      target: "_blank",
      withArrow: true
    }, "Read the docs"));
  }

  var updateArgs = props.updateArgs,
      resetArgs = props.resetArgs,
      compact = props.compact,
      inAddonPanel = props.inAddonPanel,
      initialExpandedArgs = props.initialExpandedArgs,
      _props$sort = props.sort,
      sort = _props$sort === void 0 ? 'none' : _props$sort;
  var isLoading = ('isLoading' in props);

  var _ref8 = 'rows' in props ? props : argsTableLoadingData,
      rows = _ref8.rows,
      args = _ref8.args;

  var groups = groupRows(pickBy(rows, function (row) {
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

  var colSpan = 1;
  if (updateArgs) colSpan += 1;
  if (!compact) colSpan += 2;
  var expandable = Object.keys(groups.sections).length > 0;
  var common = {
    updateArgs: updateArgs,
    compact: compact,
    inAddonPanel: inAddonPanel,
    initialExpandedArgs: initialExpandedArgs
  };
  return /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(TableWrapper, {
    "aria-hidden": isLoading,
    compact: compact,
    inAddonPanel: inAddonPanel,
    isLoading: isLoading,
    className: "docblock-argstable"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "docblock-argstable-head"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("span", null, "Name")), compact ? null : /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("span", null, "Description")), compact ? null : /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement("span", null, "Default")), updateArgs ? /*#__PURE__*/React.createElement("th", null, /*#__PURE__*/React.createElement(ControlHeadingWrapper, null, "Control", ' ', !isLoading && resetArgs && /*#__PURE__*/React.createElement(ResetButton, {
    onClick: function onClick() {
      return resetArgs();
    },
    title: "Reset controls"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "undo",
    "aria-hidden": true
  })))) : null)), /*#__PURE__*/React.createElement("tbody", {
    className: "docblock-argstable-body"
  }, groups.ungrouped.map(function (row) {
    return /*#__PURE__*/React.createElement(ArgRow, _extends({
      key: row.key,
      row: row,
      arg: args && args[row.key]
    }, common));
  }), Object.entries(groups.ungroupedSubsections).map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        subcategory = _ref10[0],
        subsection = _ref10[1];

    return /*#__PURE__*/React.createElement(SectionRow, {
      key: subcategory,
      label: subcategory,
      level: "subsection",
      colSpan: colSpan
    }, subsection.map(function (row) {
      return /*#__PURE__*/React.createElement(ArgRow, _extends({
        key: row.key,
        row: row,
        arg: args && args[row.key],
        expandable: expandable
      }, common));
    }));
  }), Object.entries(groups.sections).map(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        category = _ref12[0],
        section = _ref12[1];

    return /*#__PURE__*/React.createElement(SectionRow, {
      key: category,
      label: category,
      level: "section",
      colSpan: colSpan
    }, section.ungrouped.map(function (row) {
      return /*#__PURE__*/React.createElement(ArgRow, _extends({
        key: row.key,
        row: row,
        arg: args && args[row.key]
      }, common));
    }), Object.entries(section.subsections).map(function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          subcategory = _ref14[0],
          subsection = _ref14[1];

      return /*#__PURE__*/React.createElement(SectionRow, {
        key: subcategory,
        label: subcategory,
        level: "subsection",
        colSpan: colSpan
      }, subsection.map(function (row) {
        return /*#__PURE__*/React.createElement(ArgRow, _extends({
          key: row.key,
          row: row,
          arg: args && args[row.key],
          expandable: expandable
        }, common));
      }));
    }));
  }))));
};
ArgsTable.displayName = "ArgsTable";