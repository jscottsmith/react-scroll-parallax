import dedent from 'ts-dedent';
import deprecate from 'util-deprecate';
const deprecatedHtmlEndpoint = deprecate(() => {}, dedent`
    The entry point '@storybook/components/html' is deprecated. Please use '@storybook/components' directly instead.

    See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-storybook-components-html-entry-point
  `);
deprecatedHtmlEndpoint();
export * from './typography/DocumentFormatting';
export { components, resetComponents } from './index';