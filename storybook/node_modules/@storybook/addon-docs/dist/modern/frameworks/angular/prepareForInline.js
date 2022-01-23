import React from 'react';
import pLimit from 'p-limit';
import { nanoid } from 'nanoid';
import { rendererFactory } from '@storybook/angular/renderer';
const limit = pLimit(1);
/**
 * Uses the angular renderer to generate a story. Uses p-limit to run synchronously
 */

export const prepareForInline = (storyFn, {
  id,
  parameters,
  component
}) => {
  const el = React.useRef();
  React.useEffect(() => {
    (async () => {
      limit(async () => {
        const renderer = await rendererFactory.getRendererInstance(`${id}-${nanoid(10)}`.toLowerCase(), el.current);

        if (renderer) {
          await renderer.render({
            forced: false,
            component,
            parameters,
            storyFnAngular: storyFn(),
            targetDOMNode: el.current
          });
        }
      });
    })();
  });
  return /*#__PURE__*/React.createElement('div', {
    ref: el
  });
};