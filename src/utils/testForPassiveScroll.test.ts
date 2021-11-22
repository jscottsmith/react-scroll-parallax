import { testForPassiveScroll } from './testForPassiveScroll';

const addEventListener = window.addEventListener;
const removeEventListener = window.removeEventListener;

describe('Expect the testForPassiveScroll function', () => {
  afterEach(() => {
    window.addEventListener = addEventListener;
    window.removeEventListener = removeEventListener;
  });

  it('to return a boolean', () => {
    const bool = testForPassiveScroll();
    expect(bool).toBe(true);
  });

  it('to add and remove a test listener', () => {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    testForPassiveScroll();
    // @ts-ignore
    expect(window.addEventListener.mock.calls[0]).toEqual(
      expect.arrayContaining(['test', null, expect.any(Object)])
    );
    // @ts-ignore
    expect(window.removeEventListener.mock.calls[0]).toEqual(
      expect.arrayContaining(['test', null, expect.any(Object)])
    );
  });
});
