"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithDefaultExpandedArgs = exports.Empty = exports.Error = exports.AllControls = exports.SubsectionsOnly = exports.SectionsAndSubsections = exports.SectionsCompact = exports.Sections = exports.InAddonPanelWithWarning = exports.InAddonPanel = exports.Compact = exports.Normal = exports.Loading = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _theming = require("@storybook/theming");

var _ArgsTable = require("./ArgsTable");

var _NoControlsWarning = require("./NoControlsWarning");

var ArgRow = _interopRequireWildcard(require("./ArgRow.stories"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _ArgsTable.ArgsTable,
  title: 'Docs/ArgsTable',
  args: {
    updateArgs: (0, _addonActions.action)('updateArgs'),
    resetArgs: (0, _addonActions.action)('resetArgs')
  }
};
exports.default = _default;
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
  return /*#__PURE__*/_react.default.createElement(_ArgsTable.ArgsTable, args);
};

Template.displayName = "Template";
var Loading = Template.bind({});
exports.Loading = Loading;
Loading.args = {
  isLoading: true
};
var Normal = Template.bind({});
exports.Normal = Normal;
Normal.args = {
  rows: {
    stringType: stringType,
    numberType: numberType
  }
};
var Compact = Template.bind({});
exports.Compact = Compact;
Compact.args = Object.assign({}, Normal.args, {
  compact: true
});

var AddonPanelLayout = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    fontSize: theme.typography.size.s2 - 1,
    background: theme.background.content
  };
});

var InAddonPanel = Template.bind({});
exports.InAddonPanel = InAddonPanel;
InAddonPanel.args = Object.assign({}, Normal.args, {
  inAddonPanel: true
});
InAddonPanel.decorators = [function (storyFn) {
  return /*#__PURE__*/_react.default.createElement(AddonPanelLayout, null, storyFn());
}];

var InAddonPanelWithWarning = function InAddonPanelWithWarning(args) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_NoControlsWarning.NoControlsWarning, null), /*#__PURE__*/_react.default.createElement(_ArgsTable.ArgsTable, args));
};

exports.InAddonPanelWithWarning = InAddonPanelWithWarning;
InAddonPanelWithWarning.args = Object.assign({}, InAddonPanel.args, {
  updateArgs: null
});
InAddonPanelWithWarning.decorators = InAddonPanel.decorators;
var Sections = Template.bind({});
exports.Sections = Sections;
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
var SectionsCompact = Template.bind({});
exports.SectionsCompact = SectionsCompact;
SectionsCompact.args = Object.assign({}, Sections.args, {
  compact: true
});
var SectionsAndSubsections = Template.bind({});
exports.SectionsAndSubsections = SectionsAndSubsections;
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
var SubsectionsOnly = Template.bind({});
exports.SubsectionsOnly = SubsectionsOnly;
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
var AllControls = Template.bind({});
exports.AllControls = AllControls;
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
var Error = Template.bind({});
exports.Error = Error;
Error.args = {
  error: _ArgsTable.ArgsTableError.NO_COMPONENT
};
var Empty = Template.bind({});
exports.Empty = Empty;
Empty.args = {
  rows: {}
};
var WithDefaultExpandedArgs = Template.bind({});
exports.WithDefaultExpandedArgs = WithDefaultExpandedArgs;
WithDefaultExpandedArgs.args = {
  rows: {
    longEnumType: longEnumType
  },
  initialExpandedArgs: true
};