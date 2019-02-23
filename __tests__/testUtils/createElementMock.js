export function createElementMock() {
    const elOuter = document.createElement('div');
    Object.defineProperty(elOuter, 'offsetHeight', {
        value: 120,
        writable: false,
    });
    Object.defineProperty(elOuter, 'offsetWidth', {
        value: 120,
        writable: false,
    });
    return elOuter;
}
