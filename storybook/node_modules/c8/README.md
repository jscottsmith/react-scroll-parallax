# c8 - native V8 code-coverage

![ci](https://github.com/bcoe/c8/workflows/ci/badge.svg)
![nycrc config on GitHub](https://img.shields.io/nycrc/bcoe/c8)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Code-coverage using [Node.js' built in functionality](https://nodejs.org/dist/latest-v10.x/docs/api/cli.html#cli_node_v8_coverage_dir)
that's compatible with [Istanbul's reporters](https://istanbul.js.org/docs/advanced/alternative-reporters/).

Like [nyc](https://github.com/istanbuljs/nyc), c8 just magically works:

```bash
npm i c8 -g
c8 node foo.js
```

The above example will output coverage metrics for `foo.js`.

## CLI Options / Configuration

c8 can be configured via command-line flags, a `c8` section in `package.json`, or a JSON configuration file on disk.

A configuration file can be specified by passing its path on the command line with `--config` or `-c`. If no config option is provided, c8 searches for files named `.c8rc`, `.c8rc.json`, `.nycrc`, or `.nycrc.json`, starting from
`cwd` and walking up the filesystem tree.

When using `package.json` configuration or a dedicated configuration file, omit the `--` prefix from the long-form of the desired command-line option.

Here is a list of common options. Run `c8 --help` for the full list and documentation.

| Option | Description | Type | Default |
| ------ | ----------- | ---- | ------- |
| `-c`, `--config` | path to JSON configuration file | `string` | See above |
| `-r`, `--reporter` | coverage reporter(s) to use | `Array<string>` | `['text']` |
| `-o`, `--reports-dir`, `--report-dir` | directory where coverage reports will be output to | `string` | `./coverage` |
| `--all` | see [section below](#checking-for-full-source-coverage-using---all) for more info | `boolean` | `false` |
| `--src` | see [section below](#checking-for-full-source-coverage-using---all) for more info | `Array<string>` | `[process.cwd()]`|
| `-n`, `--include` | see [section below](#checking-for-full-source-coverage-using---all) for more info | `Array<string>` | `[]` (include all files) |
| `-x`, `--exclude` | see [section below](#checking-for-full-source-coverage-using---all) for more info | `Array<string>` | [list](https://github.com/istanbuljs/schema/blob/master/default-exclude.js) |
| `-e`, `--extension` | only files matching these extensions will show coverage | `string | Array<string>` | [list](https://github.com/istanbuljs/schema/blob/master/default-extension.js) |
| `--skip-full` | do not show files with 100% statement, branch, and function coverage | `boolean` | `false` |
| `--check-coverage` | check whether coverage is within thresholds provided | `boolean` | `false` |
| `--temp-directory` | directory V8 coverage data is written to and read from | `string` | `process.env.NODE_V8_COVERAGE` |
| `--clean` | should temp files be deleted before script execution | `boolean` | `true` |

## Checking for "full" source coverage using `--all`

By default v8 will only give us coverage for files that were loaded by the engine. If there are source files in your
project that are flexed in production but not in your tests, your coverage numbers will not reflect this. For example,
if your project's `main.js` loads `a.js` and `b.js` but your unit tests only load `a.js` your total coverage
could show as `100%` for `a.js` when in fact both `main.js` and `b.js` are uncovered.

By supplying `--all` to c8, all files in directories specified with `--src` (defaults to `cwd`) that pass the `--include`
and `--exclude` flag checks, will be loaded into the report. If any of those files remain uncovered they will be factored
into the report with a default of 0% coverage.

## c8 report

run `c8 report` to regenerate reports after `c8` has already been run.

## Checking coverage

c8 can fail tests if coverage falls below a threshold.
After running your tests with c8, simply run:

```shell
c8 check-coverage --lines 95 --functions 95 --branches 95
```

c8 also accepts a `--check-coverage` shorthand, which can be used to
both run tests and check that coverage falls within the threshold provided:

```shell
c8 --check-coverage --lines 100 npm test
```

The above check fails if coverage falls below 100%.

To check thresholds on a per-file basis run:

```shell
c8 check-coverage --lines 95 --per-file
```

If you want to check for 100% coverage across all dimensions, use `--100`:

```shell
c8 --100 npm test
```

Is equivalent to

```shell
c8 --check-coverage --lines 100 --functions 100 --branches 100 --statements 100  npm test
```

The `--100` flag can be set for the `check-coverage` as well:

```shell
c8 check-coverage --100
```

## Ignoring Uncovered Lines, Functions, and Blocks

Sometimes you might find yourself wanting to ignore uncovered portions of your
codebase. For example, perhaps you run your tests on Linux, but
there's some logic that only executes on Windows.

To ignore lines, blocks, and functions, use the special comment:

`/* c8 ignore next */`.

### Ignoring the next line

```js
const myVariable = 99
/* c8 ignore next */
if (process.platform === 'win32') console.info('hello world')
```

### Ignoring the next N lines

```js
const myVariable = 99
/* c8 ignore next 3 */
if (process.platform === 'win32') {
  console.info('hello world')
}
```

### Ignoring all lines until told

```js
/* c8 ignore start */
function dontMindMe() {
  // ...
}
/* c8 ignore stop */
```

### Ignoring a block on the current line

```js
const myVariable = 99
const os = process.platform === 'darwin' ? 'OSXy' /* c8 ignore next */ : 'Windowsy'
```

## Supported Node.js Versions

c8 uses
[native V8 coverage](https://github.com/nodejs/node/pull/22527),
make sure you're running Node.js `>= 10.12.0`.

## Contributing to `c8`

See the [contributing guide here](./CONTRIBUTING.md).
