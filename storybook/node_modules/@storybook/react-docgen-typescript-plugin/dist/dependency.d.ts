import * as webpack from "webpack";
import NullDependency from "webpack/lib/dependencies/NullDependency.js";
declare class DocGenDependency extends NullDependency {
    codeBlock: string;
    constructor(codeBlock: string);
    getModuleEvaluationSideEffectsState(): boolean;
    updateHash: webpack.dependencies.NullDependency["updateHash"];
}
export { DocGenDependency };
//# sourceMappingURL=dependency.d.ts.map