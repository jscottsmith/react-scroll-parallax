function managerEntries(entry = [], options) {
  return [...entry, require.resolve('./dist/esm/register')];
}

function config(entry = [], options = {}) {
  const { framework } = options;
  const docsConfig = [require.resolve('./dist/esm/frameworks/common/config')];
  try {
    docsConfig.push(require.resolve(`./dist/esm/frameworks/${framework}/config`));
  } catch (err) {
    // there is no custom config for the user's framework, do nothing
  }
  return [...docsConfig, ...entry];
}

module.exports = {
  managerEntries,
  config,
};
