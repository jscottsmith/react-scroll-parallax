export function testForPassiveScroll() {
  let supportsPassiveOption = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassiveOption = true;
        return true;
      },
    });
    // @ts-expect-error
    window.addEventListener('test', null, opts);
    // @ts-expect-error
    window.removeEventListener('test', null, opts);
  } catch (e) {}
  return supportsPassiveOption;
}
