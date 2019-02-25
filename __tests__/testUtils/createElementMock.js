export function createElementMock(properties = {}, methods = {}) {
    const element = document.createElement('div');
    Object.keys(properties).map(key => {
        Object.defineProperty(element, key, {
            value: properties[key],
            writable: false,
        });
    });

    Object.keys(methods).map(key => {
        element[key] = methods[key];
    });

    return element;
}
