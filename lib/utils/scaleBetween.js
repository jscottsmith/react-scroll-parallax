"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scaleBetween;
// Scale between AKA normalize
function scaleBetween(value, newMin, newMax, oldMin, oldMax) {
    return (newMax - newMin) * (value - oldMin) / (oldMax - oldMin) + newMin;
}
module.exports = exports["default"];