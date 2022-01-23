import "core-js/modules/es.array.reduce.js";
import { extractProps } from './extractProps';
export const extractArgTypes = component => {
  if (component) {
    const {
      rows
    } = extractProps(component);

    if (rows) {
      return rows.reduce((acc, row) => {
        const {
          name,
          description,
          type,
          sbType,
          defaultValue: defaultSummary,
          jsDocTags,
          required
        } = row;
        acc[name] = {
          name,
          description,
          type: Object.assign({
            required
          }, sbType),
          table: {
            type,
            jsDocTags,
            defaultValue: defaultSummary
          }
        };
        return acc;
      }, {});
    }
  }

  return null;
};