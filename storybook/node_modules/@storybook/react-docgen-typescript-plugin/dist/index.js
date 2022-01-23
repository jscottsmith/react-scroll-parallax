"use strict";
/* eslint-disable  */
Object.defineProperty(exports, "__esModule", { value: true });
class EmptyPlugin {
    constructor(_) { }
    apply() { }
}
let plugin;
exports.ReactDocgenTypeScriptPlugin = plugin;
// It should be possible to use the plugin without TypeScript.
// In that case using it is a no-op.
try {
    require.resolve("typescript");
    exports.ReactDocgenTypeScriptPlugin = plugin = require("./plugin").default;
}
catch (error) {
    exports.ReactDocgenTypeScriptPlugin = plugin = EmptyPlugin;
}
exports.default = plugin;
//# sourceMappingURL=index.js.map