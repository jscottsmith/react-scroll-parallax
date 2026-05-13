export function createElementMock(properties = {}, methods = {}) {
  const element = document.createElement('div');
  Object.keys(properties).map(key => {
    Object.defineProperty(element, key, {
      // @ts-ignore
      value: properties[key],
      writable: false,
    });
  });

  Object.keys(methods).map(key => {
    // @ts-ignore
    element[key] = methods[key];
  });

  return element;
}
