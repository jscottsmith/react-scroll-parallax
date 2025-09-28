/* eslint-disable */
const React = require('react');
const { createRoot } = require('react-dom/client');
const { act } = require('react-dom/test-utils');

export default function expectRenderError(
  element: any,
  expectedError: string,
  expectedErrorLength: number = 1
) {
  // Suppress console errors during test
  const originalConsoleError = console.error;
  console.error = () => {};

  const div = document.createElement('div');
  const root = createRoot(div);

  let caughtError: Error | null = null;

  try {
    act(() => {
      root.render(element);
    });
  } catch (error) {
    caughtError = error as Error;
  }

  // Restore console.error
  console.error = originalConsoleError;

  // Check if we caught the expected error
  if (caughtError) {
    expect(caughtError.message).toContain(expectedError);
  } else {
    // If no error was caught, the test should fail
    expect(caughtError).not.toBeNull();
  }
}
