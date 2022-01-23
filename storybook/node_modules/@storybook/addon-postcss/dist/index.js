"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpack = void 0;
var node_logger_1 = require("@storybook/node-logger");
var postcss_1 = __importDefault(require("postcss"));
function wrapLoader(loader, options) {
    if (options === false) {
        return [];
    }
    return [{ loader: loader, options: options }];
}
var webpack = function (webpackConfig, options) {
    var _a, _b, _c;
    if (webpackConfig === void 0) { webpackConfig = {}; }
    if (options === void 0) { options = {}; }
    var styleLoaderOptions = options.styleLoaderOptions, postcssLoaderOptions = options.postcssLoaderOptions, _d = options.rule, rule = _d === void 0 ? {} : _d;
    var cssLoaderOptions = options.cssLoaderOptions;
    if (typeof cssLoaderOptions === 'object') {
        cssLoaderOptions = __assign(__assign({}, cssLoaderOptions), { importLoaders: 1 });
    }
    var postcssFactory = postcss_1.default;
    if (typeof postcssLoaderOptions === 'object') {
        postcssFactory = (_a = postcssLoaderOptions === null || postcssLoaderOptions === void 0 ? void 0 : postcssLoaderOptions.implementation) !== null && _a !== void 0 ? _a : postcss_1.default;
    }
    var version = postcssFactory().version;
    node_logger_1.logger.info("=> Using PostCSS preset with postcss@" + version);
    return __assign(__assign({}, webpackConfig), { module: __assign(__assign({}, webpackConfig.module), { rules: __spread(((_c = (_b = webpackConfig.module) === null || _b === void 0 ? void 0 : _b.rules) !== null && _c !== void 0 ? _c : []), [
                __assign(__assign({ test: /\.css$/, sideEffects: true }, rule), { use: __spread(wrapLoader(require.resolve('style-loader'), styleLoaderOptions), wrapLoader(require.resolve('css-loader'), cssLoaderOptions), wrapLoader(require.resolve('postcss-loader'), postcssLoaderOptions)) }),
            ]) }) });
};
exports.webpack = webpack;
//# sourceMappingURL=index.js.map