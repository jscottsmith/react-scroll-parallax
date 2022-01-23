import "core-js/modules/es.object.assign.js";
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
var propsSection = {
  category: 'props '
};
var eventsSection = {
  category: 'events '
};
var componentSubsection = {
  subcategory: 'MyComponent '
};
var htmlElementSubsection = {
  subcategory: 'HTMLElement'
};
var stringType = ArgRow.String.args.row;
var numberType = ArgRow.Number.args.row;
var longEnumType = ArgRow.LongEnum.args.row;

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(ArgsTable, args);
};

Template.displayName = "Template";
export var Loading = Template.bind({});
Loading.args = {
  isLoading: true
};
export var Normal = Template.bind({});
Normal.args = {
  rows: {
    stringType: stringType,
    numberType: numberType
  }
};
export var Compact = Template.bind({});
Compact.args = Object.assign({}, Normal.args, {
  compact: true
});
var AddonPanelLayout = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    fontSize: theme.typography.size.s2 - 1,
    background: theme.background.content
  };
});
export var InAddonPanel = Template.bind({});
InAddonPanel.args = Object.assign({}, Normal.args, {
  inAddonPanel: true
});
InAddonPanel.decorators = [function (storyFn) {
  return /*#__PURE__*/React.createElement(AddonPanelLayout, null, storyFn());
}];
export var InAddonPanelWithWarning = function InAddonPanelWithWarning(args) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NoControlsWarning, null), /*#__PURE__*/React.createElement(ArgsTable, args));
};
InAddonPanelWithWarning.args = Object.assign({}, InAddonPanel.args, {
  updateArgs: null
});
InAddonPanelWithWarning.decorators = InAddonPanel.decorators;
export var Sections = Template.bind({});
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
export var SectionsCompact = Template.bind({});
SectionsCompact.args = Object.assign({}, Sections.args, {
  compact: true
});
export var SectionsAndSubsections = Template.bind({});
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
export var SubsectionsOnly = Template.bind({});
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
export var AllControls = Template.bind({});
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
export var Error = Template.bind({});
Error.args = {
  error: ArgsTableError.NO_COMPONENT
};
export var Empty = Template.bind({});
Empty.args = {
  rows: {}
};
export var WithDefaultExpandedArgs = Template.bind({});
WithDefaultExpandedArgs.args = {
  rows: {
    longEnumType: longEnumType
  },
  initialExpandedArgs: true
};