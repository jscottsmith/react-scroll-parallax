import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.freeze.js";

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import dedent from 'ts-dedent';
import deprecate from 'util-deprecate';
var deprecatedHtmlEndpoint = deprecate(function () {}, dedent(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    The entry point '@storybook/components/html' is deprecated. Please use '@storybook/components' directly instead.\n\n    See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-storybook-components-html-entry-point\n  "]))));
deprecatedHtmlEndpoint();
export * from './typography/DocumentFormatting';
export { components, resetComponents } from './index';