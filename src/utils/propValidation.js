import parseUnit from './parseUnit';

export function validateOffsets(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';

    let value = props[propName];
    // console.log(value);

    const isArray = Array.isArray(value);
    const correctLength = value.length === 2;
    const warning = `[${propName}] in <${componentName}>.`;
    const valueProvided = `Instead the value provided was [${value}].`;

    // Make sure it's an array
    if (!isArray) {
        return new Error(
            `${warning} Must be an array of Numbers or Strings with '%' or 'px' as units. ${valueProvided}`
        );
    }

    // Make sure it has the correct length of 2
    if (isArray && !correctLength) {
        return new Error(
            `${warning} Must be an Array with a length of 2. ${valueProvided}`
        );
    }

    // Make sure the values are strings or numbers
    if (isArray && correctLength) {
        let isValid = true;

        value.forEach(val => {
            isValid =
                isValid && (typeof val === 'string' || typeof val === 'number');
        });

        if (!isValid) {
            return new Error(
                `${warning} Each item in the Array must be a Number or String with '%' or 'px' as units. ${valueProvided}`
            );
        }
    }

    // Make sure the units are correct
    if (isArray && correctLength) {
        const hasMatchingUnits = value.reduce((acc, val, idx) => {
            const parsedValue = parseUnit(val);
            if (!acc) {
                // return the first unit
                return parsedValue.unit;
            } else {
                // test if units match
                return acc === parsedValue.unit;
            }
        }, null);

        if (!hasMatchingUnits) {
            return new Error(
                `${warning} Each item in the Array must have matching units. ${valueProvided}`
            );
        }
    }

    // Make sure a valid unit is provided
    if (isArray && correctLength) {
        const validUnits = ['px', '%']; // NOTE: Allowing 'em', 'rem', 'vh', 'vw' would require bounds adjustments
        const hasValidUnits = value.reduce((acc, val, idx) => {
            const parsedValue = parseUnit(val);
            if (acc) {
                // test if previous passed
                return validUnits.find(val => val === parsedValue.unit);
            } else {
                // return false if prev test failed
                return false;
            }
        }, true);

        if (!hasValidUnits) {
            return new Error(
                `${warning} Each item in the Array must have a valid unit of 'px' or '%'. ${valueProvided}`
            );
        }
    }

    return null;
}
