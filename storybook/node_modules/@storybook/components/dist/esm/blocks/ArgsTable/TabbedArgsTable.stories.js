import React from 'react';
import { TabbedArgsTable } from './TabbedArgsTable';
import { Normal, Compact, Sections } from './ArgsTable.stories';
export default {
  component: TabbedArgsTable,
  title: 'Docs/TabbedArgsTable'
};

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(TabbedArgsTable, args);
};

Template.displayName = "Template";
export var Tabs = Template.bind({});
Tabs.args = {
  tabs: {
    Normal: Normal.args,
    Compact: Compact.args,
    Sections: Sections.args
  }
};
export var TabsInAddonPanel = Template.bind({});
TabsInAddonPanel.args = {
  tabs: {
    Normal: Normal.args,
    Compact: Compact.args,
    Sections: Sections.args
  },
  inAddonPanel: true
};
export var Empty = Template.bind({});
Empty.args = {
  tabs: {}
};