function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/esm/register')];
}

function config(entry = [], { addDecorator = true } = {}) {
  const linkConfig = [];
  if (addDecorator) {
    linkConfig.push(require.resolve('./dist/esm/preset/addDecorator'));
  }
  return [...entry, ...linkConfig];
}

module.exports = { managerEntries, config };
