export function createElementMock(properties = {}, methods = {}) {
  const element = document.createElement('div');
  Object.keys(properties).forEach((key) => {
    Object.defineProperty(element, key, {
      // @ts-ignore
      value: properties[key],
      writable: false,
    });
  });

  Object.keys(methods).forEach((key) => {
    // @ts-ignore
    element[key] = methods[key];
  });

  return element;
}
