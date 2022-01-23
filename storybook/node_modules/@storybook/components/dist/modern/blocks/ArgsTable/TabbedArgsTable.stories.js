import React from 'react';
import { TabbedArgsTable } from './TabbedArgsTable';
import { Normal, Compact, Sections } from './ArgsTable.stories';
export default {
  component: TabbedArgsTable,
  title: 'Docs/TabbedArgsTable'
};

const Template = args => /*#__PURE__*/React.createElement(TabbedArgsTable, args);

Template.displayName = "Template";
export const Tabs = Template.bind({});
Tabs.args = {
  tabs: {
    Normal: Normal.args,
    Compact: Compact.args,
    Sections: Sections.args
  }
};
export const TabsInAddonPanel = Template.bind({});
TabsInAddonPanel.args = {
  tabs: {
    Normal: Normal.args,
    Compact: Compact.args,
    Sections: Sections.args
  },
  inAddonPanel: true
};
export const Empty = Template.bind({});
Empty.args = {
  tabs: {}
};