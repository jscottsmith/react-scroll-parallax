"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const typescript_1 = tslib_1.__importDefault(require("typescript"));
const docGen = tslib_1.__importStar(require("react-docgen-typescript"));
const micromatch_1 = require("micromatch");
const find_cache_dir_1 = tslib_1.__importDefault(require("find-cache-dir"));
const flat_cache_1 = tslib_1.__importDefault(require("flat-cache"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const generateDocgenCodeBlock_1 = require("./generateDocgenCodeBlock");
const debugExclude = debug_1.default("docgen:exclude");
const debugInclude = debug_1.default("docgen:include");
/** Get the contents of the tsconfig in the system */
function getTSConfigFile(tsconfigPath) {
    try {
        const basePath = path_1.default.dirname(tsconfigPath);
        const configFile = typescript_1.default.readConfigFile(tsconfigPath, typescript_1.default.sys.readFile);
        return typescript_1.default.parseJsonConfigFileContent(configFile.config, typescript_1.default.sys, basePath, {}, tsconfigPath);
    }
    catch (error) {
        return {};
    }
}
/** Create a glob matching function. */
const matchGlob = (globs) => {
    const matchers = (globs || []).map((g) => micromatch_1.matcher(g, { dot: true }));
    return (filename) => Boolean(filename && matchers.find((match) => match(filename)));
};
// The cache is used only with webpack 4 for now as webpack 5 comes with caching of its own
const cacheId = "ts-docgen";
const cacheDir = find_cache_dir_1.default({ name: cacheId });
const cache = flat_cache_1.default.load(cacheId, cacheDir);
/** Run the docgen parser and inject the result into the output */
/** This is used for webpack 4 or earlier */
function processModule(parser, webpackModule, tsProgram, loaderOptions) {
    if (!webpackModule) {
        return;
    }
    const hash = crypto_1.default
        .createHash("sha1")
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line
        .update(webpackModule._source._value)
        .digest("hex");
    const cached = cache.getKey(hash);
    if (cached) {
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line
        debugInclude(`Got cached docgen for "${webpackModule.request}"`);
        // eslint-disable-next-line
        // @ts-ignore
        // eslint-disable-next-line
        webpackModule._source._value = cached;
        return;
    }
    // eslint-disable-next-line
    // @ts-ignore: Webpack 4 type
    const { userRequest } = webpackModule;
    const componentDocs = parser.parseWithProgramProvider(userRequest, () => tsProgram);
    if (!componentDocs.length) {
        return;
    }
    const docs = generateDocgenCodeBlock_1.generateDocgenCodeBlock(Object.assign({ filename: userRequest, source: userRequest, componentDocs }, loaderOptions)).substring(userRequest.length);
    // eslint-disable-next-line
    // @ts-ignore: Webpack 4 type
    // eslint-disable-next-line
    let sourceWithDocs = webpackModule._source._value;
    sourceWithDocs += `\n${docs}\n`;
    // eslint-disable-next-line
    // @ts-ignore: Webpack 4 type
    // eslint-disable-next-line
    webpackModule._source._value = sourceWithDocs;
}
/** Inject typescript docgen information into modules at the end of a build */
class DocgenPlugin {
    constructor(options = {}) {
        this.name = "React Docgen Typescript Plugin";
        this.options = options;
    }
    apply(compiler) {
        var _a;
        // Property compiler.version is set only starting from webpack 5
        const webpackVersion = ((_a = compiler.webpack) === null || _a === void 0 ? void 0 : _a.version) || "";
        const isWebpack5 = parseInt(webpackVersion.split(".")[0], 10) >= 5;
        if (isWebpack5) {
            this.applyWebpack5(compiler);
        }
        else {
            this.applyWebpack4(compiler);
        }
    }
    applyWebpack5(compiler) {
        const pluginName = "DocGenPlugin";
        const { docgenOptions, compilerOptions, generateOptions, } = this.getOptions();
        const docGenParser = docGen.withCompilerOptions(compilerOptions, docgenOptions);
        const { exclude = [], include = ["**/**.tsx"] } = this.options;
        const isExcluded = matchGlob(exclude);
        const isIncluded = matchGlob(include);
        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            // Since this file is needed only for webpack 5, load it only then
            // to simplify the implementation of the file.
            //
            // eslint-disable-next-line
            const { DocGenDependency } = require("./dependency");
            compilation.dependencyTemplates.set(
            // eslint-disable-next-line
            // @ts-ignore: Webpack 4 type
            DocGenDependency, 
            // eslint-disable-next-line
            // @ts-ignore: Webpack 4 type
            new DocGenDependency.Template());
            compilation.hooks.seal.tap(pluginName, () => {
                const modulesToProcess = [];
                // 1. Aggregate modules to process
                compilation.modules.forEach((module) => {
                    if (!module.nameForCondition) {
                        return;
                    }
                    const nameForCondition = module.nameForCondition() || "";
                    // Ignore already built modules for webpack 5
                    if (!compilation.builtModules.has(module)) {
                        debugExclude(`Ignoring un-built module: ${nameForCondition}`);
                        return;
                    }
                    // Ignore external modules
                    // eslint-disable-next-line
                    // @ts-ignore: Webpack 4 type
                    if (module.external) {
                        debugExclude(`Ignoring external module: ${nameForCondition}`);
                        return;
                    }
                    // Ignore raw requests
                    // eslint-disable-next-line
                    // @ts-ignore: Webpack 4 type
                    if (!module.rawRequest) {
                        debugExclude(`Ignoring module without "rawRequest": ${nameForCondition}`);
                        return;
                    }
                    if (isExcluded(nameForCondition)) {
                        debugExclude(`Module not matched in "exclude": ${nameForCondition}`);
                        return;
                    }
                    if (!isIncluded(nameForCondition)) {
                        debugExclude(`Module not matched in "include": ${nameForCondition}`);
                        return;
                    }
                    modulesToProcess.push([nameForCondition, module]);
                });
                // 2. Create a ts program with the modules
                const tsProgram = typescript_1.default.createProgram(modulesToProcess.map(([name]) => name), compilerOptions);
                // 3. Process and parse each module and add the type information
                // as a dependency
                modulesToProcess.forEach(([name, module]) => {
                    // Since this file is needed only for webpack 5, load it only then
                    // to simplify the implementation of the file.
                    //
                    // eslint-disable-next-line
                    const { DocGenDependency } = require("./dependency");
                    module.addDependency(
                    // eslint-disable-next-line
                    // @ts-ignore: Webpack 4 type
                    new DocGenDependency(generateDocgenCodeBlock_1.generateDocgenCodeBlock(Object.assign({ filename: name, source: name, componentDocs: docGenParser.parseWithProgramProvider(name, () => tsProgram) }, generateOptions)).substring(name.length)));
                });
            });
        });
    }
    applyWebpack4(compiler) {
        const { docgenOptions, compilerOptions } = this.getOptions();
        const parser = docGen.withCompilerOptions(compilerOptions, docgenOptions);
        const { exclude = [], include = ["**/**.tsx"] } = this.options;
        const isExcluded = matchGlob(exclude);
        const isIncluded = matchGlob(include);
        compiler.hooks.make.tap(this.name, (compilation) => {
            compilation.hooks.seal.tap(this.name, () => {
                const modulesToProcess = [];
                compilation.modules.forEach((module) => {
                    // eslint-disable-next-line
                    // @ts-ignore: Webpack 4 type
                    if (!module.built) {
                        // eslint-disable-next-line
                        // @ts-ignore: Webpack 4 type
                        debugExclude(`Ignoring un-built module: ${module.userRequest}`);
                        return;
                    }
                    // eslint-disable-next-line
                    // @ts-ignore: Webpack 4 type
                    if (module.external) {
                        // eslint-disable-next-line
                        // @ts-ignore: Webpack 4 type
                        debugExclude(`Ignoring external module: ${module.userRequest}`);
                        return;
                    }
                    // eslint-disable-next-line
                    // @ts-ignore: Webpack 4 type
                    if (!module.rawRequest) {
                        debugExclude(
                        // eslint-disable-next-line
                        // @ts-ignore: Webpack 4 type
                        `Ignoring module without "rawRequest": ${module.userRequest}`);
                        return;
                    }
                    // eslint-disable-next-line
                    // @ts-ignore: Webpack 4 type
                    if (isExcluded(module.userRequest)) {
                        debugExclude(
                        // eslint-disable-next-line
                        // @ts-ignore: Webpack 4 type
                        `Module not matched in "exclude": ${module.userRequest}`);
                        return;
                    }
                    // eslint-disable-next-line
                    // @ts-ignore: Webpack 4 type
                    if (!isIncluded(module.userRequest)) {
                        debugExclude(
                        // eslint-disable-next-line
                        // @ts-ignore: Webpack 4 type
                        `Module not matched in "include": ${module.userRequest}`);
                        return;
                    }
                    // eslint-disable-next-line
                    // @ts-ignore: Webpack 4 type
                    debugInclude(module.userRequest);
                    modulesToProcess.push(module);
                });
                const tsProgram = typescript_1.default.createProgram(
                // eslint-disable-next-line
                // @ts-ignore: Webpack 4 type
                modulesToProcess.map((v) => v.userRequest), compilerOptions);
                modulesToProcess.forEach((m) => processModule(parser, m, tsProgram, {
                    docgenCollectionName: "STORYBOOK_REACT_CLASSES",
                    setDisplayName: true,
                    typePropName: "type",
                }));
                cache.save();
            });
        });
    }
    getOptions() {
        const _a = this.options, { tsconfigPath = "./tsconfig.json", compilerOptions: userCompilerOptions, docgenCollectionName, setDisplayName, typePropName } = _a, docgenOptions = tslib_1.__rest(_a, ["tsconfigPath", "compilerOptions", "docgenCollectionName", "setDisplayName", "typePropName"]);
        const { defaultOptions } = DocgenPlugin;
        let compilerOptions = {
            jsx: typescript_1.default.JsxEmit.React,
            module: typescript_1.default.ModuleKind.CommonJS,
            target: typescript_1.default.ScriptTarget.Latest,
        };
        if (userCompilerOptions) {
            compilerOptions = Object.assign(Object.assign({}, compilerOptions), userCompilerOptions);
        }
        else {
            const { options: tsOptions } = getTSConfigFile(tsconfigPath);
            compilerOptions = Object.assign(Object.assign({}, compilerOptions), tsOptions);
        }
        return {
            docgenOptions,
            generateOptions: {
                docgenCollectionName: docgenCollectionName === undefined
                    ? defaultOptions.docgenCollectionName
                    : docgenCollectionName,
                setDisplayName: setDisplayName !== null && setDisplayName !== void 0 ? setDisplayName : defaultOptions.setDisplayName,
                typePropName: typePropName !== null && typePropName !== void 0 ? typePropName : defaultOptions.typePropName,
            },
            compilerOptions,
        };
    }
}
exports.default = DocgenPlugin;
DocgenPlugin.defaultOptions = {
    setDisplayName: true,
    typePropName: "type",
    docgenCollectionName: "STORYBOOK_REACT_CLASSES",
};
//# sourceMappingURL=plugin.js.map