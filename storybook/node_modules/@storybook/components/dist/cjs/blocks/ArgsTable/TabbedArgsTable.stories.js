"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Empty = exports.TabsInAddonPanel = exports.Tabs = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TabbedArgsTable = require("./TabbedArgsTable");

var _ArgsTable = require("./ArgsTable.stories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _TabbedArgsTable.TabbedArgsTable,
  title: 'Docs/TabbedArgsTable'
};
exports.default = _default;

var Template = function Template(args) {
  return /*#__PURE__*/_react.default.createElement(_TabbedArgsTable.TabbedArgsTable, args);
};

Template.displayName = "Template";
var Tabs = Template.bind({});
exports.Tabs = Tabs;
Tabs.args = {
  tabs: {
    Normal: _ArgsTable.Normal.args,
    Compact: _ArgsTable.Compact.args,
    Sections: _ArgsTable.Sections.args
  }
};
var TabsInAddonPanel = Template.bind({});
exports.TabsInAddonPanel = TabsInAddonPanel;
TabsInAddonPanel.args = {
  tabs: {
    Normal: _ArgsTable.Normal.args,
    Compact: _ArgsTable.Compact.args,
    Sections: _ArgsTable.Sections.args
  },
  inAddonPanel: true
};
var Empty = Template.bind({});
exports.Empty = Empty;
Empty.args = {
  tabs: {}
};