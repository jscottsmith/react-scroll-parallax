function managerEntries(entry, options) {
  return [...entry, require.resolve('./dist/esm/register')];
}

function config(entry = [], { addDecorator = true } = {}) {
  const actionConfig = [];
  if (addDecorator) {
    actionConfig.push(require.resolve('./dist/esm/preset/addDecorator'));
  }
  return [...entry, ...actionConfig, require.resolve('./dist/esm/preset/addArgs')];
}

module.exports = {
  managerEntries,
  config,
};
