import "core-js/modules/es.object.assign.js";
import React from 'react';
import { SectionRow } from './SectionRow';
import { TableWrapper } from './ArgsTable';
import { ResetWrapper } from '../../typography/DocumentFormatting';
export default {
  component: SectionRow,
  title: 'Docs/SectionRow',
  decorators: [function (getStory) {
    return /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(TableWrapper, null, /*#__PURE__*/React.createElement("tbody", null, getStory())));
  }]
};

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(SectionRow, args);
};

Template.displayName = "Template";
export var Section = Template.bind({});
Section.args = {
  level: 'section',
  label: 'Props'
};
export var Subsection = Template.bind({});
Subsection.args = {
  level: 'subsection',
  label: 'HTMLElement'
};
export var Collapsed = Template.bind({});
Collapsed.args = Object.assign({}, Section.args, {
  initialExpanded: false
});
export var Nested = function Nested() {
  return /*#__PURE__*/React.createElement(SectionRow, Section.args, /*#__PURE__*/React.createElement(SectionRow, Subsection.args, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 2
  }, "Some content"))));
};
Nested.displayName = "Nested";