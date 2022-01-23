import { hasDocgen, extractComponentProps } from '../../lib/docgen';
import { convert } from '../../lib/convert';
const SECTIONS = ['props', 'events', 'slots'];
export const extractArgTypes = component => {
  if (!hasDocgen(component)) {
    return null;
  }

  const results = {};
  SECTIONS.forEach(section => {
    const props = extractComponentProps(component, section);
    props.forEach(({
      propDef,
      docgenInfo,
      jsDocTags
    }) => {
      const {
        name,
        type,
        description,
        defaultValue: defaultSummary,
        required
      } = propDef;
      const sbType = section === 'props' ? convert(docgenInfo) : {
        name: 'void'
      };
      results[name] = {
        name,
        description,
        type: Object.assign({
          required
        }, sbType),
        table: {
          type,
          jsDocTags,
          defaultValue: defaultSummary,
          category: section
        }
      };
    });
  });
  return results;
};