const path = require('path');
const mdx = require('@mdx-js/mdx');
const { ScriptTransformer } = require('@jest/transform');
const { dedent } = require('ts-dedent');

const { createCompiler } = require('@storybook/csf-tools/mdx');

const compilers = [createCompiler({})];

module.exports = {
  process(src, filename, config, { instrument }) {
    const result = dedent`
      /* @jsx mdx */
      import React from 'react'
      import { mdx } from '@mdx-js/react'
      ${mdx.sync(src, { compilers, filepath: filename })}
    `;

    const extension = path.extname(filename);
    const jsFileName = `${filename.slice(0, -extension.length)}.js`;

    return new ScriptTransformer(config).transformSource(jsFileName, result, instrument);
  },
};
