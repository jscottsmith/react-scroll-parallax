import React, { createContext, useEffect, useState } from 'react';
import deepEqual from 'fast-deep-equal';
import { addons } from '@storybook/addons';
import { SNIPPET_RENDERED } from '../shared';
export const SourceContext = /*#__PURE__*/createContext({
  sources: {}
});
export const SourceContainer = ({
  children
}) => {
  const [sources, setSources] = useState({});
  const channel = addons.getChannel();
  useEffect(() => {
    const handleSnippetRendered = (id, newItem) => {
      if (newItem !== sources[id]) {
        setSources(current => {
          const newSources = Object.assign({}, current, {
            [id]: newItem
          });

          if (!deepEqual(current, newSources)) {
            return newSources;
          }

          return current;
        });
      }
    };

    channel.on(SNIPPET_RENDERED, handleSnippetRendered);
    return () => channel.off(SNIPPET_RENDERED, handleSnippetRendered);
  });
  return /*#__PURE__*/React.createElement(SourceContext.Provider, {
    value: {
      sources
    }
  }, children);
};