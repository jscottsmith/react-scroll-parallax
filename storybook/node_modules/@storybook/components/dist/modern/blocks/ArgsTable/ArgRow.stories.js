import React from 'react';
import { action } from '@storybook/addon-actions';
import { ArgRow } from './ArgRow';
import { TableWrapper } from './ArgsTable';
import { ResetWrapper } from '../../typography/DocumentFormatting';
export default {
  component: ArgRow,
  title: 'Docs/ArgRow',
  decorators: [getStory => /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(TableWrapper, null, /*#__PURE__*/React.createElement("tbody", null, getStory())))]
};

const Template = args => /*#__PURE__*/React.createElement(ArgRow, args);

Template.displayName = "Template";
const baseArgs = {
  updateArgs: action('updateArgs')
};
export const String = Template.bind({});
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
export const LongName = Template.bind({});
LongName.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, String.args.row, {
    name: 'Really Long String That Takes Up Space'
  })
});
export const LongDesc = Template.bind({});
LongDesc.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, String.args.row, {
    description: 'really long description that takes up a lot of space. sometimes this happens.'
  })
});
export const Boolean = Template.bind({});
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
export const Color = Template.bind({});
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
export const Date = Template.bind({});
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
export const Number = Template.bind({});
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
export const Range = Template.bind({});
Range.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Number.args.row, {
    control: {
      type: 'range'
    }
  })
});
export const Radio = Template.bind({});
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
export const InlineRadio = Template.bind({});
InlineRadio.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'inline-radio'
    })
  })
});
export const Check = Template.bind({});
Check.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'check'
    })
  })
});
export const InlineCheck = Template.bind({});
InlineCheck.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'inline-check'
    })
  })
});
export const Select = Template.bind({});
Select.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'select'
    })
  })
});
export const MultiSelect = Template.bind({});
MultiSelect.args = Object.assign({}, baseArgs, {
  row: Object.assign({}, Radio.args.row, {
    control: Object.assign({}, Radio.args.row.control, {
      type: 'multi-select'
    })
  })
});
export const ObjectOf = Template.bind({});
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
export const ArrayOf = Template.bind({});
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
export const ComplexObject = Template.bind({});
ComplexObject.args = Object.assign({}, baseArgs, {
  row: {
    key: 'someComplex',
    name: 'Some Complex',
    description: 'A very complex `objectOf` propType.',
    table: {
      type: {
        summary: 'object',
        detail: `[{
      id: number,
      func: func,
      arr: [{ index: number }]
    }]`
      },
      defaultValue: {
        summary: 'object',
        detail: `[{
      id: 1,
      func: () => {},
      arr: [{ index: 1 }]
    }]`
      }
    },
    control: {
      type: 'object'
    }
  }
});
export const Func = Template.bind({});
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
const enumeration = '"search" | "arrow-to-bottom" | "arrow-to-right" | "bell" | "check" | "check-circle"';
export const Enum = Template.bind({});
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
const long_enumeration = '"search" | "arrow-to-bottom" | "arrow-to-right" | "bell" | "check" | "check-circle" | "chevron-up" | "chevron-down" | "chevron-left" | "chevron-right" | "envelope" | "exchange" | "file" | "file-check" | "file-import" | "file-pdf" | "file-times" | "pencil" | "question" | "question-circle" | "sitemap" | "user" | "times" | "plus" | "exclamation-triangle" | "trash-alt" | "long-arrow-up" | "long-arrow-down" | "long-arrow-left" | "long-arrow-right" | "external-link-alt" | "sticky-note" | "chart-line" | "spinner-third"';
export const LongEnum = Template.bind({});
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
const complexUnion = '((a: string | SVGSVGElement) => void) | RefObject<SVGSVGElement | number> | [a|b] | {a|b}';
export const ComplexUnion = Template.bind({});
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
export const Markdown = Template.bind({});
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
export const StringCompact = Template.bind({});
StringCompact.args = Object.assign({}, String.args, {
  compact: true
});
export const StringNoControls = Template.bind({});
StringNoControls.args = {
  row: String.args.row
};
export const StringNoControlsCompact = Template.bind({});
StringNoControlsCompact.args = {
  row: String.args.row,
  compact: true
};