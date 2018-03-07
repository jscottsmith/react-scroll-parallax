'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateOffsets = validateOffsets;
exports.validateScale = validateScale;
exports.validateOpacity = validateOpacity;

var _parseUnit = require('./parseUnit');

var _parseUnit2 = _interopRequireDefault(_parseUnit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateOffsets(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';

    var value = props[propName];
    // console.log(value);

    var isArray = Array.isArray(value);
    var correctLength = value.length === 2;
    var warning = '[' + propName + '] in <' + componentName + '>.';
    var valueProvided = 'Instead the value provided was [' + value + '].';

    // Make sure it's an array
    if (!isArray) {
        return new Error(warning + ' Must be an array of Numbers or Strings with \'%\' or \'px\' as units. ' + valueProvided);
    }

    // Make sure it has the correct length of 2
    if (isArray && !correctLength) {
        return new Error(warning + ' Must be an Array with a length of 2. ' + valueProvided);
    }

    // Make sure the values are strings or numbers
    if (isArray && correctLength) {
        var isValid = true;

        value.forEach(function (val) {
            isValid = isValid && (typeof val === 'string' || typeof val === 'number');
        });

        if (!isValid) {
            return new Error(warning + ' Each item in the Array must be a Number or String with \'%\' or \'px\' as units. ' + valueProvided);
        }
    }

    // Make sure the units are correct
    if (isArray && correctLength) {
        var hasMatchingUnits = value.reduce(function (acc, val, idx) {
            var parsedValue = (0, _parseUnit2.default)(val);
            if (!acc) {
                // return the first unit
                return parsedValue.unit;
            } else {
                // test if units match
                return acc === parsedValue.unit;
            }
        }, null);

        if (!hasMatchingUnits) {
            return new Error(warning + ' Each item in the Array must have matching units. ' + valueProvided);
        }
    }

    // Make sure a valid unit is provided
    if (isArray && correctLength) {
        var validUnits = ['px', '%']; // NOTE: Allowing 'em', 'rem', 'vh', 'vw' would require bounds adjustments
        var hasValidUnits = value.reduce(function (acc, val, idx) {
            var parsedValue = (0, _parseUnit2.default)(val);
            if (acc) {
                // test if previous passed
                return validUnits.find(function (val) {
                    return val === parsedValue.unit;
                });
            } else {
                // return false if prev test failed
                return false;
            }
        }, true);

        if (!hasValidUnits) {
            return new Error(warning + ' Each item in the Array must have a valid unit of \'px\' or \'%\'. ' + valueProvided);
        }
    }

    // Make sure valid numbers are provided e.g. a negative and positive value
    if (isArray && correctLength) {
        var v1 = (0, _parseUnit2.default)(value[0]).value;
        var v2 = (0, _parseUnit2.default)(value[1]).value;

        var vMin = Math.min(v1, v2);
        var vMax = Math.max(v1, v2);

        var hasPositive = vMin <= 0;
        var hasNegative = vMax >= 0;

        if (!hasPositive || !hasNegative) {
            return new Error(warning + ' One value must be >= 0 and the other value <= 0. ' + valueProvided);
        }
    }

    return null;
}

function validateScale(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';

    var value = props[propName];

    var isArray = Array.isArray(value);
    var correctLength = value.length === 2;
    var warning = '[' + propName + '] in <' + componentName + '>.';
    var valueProvided = 'Instead the value provided was [' + value + '].';

    // Make sure it's an array
    if (!isArray) {
        return new Error(warning + ' Must be an array of Numbers or Strings with \'%\' or \'px\' as units. ' + valueProvided);
    }

    // Make sure it has the correct length of 2
    if (isArray && !correctLength) {
        return new Error(warning + ' Must be an Array with a length of 2. ' + valueProvided);
    }

    // Make sure the values are numbers
    if (isArray && correctLength) {
        var isValid = true;

        value.forEach(function (val) {
            isValid = isValid && typeof val === 'number';
        });

        if (!isValid) {
            return new Error(warning + ' Each item in the Array must be a Number. ' + valueProvided);
        }
    }

    // Make sure valid numbers are provided e.g. both positive value
    if (isArray && correctLength) {
        var v1 = (0, _parseUnit2.default)(value[0]).value;
        var v2 = (0, _parseUnit2.default)(value[1]).value;

        var vMin = Math.min(v1, v2);
        var vMax = Math.max(v1, v2);

        var hasPositive = vMin >= 0 && vMax >= 0;

        if (!hasPositive) {
            return new Error(warning + ' Both values must be >= 0. ' + valueProvided);
        }
    }

    return null;
}

function validateOpacity(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';

    var value = props[propName];

    var isArray = Array.isArray(value);
    var correctLength = value.length === 2;
    var warning = '[' + propName + '] in <' + componentName + '>.';
    var valueProvided = 'Instead the value provided was [' + value + '].';

    // Make sure it's an array
    if (!isArray) {
        return new Error(warning + ' Must be an array of Numbers or Strings with \'%\' or \'px\' as units. ' + valueProvided);
    }

    // Make sure it has the correct length of 2
    if (isArray && !correctLength) {
        return new Error(warning + ' Must be an Array with a length of 2. ' + valueProvided);
    }

    // Make sure the values are numbers
    if (isArray && correctLength) {
        var isValid = true;

        value.forEach(function (val) {
            isValid = isValid && typeof val === 'number';
        });

        if (!isValid) {
            return new Error(warning + ' Each item in the Array must be a Number. ' + valueProvided);
        }
    }

    // Make sure valid numbers are provided e.g. both positive value
    if (isArray && correctLength) {
        var v1 = (0, _parseUnit2.default)(value[0]).value;
        var v2 = (0, _parseUnit2.default)(value[1]).value;

        var vMin = Math.min(v1, v2);
        var vMax = Math.max(v1, v2);

        var hasPositive = vMin >= 0 && vMax >= 0;
        var lessThanOne = vMin <= 1 && vMax <= 1;

        if (!hasPositive || !lessThanOne) {
            return new Error(warning + ' Both values must be >= 0 and <= 1. ' + valueProvided);
        }
    }

    return null;
}