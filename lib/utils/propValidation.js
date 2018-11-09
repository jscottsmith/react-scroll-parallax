'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.offsetMin = offsetMin;
exports.offsetMax = offsetMax;
function offsetMin(props, propName) {
    var componentName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ANONYMOUS';

    var value = props[propName];
    var isValid = typeof value === 'string' || typeof value === 'number';

    if (!isValid) {
        return new Error('[' + propName + '] in ' + componentName + ' must be a string with with "%"" or "px" units or number.');
    }

    if (props[propName]) {
        if (typeof value === 'string') {
            value = parseInt(value, 10);
        }
        return value <= 0 ? null : new Error('[' + propName + '] in ' + componentName + ' is greater than zero. [' + propName + '] must be less than or equal to zero.');
    }
    return null;
}

function offsetMax(props, propName) {
    var componentName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ANONYMOUS';

    var value = props[propName];
    var isValid = typeof value === 'string' || typeof value === 'number';

    if (!isValid) {
        return new Error('[' + propName + '] in ' + componentName + ' must be a string with with "%"" or "px" units or number.');
    }

    if (props[propName]) {
        if (typeof value === 'string') {
            value = parseInt(value, 10);
        }
        return value >= 0 ? null : new Error('[' + propName + '] in ' + componentName + ' is less than zero. [' + propName + '] must be greater than or equal to zero.');
    }
    return null;
}