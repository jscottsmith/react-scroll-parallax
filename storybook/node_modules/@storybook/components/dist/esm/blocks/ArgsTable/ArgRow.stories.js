import "core-js/modules/es.object.assign.js";
import React from 'react';
import { action } from '@storybook/addon-actions';
import { ArgRow } from './ArgRow';
import { TableWrapper } from './ArgsTable';
import { ResetWrapper } from '../../typography/DocumentFormatting';
export default {
  component: ArgRow,
  title: 'Docs/ArgRow',
  decorators: [function (getStory) {
    return /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(TableWrapper, null, /*#__PURE__*/React.createElement("tbody", null, getStory())));
  }]
};

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(ArgRow, args);
};

Template.displayName = "Template";
var baseArgs = {
  updateArgs: action('updateArgs')
};
export var String = Template.bind({});
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
export var LongName = Template.bind({});
LongName.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, String.args.row, {
    name: 'Really Long String That Takes Up Space'
  })
});
export var LongDesc = Template.bind({});
LongDesc.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, String.args.row, {
    description: 'really long description that takes up a lot of space. sometimes this happens.'
  })
});
export var Boolean = Template.bind({});
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
export var Color = Template.bind({});
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
export var Date = Template.bind({});
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
export var Number = Template.bind({});
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
export var Range = Template.bind({});
Range.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Number.args.row, {
    control: {
      type: 'range'
    }
  })
});
export var Radio = Template.bind({});
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
export var InlineRadio = Template.bind({});
InlineRadio.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'inline-radio'
    })
  })
});
export var Check = Template.bind({});
Check.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'check'
    })
  })
});
export var InlineCheck = Template.bind({});
InlineCheck.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'inline-check'
    })
  })
});
export var Select = Template.bind({});
Select.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'select'
    })
  })
});
export var MultiSelect = Template.bind({});
MultiSelect.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'multi-select'
    })
  })
});
export var ObjectOf = Template.bind({});
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
export var ArrayOf = Template.bind({});
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
export var ComplexObject = Template.bind({});
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
export var Func = Template.bind({});
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
export var Enum = Template.bind({});
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
export var LongEnum = Template.bind({});
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
export var ComplexUnion = Template.bind({});
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
export var Markdown = Template.bind({});
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
export var StringCompact = Template.bind({});
StringCompact.args = Object.assign({}, String.args, {
  compact: true
});
export var StringNoControls = Template.bind({});
StringNoControls.args = {
  row: String.args.row
};
export var StringNoControlsCompact = Template.bind({});
StringNoControlsCompact.args = {
  row: String.args.row,
  compact: true
};