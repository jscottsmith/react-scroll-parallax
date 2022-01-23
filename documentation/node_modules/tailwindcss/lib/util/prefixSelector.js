"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;
var _postcssSelectorParser = _interopRequireDefault(require("postcss-selector-parser"));
var _tap = require("./tap");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _default(prefix, selector) {
    return (0, _postcssSelectorParser).default((selectors)=>{
        selectors.walkClasses((classSelector)=>{
            (0, _tap).tap(classSelector.value, (baseClass)=>{
                classSelector.value = `${prefix}${baseClass}`;
            });
        });
    }).processSync(selector);
}
