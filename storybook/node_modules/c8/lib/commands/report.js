const { checkCoverages } = require('./check-coverage')
const Report = require('../report')

exports.command = 'report'

exports.describe = 'read V8 coverage data from temp and output report'

exports.handler = async function (argv) {
  await exports.outputReport(argv)
}

exports.outputReport = async function (argv) {
  // TODO: this is a workaround until yargs gets upgraded to v17, see https://github.com/bcoe/c8/pull/332#discussion_r721636191
  if (argv['100']) {
    argv.checkCoverage = 100
    argv.lines = 100
    argv.functions = 100
    argv.branches = 100
    argv.statements = 100
  }
  const report = Report({
    include: argv.include,
    exclude: argv.exclude,
    extension: argv.extension,
    excludeAfterRemap: argv.excludeAfterRemap,
    reporter: Array.isArray(argv.reporter) ? argv.reporter : [argv.reporter],
    reportsDirectory: argv['reports-dir'],
    tempDirectory: argv.tempDirectory,
    watermarks: argv.watermarks,
    resolve: argv.resolve,
    omitRelative: argv.omitRelative,
    wrapperLength: argv.wrapperLength,
    all: argv.all,
    allowExternal: argv.allowExternal,
    src: argv.src,
    skipFull: argv.skipFull,
    excludeNodeModules: argv.excludeNodeModules
  })
  await report.run()
  if (argv.checkCoverage) await checkCoverages(argv, report)
}
