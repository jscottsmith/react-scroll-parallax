"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clamp;
function clamp(number, lower, upper) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
    return number;
}
module.exports = exports["default"];