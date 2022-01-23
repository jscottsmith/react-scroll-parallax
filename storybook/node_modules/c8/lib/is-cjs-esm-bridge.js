module.exports = ({ functions }) => {
  // https://github.com/nodejs/node/blob/v12.1.0/lib/internal/modules/esm/create_dynamic_module.js#L11-L19
  return functions.length === 3 &&
  functions[0].functionName === '' &&
  functions[0].isBlockCoverage === true &&
  functions[1].functionName === 'get' &&
  functions[1].isBlockCoverage === false &&
  functions[2].functionName === 'set' &&
  functions[2].isBlockCoverage === true
}
