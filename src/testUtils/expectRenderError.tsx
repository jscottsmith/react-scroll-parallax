/* eslint-disable */
const React = require('react');
const { createRoot } = require('react-dom/client');

export default function expectRenderError(
  element: any,
  expectedError: string,
  expectedErrorLength: number = 1
) {
  // Noop error boundary for testing.
  class TestBoundary extends React.Component {
    constructor(props: any) {
      super(props);
      this.state = { didError: false };
    }
    componentDidCatch() {
      this.setState({ didError: true });
    }
    render() {
      return this.state.didError ? null : this.props.children;
    }
  }

  // Record all errors.
  let topLevelErrors: ErrorEvent[] = [];
  function handleTopLevelError(event: ErrorEvent) {
    topLevelErrors.push(event.error);
    // Prevent logging
    event.preventDefault();
  }

  const div = document.createElement('div');
  window.addEventListener('error', handleTopLevelError);
  try {
    const root = createRoot(div);
    // @ts-ignore
    root.render(<TestBoundary>{element}</TestBoundary>, div);
  } finally {
    window.removeEventListener('error', handleTopLevelError);
  }

  expect(topLevelErrors.length).toBe(expectedErrorLength);
  expect(topLevelErrors[0].message).toContain(expectedError);
}
