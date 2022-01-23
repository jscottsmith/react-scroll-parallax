"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.freeze.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  components: true,
  resetComponents: true
};
Object.defineProperty(exports, "components", {
  enumerable: true,
  get: function get() {
    return _index.components;
  }
});
Object.defineProperty(exports, "resetComponents", {
  enumerable: true,
  get: function get() {
    return _index.resetComponents;
  }
});

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _DocumentFormatting = require("./typography/DocumentFormatting");

Object.keys(_DocumentFormatting).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _DocumentFormatting[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DocumentFormatting[key];
    }
  });
});

var _index = require("./index");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var deprecatedHtmlEndpoint = (0, _utilDeprecate.default)(function () {}, (0, _tsDedent.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    The entry point '@storybook/components/html' is deprecated. Please use '@storybook/components' directly instead.\n\n    See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-storybook-components-html-entry-point\n  "]))));
deprecatedHtmlEndpoint();