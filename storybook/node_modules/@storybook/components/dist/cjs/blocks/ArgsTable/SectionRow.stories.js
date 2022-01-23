"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nested = exports.Collapsed = exports.Subsection = exports.Section = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _SectionRow = require("./SectionRow");

var _ArgsTable = require("./ArgsTable");

var _DocumentFormatting = require("../../typography/DocumentFormatting");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _SectionRow.SectionRow,
  title: 'Docs/SectionRow',
  decorators: [function (getStory) {
    return /*#__PURE__*/_react.default.createElement(_DocumentFormatting.ResetWrapper, null, /*#__PURE__*/_react.default.createElement(_ArgsTable.TableWrapper, null, /*#__PURE__*/_react.default.createElement("tbody", null, getStory())));
  }]
};
exports.default = _default;

var Template = function Template(args) {
  return /*#__PURE__*/_react.default.createElement(_SectionRow.SectionRow, args);
};

Template.displayName = "Template";
var Section = Template.bind({});
exports.Section = Section;
Section.args = {
  level: 'section',
  label: 'Props'
};
var Subsection = Template.bind({});
exports.Subsection = Subsection;
Subsection.args = {
  level: 'subsection',
  label: 'HTMLElement'
};
var Collapsed = Template.bind({});
exports.Collapsed = Collapsed;
Collapsed.args = Object.assign({}, Section.args, {
  initialExpanded: false
});

var Nested = function Nested() {
  return /*#__PURE__*/_react.default.createElement(_SectionRow.SectionRow, Section.args, /*#__PURE__*/_react.default.createElement(_SectionRow.SectionRow, Subsection.args, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: 2
  }, "Some content"))));
};

exports.Nested = Nested;
Nested.displayName = "Nested";