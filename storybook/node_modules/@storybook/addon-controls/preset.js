function managerEntries(entry = [], options) {
  // eslint-disable-next-line global-require
  const { checkDocsLoaded } = require('./dist/cjs/preset/checkDocsLoaded');
  checkDocsLoaded(options.configDir);
  return [...entry, require.resolve('./dist/esm/register')];
}

module.exports = { managerEntries };
