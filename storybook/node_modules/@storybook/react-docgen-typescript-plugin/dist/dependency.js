"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line
// @ts-ignore: What's the right way to refer to this one?
const makeSerializable_js_1 = tslib_1.__importDefault(require("webpack/lib/util/makeSerializable.js"));
// eslint-disable-next-line
// @ts-ignore: What's the right way to refer to this one?
const NullDependency_js_1 = tslib_1.__importDefault(require("webpack/lib/dependencies/NullDependency.js"));
class DocGenDependency extends NullDependency_js_1.default {
    constructor(codeBlock) {
        super();
        this.updateHash = (hash) => {
            hash.update(this.codeBlock);
        };
        this.codeBlock = codeBlock;
    }
    getModuleEvaluationSideEffectsState() {
        return false;
    }
}
exports.DocGenDependency = DocGenDependency;
makeSerializable_js_1.default(DocGenDependency, "react-docgen-typescript-plugin/dist/dependency");
class DocGenTemplate extends NullDependency_js_1.default.Template {
    constructor() {
        super(...arguments);
        // eslint-disable-next-line
        // @ts-ignore: Webpack 4 type
        this.apply = (dependency, source) => {
            if (dependency.codeBlock) {
                // Insert to the end
                source.insert(Infinity, dependency.codeBlock);
            }
        };
    }
}
// eslint-disable-next-line
// @ts-ignore TODO: How to type this correctly?
DocGenDependency.Template = DocGenTemplate;
//# sourceMappingURL=dependency.js.map