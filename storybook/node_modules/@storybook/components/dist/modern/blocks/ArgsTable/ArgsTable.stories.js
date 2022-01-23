import React from 'react';
import { action } from '@storybook/addon-actions';
import { styled } from '@storybook/theming';
import { ArgsTable, ArgsTableError } from './ArgsTable';
import { NoControlsWarning } from './NoControlsWarning';
import * as ArgRow from './ArgRow.stories';
export default {
  component: ArgsTable,
  title: 'Docs/ArgsTable',
  args: {
    updateArgs: action('updateArgs'),
    resetArgs: action('resetArgs')
  }
};
const propsSection = {
  category: 'props '
};
const eventsSection = {
  category: 'events '
};
const componentSubsection = {
  subcategory: 'MyComponent '
};
const htmlElementSubsection = {
  subcategory: 'HTMLElement'
};
const stringType = ArgRow.String.args.row;
const numberType = ArgRow.Number.args.row;
const longEnumType = ArgRow.LongEnum.args.row;

const Template = args => /*#__PURE__*/React.createElement(ArgsTable, args);

Template.displayName = "Template";
export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};
export const Normal = Template.bind({});
Normal.args = {
  rows: {
    stringType,
    numberType
  }
};
export const Compact = Template.bind({});
Compact.args = Object.assign({}, Normal.args, {
  compact: true
});
const AddonPanelLayout = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s2 - 1,
  background: theme.background.content
}));
export const InAddonPanel = Template.bind({});
InAddonPanel.args = Object.assign({}, Normal.args, {
  inAddonPanel: true
});
InAddonPanel.decorators = [storyFn => /*#__PURE__*/React.createElement(AddonPanelLayout, null, storyFn())];
export const InAddonPanelWithWarning = args => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NoControlsWarning, null), /*#__PURE__*/React.createElement(ArgsTable, args));
InAddonPanelWithWarning.args = Object.assign({}, InAddonPanel.args, {
  updateArgs: null
});
InAddonPanelWithWarning.decorators = InAddonPanel.decorators;
export const Sections = Template.bind({});
Sections.args = {
  rows: {
    a: Object.assign({}, stringType, {
      table: Object.assign({}, stringType.table, propsSection)
    }),
    b: Object.assign({}, numberType, {
      table: Object.assign({}, stringType.table, propsSection)
    }),
    c: Object.assign({}, stringType, {
      table: Object.assign({}, stringType.table, eventsSection)
    })
  }
};
export const SectionsCompact = Template.bind({});
SectionsCompact.args = Object.assign({}, Sections.args, {
  compact: true
});
export const SectionsAndSubsections = Template.bind({});
SectionsAndSubsections.args = {
  rows: {
    a: Object.assign({}, stringType, {
      table: Object.assign({}, stringType.table, propsSection, componentSubsection)
    }),
    b: Object.assign({}, numberType, {
      table: Object.assign({}, stringType.table, propsSection, componentSubsection)
    }),
    c: Object.assign({}, stringType, {
      table: Object.assign({}, stringType.table, eventsSection, componentSubsection)
    }),
    d: Object.assign({}, stringType, {
      table: Object.assign({}, stringType.table, eventsSection, htmlElementSubsection)
    })
  }
};
export const SubsectionsOnly = Template.bind({});
SubsectionsOnly.args = {
  rows: {
    a: Object.assign({}, stringType, {
      table: Object.assign({}, stringType.table, componentSubsection)
    }),
    b: Object.assign({}, numberType, {
      table: Object.assign({}, stringType.table, componentSubsection)
    }),
    c: Object.assign({}, stringType, {
      table: Object.assign({}, stringType.table, componentSubsection)
    }),
    d: Object.assign({}, stringType, {
      table: Object.assign({}, stringType.table, htmlElementSubsection)
    })
  }
};
export const AllControls = Template.bind({});
AllControls.args = {
  rows: {
    array: ArgRow.ArrayOf.args.row,
    boolean: ArgRow.Boolean.args.row,
    color: ArgRow.Color.args.row,
    date: ArgRow.Date.args.row,
    string: ArgRow.String.args.row,
    number: ArgRow.Number.args.row,
    range: ArgRow.Number.args.row,
    radio: ArgRow.Radio.args.row,
    inlineRadio: ArgRow.InlineRadio.args.row,
    check: ArgRow.Check.args.row,
    inlineCheck: ArgRow.InlineCheck.args.row,
    select: ArgRow.Select.args.row,
    multiSelect: ArgRow.MultiSelect.args.row,
    object: ArgRow.ObjectOf.args.row,
    func: ArgRow.Func.args.row
  }
};
export const Error = Template.bind({});
Error.args = {
  error: ArgsTableError.NO_COMPONENT
};
export const Empty = Template.bind({});
Empty.args = {
  rows: {}
};
export const WithDefaultExpandedArgs = Template.bind({});
WithDefaultExpandedArgs.args = {
  rows: {
    longEnumType
  },
  initialExpandedArgs: true
};