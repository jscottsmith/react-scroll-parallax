// Workaround for refs
// See https://github.com/facebook/react/issues/7740
export default function createNodeMock() {
  const div = document.createElement('div');

  return {
    getBoundingClientRect: () => div.getBoundingClientRect(),
    style: { transform: '' },
  };
}
