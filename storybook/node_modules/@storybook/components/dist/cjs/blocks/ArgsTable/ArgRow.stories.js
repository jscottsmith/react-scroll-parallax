"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringNoControlsCompact = exports.StringNoControls = exports.StringCompact = exports.Markdown = exports.ComplexUnion = exports.LongEnum = exports.Enum = exports.Func = exports.ComplexObject = exports.ArrayOf = exports.ObjectOf = exports.MultiSelect = exports.Select = exports.InlineCheck = exports.Check = exports.InlineRadio = exports.Radio = exports.Range = exports.Number = exports.Date = exports.Color = exports.Boolean = exports.LongDesc = exports.LongName = exports.String = exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _ArgRow = require("./ArgRow");

var _ArgsTable = require("./ArgsTable");

var _DocumentFormatting = require("../../typography/DocumentFormatting");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _ArgRow.ArgRow,
  title: 'Docs/ArgRow',
  decorators: [function (getStory) {
    return /*#__PURE__*/_react.default.createElement(_DocumentFormatting.ResetWrapper, null, /*#__PURE__*/_react.default.createElement(_ArgsTable.TableWrapper, null, /*#__PURE__*/_react.default.createElement("tbody", null, getStory())));
  }]
};
exports.default = _default;

var Template = function Template(args) {
  return /*#__PURE__*/_react.default.createElement(_ArgRow.ArgRow, args);
};

Template.displayName = "Template";
var baseArgs = {
  updateArgs: (0, _addonActions.action)('updateArgs')
};
var String = Template.bind({});
exports.String = String;
String.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someString',
    name: 'Some String',
    description: 'someString description',
    type: {
      required: true
    },
    control: {
      type: 'text'
    },
    table: {
      type: {
        summary: 'string'
      },
      defaultValue: {
        summary: 'reallylongstringnospaces'
      }
    }
  }
});
var LongName = Template.bind({});
exports.LongName = LongName;
LongName.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, String.args.row, {
    name: 'Really Long String That Takes Up Space'
  })
});
var LongDesc = Template.bind({});
exports.LongDesc = LongDesc;
LongDesc.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, String.args.row, {
    description: 'really long description that takes up a lot of space. sometimes this happens.'
  })
});
var Boolean = Template.bind({});
exports.Boolean = Boolean;
Boolean.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someBoolean',
    name: 'Some Boolean',
    description: 'someBoolean description',
    type: {
      required: true
    },
    control: {
      type: 'boolean'
    },
    table: {
      type: {
        summary: 'string'
      },
      defaultValue: {
        summary: 'fixme'
      }
    }
  }
});
var Color = Template.bind({});
exports.Color = Color;
Color.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someColor',
    name: 'Some Color',
    type: {
      name: 'string'
    },
    description: 'someColor description',
    defaultValue: '#ff0',
    control: {
      type: 'color'
    }
  }
});
var Date = Template.bind({});
exports.Date = Date;
Date.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someDate',
    name: 'Some Date',
    type: {
      name: 'string'
    },
    description: 'someDate description',
    control: {
      type: 'date'
    }
  }
});
var Number = Template.bind({});
exports.Number = Number;
Number.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someNumber',
    name: 'Some Number',
    description: 'someNumber description',
    type: {
      required: false
    },
    table: {
      type: {
        summary: 'number'
      },
      defaultValue: {
        summary: '0'
      }
    },
    control: {
      type: 'number'
    }
  }
});
var Range = Template.bind({});
exports.Range = Range;
Range.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Number.args.row, {
    control: {
      type: 'range'
    }
  })
});
var Radio = Template.bind({});
exports.Radio = Radio;
Radio.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someEnum',
    name: 'Some Enum',
    description: 'someEnum description',
    control: {
      type: 'radio',
      options: ['a', 'b', 'c']
    }
  }
});
var InlineRadio = Template.bind({});
exports.InlineRadio = InlineRadio;
InlineRadio.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'inline-radio'
    })
  })
});
var Check = Template.bind({});
exports.Check = Check;
Check.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'check'
    })
  })
});
var InlineCheck = Template.bind({});
exports.InlineCheck = InlineCheck;
InlineCheck.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'inline-check'
    })
  })
});
var Select = Template.bind({});
exports.Select = Select;
Select.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'select'
    })
  })
});
var MultiSelect = Template.bind({});
exports.MultiSelect = MultiSelect;
MultiSelect.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'multi-select'
    })
  })
});
var ObjectOf = Template.bind({});
exports.ObjectOf = ObjectOf;
ObjectOf.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someObject',
    name: 'Some Object',
    description: 'A simple `objectOf` propType.',
    table: {
      type: {
        summary: 'objectOf(number)'
      },
      defaultValue: {
        summary: '{ key: 1 }'
      }
    },
    control: {
      type: 'object'
    }
  }
});
var ArrayOf = Template.bind({});
exports.ArrayOf = ArrayOf;
ArrayOf.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someArray',
    name: 'Some Array',
    description: 'array of a certain type',
    table: {
      type: {
        summary: 'number[]'
      },
      defaultValue: {
        summary: '[1, 2, 3]'
      }
    },
    control: {
      type: 'array'
    }
  }
});
var ComplexObject = Template.bind({});
exports.ComplexObject = ComplexObject;
ComplexObject.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someComplex',
    name: 'Some Complex',
    description: 'A very complex `objectOf` propType.',
    table: {
      type: {
        summary: 'object',
        detail: "[{\n      id: number,\n      func: func,\n      arr: [{ index: number }]\n    }]"
      },
      defaultValue: {
        summary: 'object',
        detail: "[{\n      id: 1,\n      func: () => {},\n      arr: [{ index: 1 }]\n    }]"
      }
    },
    control: {
      type: 'object'
    }
  }
});
var Func = Template.bind({});
exports.Func = Func;
Func.args = Object.assign({}, baseArgs, {
  row: {
    key: 'concat',
    name: 'Concat',
    description: 'concat 2 string values.',
    type: {
      required: true
    },
    table: {
      type: {
        summary: '(a: string, b: string) => string'
      },
      defaultValue: {
        summary: 'func',
        detail: '(a, b) => { return a + b; }'
      },
      jsDocTags: {
        params: [{
          name: 'a',
          description: 'The first string'
        }, {
          name: 'b',
          description: 'The second string'
        }],
        returns: {
          description: 'The concatenation of both strings'
        }
      }
    },
    control: false
  }
});
var enumeration = '"search" | "arrow-to-bottom" | "arrow-to-right" | "bell" | "check" | "check-circle"';
var Enum = Template.bind({});
exports.Enum = Enum;
Enum.args = Object.assign({}, baseArgs, {
  row: {
    key: 'enum',
    name: 'Some enum',
    type: {
      required: true
    },
    table: {
      type: {
        summary: enumeration
      }
    }
  }
});
var long_enumeration = '"search" | "arrow-to-bottom" | "arrow-to-right" | "bell" | "check" | "check-circle" | "chevron-up" | "chevron-down" | "chevron-left" | "chevron-right" | "envelope" | "exchange" | "file" | "file-check" | "file-import" | "file-pdf" | "file-times" | "pencil" | "question" | "question-circle" | "sitemap" | "user" | "times" | "plus" | "exclamation-triangle" | "trash-alt" | "long-arrow-up" | "long-arrow-down" | "long-arrow-left" | "long-arrow-right" | "external-link-alt" | "sticky-note" | "chart-line" | "spinner-third"';
var LongEnum = Template.bind({});
exports.LongEnum = LongEnum;
LongEnum.args = Object.assign({}, baseArgs, {
  row: {
    key: 'longEnum',
    name: 'Long enum',
    type: {
      required: true
    },
    table: {
      type: {
        summary: long_enumeration
      }
    }
  }
});
var complexUnion = '((a: string | SVGSVGElement) => void) | RefObject<SVGSVGElement | number> | [a|b] | {a|b}';
var ComplexUnion = Template.bind({});
exports.ComplexUnion = ComplexUnion;
ComplexUnion.args = Object.assign({}, baseArgs, {
  row: {
    key: 'complexUnion',
    name: 'Complex',
    type: {
      required: true
    },
    table: {
      type: {
        summary: complexUnion
      }
    }
  }
});
var Markdown = Template.bind({});
exports.Markdown = Markdown;
Markdown.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someString',
    name: 'Some String',
    description: 'A `prop` can *support* __markdown__ syntax. This was ship in ~~5.2~~ 5.3. [Find more info in the storybook docs.](https://storybook.js.org/)',
    table: {
      type: {
        summary: 'string'
      }
    },
    control: {
      type: 'text'
    }
  }
});
var StringCompact = Template.bind({});
exports.StringCompact = StringCompact;
StringCompact.args = Object.assign({}, String.args, {
  compact: true
});
var StringNoControls = Template.bind({});
exports.StringNoControls = StringNoControls;
StringNoControls.args = {
  row: String.args.row
};
var StringNoControlsCompact = Template.bind({});
exports.StringNoControlsCompact = StringNoControlsCompact;
StringNoControlsCompact.args = {
  row: String.args.row,
  compact: true
};