/* eslint-disable */
const React = require('react');
const ReactDOM = require('react-dom');

export default function expectRenderError(
    element,
    expectedError,
    expectedErrorLength = 1
) {
    // Noop error boundary for testing.
    class TestBoundary extends React.Component {
        constructor(props) {
            super(props);
            this.state = { didError: false };
        }
        componentDidCatch(err) {
            this.setState({ didError: true });
        }
        render() {
            return this.state.didError ? null : this.props.children;
        }
    }

    // Record all errors.
    let topLevelErrors = [];
    function handleTopLevelError(event) {
        topLevelErrors.push(event.error);
        // Prevent logging
        event.preventDefault();
    }

    const div = document.createElement('div');
    window.addEventListener('error', handleTopLevelError);
    try {
        ReactDOM.render(<TestBoundary>{element}</TestBoundary>, div);
    } finally {
        window.removeEventListener('error', handleTopLevelError);
    }

    expect(topLevelErrors.length).toBe(expectedErrorLength);
    expect(topLevelErrors[0].message).toContain(expectedError);
}
