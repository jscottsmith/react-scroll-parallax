export function offsetMin(props, propName, componentName = 'ANONYMOUS') {
    let value = props[propName];
    const isValid = typeof value === 'string' || typeof value === 'number';

    if (!isValid) {
        return new Error(
            `[${propName}] in ${componentName} must be a string with with "%"" or "px" units or number.`
        );
    }

    if (props[propName]) {
        if (typeof value === 'string') {
            value = parseInt(value, 10);
        }
        return value <= 0
            ? null
            : new Error(
                  `[${propName}] in ${componentName} is greater than zero. [${propName}] must be less than or equal to zero.`
              );
    }
    return null;
}

export function offsetMax(props, propName, componentName = 'ANONYMOUS') {
    let value = props[propName];
    const isValid = typeof value === 'string' || typeof value === 'number';

    if (!isValid) {
        return new Error(
            `[${propName}] in ${componentName} must be a string with with "%"" or "px" units or number.`
        );
    }

    if (props[propName]) {
        if (typeof value === 'string') {
            value = parseInt(value, 10);
        }
        return value >= 0
            ? null
            : new Error(
                  `[${propName}] in ${componentName} is less than zero. [${propName}] must be greater than or equal to zero.`
              );
    }
    return null;
}
