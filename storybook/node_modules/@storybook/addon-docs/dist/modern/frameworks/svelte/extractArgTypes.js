import { logger } from '@storybook/client-logger';

function hasKeyword(keyword, keywords) {
  return keywords ? keywords.find(k => k.name === keyword) != null : false;
}

export const extractArgTypes = component => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const docgen = component.__docgen;

    if (docgen) {
      return createArgTypes(docgen);
    }
  } catch (err) {
    logger.log(`Error extracting argTypes: ${err}`);
  }

  return {};
};
export const createArgTypes = docgen => {
  const results = {};
  docgen.data.forEach(item => {
    var _item$type, _item$type2;

    results[item.name] = {
      control: parseTypeToControl(item.type),
      name: item.name,
      description: item.description,
      type: {
        required: hasKeyword('required', item.keywords),
        name: (_item$type = item.type) === null || _item$type === void 0 ? void 0 : _item$type.text
      },
      table: {
        type: {
          summary: (_item$type2 = item.type) === null || _item$type2 === void 0 ? void 0 : _item$type2.text
        },
        defaultValue: {
          summary: item.defaultValue
        },
        category: 'properties'
      }
    };
  });
  docgen.events.forEach(item => {
    results[`event_${item.name}`] = {
      name: item.name,
      description: item.description,
      type: {
        name: 'other',
        value: 'void'
      },
      table: {
        category: 'events'
      }
    };
  });
  docgen.slots.forEach(item => {
    var _item$params;

    results[`slot_${item.name}`] = {
      name: item.name,
      description: [item.description, (_item$params = item.params) === null || _item$params === void 0 ? void 0 : _item$params.map(p => `\`${p.name}\``).join(' ')].filter(p => p).join('\n\n'),
      type: {
        name: 'other',
        value: 'void'
      },
      table: {
        category: 'slots'
      }
    };
  });
  return results;
};
/**
 * Function to convert the type from sveltedoc-parser to a storybook type
 * @param typeName
 * @returns string
 */

const parseTypeToControl = type => {
  if (!type) {
    return null;
  }

  if (type.kind === 'type') {
    switch (type.type) {
      case 'string':
        return {
          type: 'text'
        };

      case 'enum':
        return {
          type: 'radio'
        };

      case 'any':
        return {
          type: 'object'
        };

      default:
        return {
          type: type.type
        };
    }
  } else if (type.kind === 'union') {
    if (Array.isArray(type.type) && !type.type.find(t => t.type !== 'string')) {
      return {
        type: 'radio',
        options: type.type.filter(t => t.kind === 'const').map(t => t.value)
      };
    }
  }

  return null;
};