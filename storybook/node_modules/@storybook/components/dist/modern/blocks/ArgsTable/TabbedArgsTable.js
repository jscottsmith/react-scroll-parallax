function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { ArgsTable } from './ArgsTable';
import { TabsState } from '../../tabs/tabs';
export const TabbedArgsTable = (_ref) => {
  let {
    tabs
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["tabs"]);

  const entries = Object.entries(tabs);

  if (entries.length === 1) {
    return /*#__PURE__*/React.createElement(ArgsTable, _extends({}, entries[0][1], props));
  }

  return /*#__PURE__*/React.createElement(TabsState, null, entries.map(entry => {
    const [label, table] = entry;
    const id = `prop_table_div_${label}`;
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      id: id,
      title: label
    }, ({
      active
    }) => active ? /*#__PURE__*/React.createElement(ArgsTable, _extends({
      key: `prop_table_${label}`
    }, table, props)) : null);
  }));
};
TabbedArgsTable.displayName = "TabbedArgsTable";