# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [7.11.0](https://github.com/bcoe/c8/compare/v7.10.0...v7.11.0) (2021-12-30)


### Features

* add --extension option ([#331](https://github.com/bcoe/c8/issues/331)) ([ff01cd8](https://github.com/bcoe/c8/commit/ff01cd832a155494892b24c30c5a1c8f0169fd8e))


### Bug Fixes

* **config:** support configuration inheritance ([#343](https://github.com/bcoe/c8/issues/343)) ([e81ed5d](https://github.com/bcoe/c8/commit/e81ed5dd9ef5dac1a1f2f6dc26a07abb6c05d709))

## [7.10.0](https://www.github.com/bcoe/c8/compare/v7.9.0...v7.10.0) (2021-10-06)


### Features

* `--100` ([#332](https://www.github.com/bcoe/c8/issues/332)) ([4205f2f](https://www.github.com/bcoe/c8/commit/4205f2f33585693d82c2500d0d6850571965bb8b))

## [7.9.0](https://www.github.com/bcoe/c8/compare/v7.8.0...v7.9.0) (2021-09-10)


### Features

* add --exclude-node-modules option ([#321](https://www.github.com/bcoe/c8/issues/321)) ([a4733c6](https://www.github.com/bcoe/c8/commit/a4733c68abd778757bb6ed641e074be94b79c417))

## [7.8.0](https://www.github.com/bcoe/c8/compare/v7.7.3...v7.8.0) (2021-07-10)


### Features

* add --config option and documentation on options and configs ([#308](https://www.github.com/bcoe/c8/issues/308)) ([99436ef](https://www.github.com/bcoe/c8/commit/99436ef131c2ab966174b5012fe22e499fb44ccd))

### [7.7.3](https://www.github.com/bcoe/c8/compare/v7.7.2...v7.7.3) (2021-06-03)


### Bug Fixes

* **deps:** v8-to-istanbul with fix for Windows paths ([#311](https://www.github.com/bcoe/c8/issues/311)) ([ef1b875](https://www.github.com/bcoe/c8/commit/ef1b8757f5f9c664cf63cfce753e93b92057cab5))

### [7.7.2](https://www.github.com/bcoe/c8/compare/v7.7.1...v7.7.2) (2021-05-02)


### Bug Fixes

* address bugs with source remapping on Windows ([#301](https://www.github.com/bcoe/c8/issues/301)) ([c817902](https://www.github.com/bcoe/c8/commit/c81790262f843c01b3d14390fde81dbdbcf2226f))

### [7.7.1](https://www.github.com/bcoe/c8/compare/v7.7.0...v7.7.1) (2021-04-07)


### Bug Fixes

* **types:** add excludeAfterRemap and allowExternal  ([#297](https://www.github.com/bcoe/c8/issues/297)) ([e32a53f](https://www.github.com/bcoe/c8/commit/e32a53ff050b5faf740da4e9c3fb08e70e29d60d))

## [7.7.0](https://www.github.com/bcoe/c8/compare/v7.6.0...v7.7.0) (2021-03-30)


### Features

* introduce --exclude-after-remap flag ([#293](https://www.github.com/bcoe/c8/issues/293)) ([53c4234](https://www.github.com/bcoe/c8/commit/53c42347e0ed4eb29e37b84d40768eed89bf9eb0)), closes [#224](https://www.github.com/bcoe/c8/issues/224)

## [7.6.0](https://www.github.com/bcoe/c8/compare/v7.5.0...v7.6.0) (2021-02-17)


### Features

* add --skip-full ([#287](https://www.github.com/bcoe/c8/issues/287)) ([8b01b63](https://www.github.com/bcoe/c8/commit/8b01b63740d7af75fe83d0164c0f18021592e1a6))

## [7.5.0](https://www.github.com/bcoe/c8/compare/v7.4.0...v7.5.0) (2021-02-01)


### Features

* **all:** handle base64 inline source maps ([#283](https://www.github.com/bcoe/c8/issues/283)) ([3f12dd4](https://www.github.com/bcoe/c8/commit/3f12dd4cd4b903b396c60c9c6d76cdf990ec6cbe))

## [7.4.0](https://www.github.com/bcoe/c8/compare/v7.3.5...v7.4.0) (2020-12-31)


### Features

* support ignore start/stop comment ([#273](https://www.github.com/bcoe/c8/issues/273)) ([90949fa](https://www.github.com/bcoe/c8/commit/90949fa2deac7fccb9fc4b83ecca70f4de025ae9)), closes [#271](https://www.github.com/bcoe/c8/issues/271)
* use debuglog rather than console.warn ([#279](https://www.github.com/bcoe/c8/issues/279)) ([7c04a4d](https://www.github.com/bcoe/c8/commit/7c04a4dc47ee9496d89fcae9062da24a6f642f39))

### [7.3.5](https://www.github.com/bcoe/c8/compare/v7.3.4...v7.3.5) (2020-10-25)


### Bug Fixes

* **v8-to-istanbul:** fixes shebang handling/ignore behavior ([#267](https://www.github.com/bcoe/c8/issues/267)) ([21cd41f](https://www.github.com/bcoe/c8/commit/21cd41f5ed2b7b3ef81bbad2ae57b531934915cc))

### [7.3.4](https://www.github.com/bcoe/c8/compare/v7.3.3...v7.3.4) (2020-10-15)


### Bug Fixes

* support node@v15.x.x built-in modules ([#265](https://www.github.com/bcoe/c8/issues/265)) ([1b90a22](https://www.github.com/bcoe/c8/commit/1b90a221d540354c552da10d90ef7d1f7a8e8227))

### [7.3.3](https://www.github.com/bcoe/c8/compare/v7.3.2...v7.3.3) (2020-10-09)


### Bug Fixes

* **v8-to-istanbul:** revert off by one that broke TypeScript ([#262](https://www.github.com/bcoe/c8/issues/262)) ([81ab5b7](https://www.github.com/bcoe/c8/commit/81ab5b7bf0ceccef3e5c936eb6b77f06a727a109))

### [7.3.2](https://www.github.com/bcoe/c8/compare/v7.3.1...v7.3.2) (2020-10-08)


### Bug Fixes

* **v8-to-istanbul:** pull in fix for missing branches ([#258](https://www.github.com/bcoe/c8/issues/258)) ([eaffa78](https://www.github.com/bcoe/c8/commit/eaffa7836155d051a0d13899f70a728819860bdb))

### [7.3.1](https://www.github.com/bcoe/c8/compare/v7.3.0...v7.3.1) (2020-09-10)


### Bug Fixes

* **deps:** update dependency yargs to v16 ([#251](https://www.github.com/bcoe/c8/issues/251)) ([0436816](https://www.github.com/bcoe/c8/commit/0436816ef0ceb4cff25f65dfff1843a2bad80ca1))
* **deps:** update dependency yargs-parser to v20 ([#252](https://www.github.com/bcoe/c8/issues/252)) ([ae845f0](https://www.github.com/bcoe/c8/commit/ae845f0bf52c5b1547263079f210ad99c6bd4d7b))
* add missing space in text ([#245](https://www.github.com/bcoe/c8/issues/245)) ([efe6d04](https://www.github.com/bcoe/c8/commit/efe6d041aa0a1620f9b2e4717ba5d2a96da7a5a3))
* **deps:** update dependency find-up to v5 ([#242](https://www.github.com/bcoe/c8/issues/242)) ([8a0cfd7](https://www.github.com/bcoe/c8/commit/8a0cfd702e35fa9d7e87ef99f0fd08dd92cd9614))
* **deps:** update dependency yargs-parser to v19 ([#241](https://www.github.com/bcoe/c8/issues/241)) ([baa01df](https://www.github.com/bcoe/c8/commit/baa01df3dede86373773acfae086647da2b43549))

## [7.3.0](https://www.github.com/bcoe/c8/compare/v7.2.1...v7.3.0) (2020-08-03)


### Features

* adds support for 1:many source maps ([#238](https://www.github.com/bcoe/c8/issues/238)) ([dbf94a0](https://www.github.com/bcoe/c8/commit/dbf94a0dcf8104ef8d5ec1ccd6198594bc6c2bd3))

### [7.2.1](https://www.github.com/bcoe/c8/compare/v7.2.0...v7.2.1) (2020-07-11)


### Bug Fixes

* ignore missing source maps in raw coverage output ([#233](https://www.github.com/bcoe/c8/issues/233)) ([eed98af](https://www.github.com/bcoe/c8/commit/eed98afae8dc6878c64b157d5007b0d9ce3bd59f))

## [7.2.0](https://www.github.com/bcoe/c8/compare/v7.1.2...v7.2.0) (2020-05-25)


### Features

* support for instrumenting files outside of current working directory ([7e53a0e](https://www.github.com/bcoe/c8/commit/7e53a0ecf93eda5467e2a8ac7d33cf8d6af84cf1))

### [7.1.2](https://www.github.com/bcoe/c8/compare/v7.1.1...v7.1.2) (2020-05-04)


### Bug Fixes

* **deps:** update dependency yargs-parser to v18 ([#202](https://www.github.com/bcoe/c8/issues/202)) ([983de44](https://www.github.com/bcoe/c8/commit/983de440cf8876eb223975f06ddb658a7b8f4220))

### [7.1.1](https://www.github.com/bcoe/c8/compare/v7.1.0...v7.1.1) (2020-04-29)


### Bug Fixes

* **deps:** update dependency yargs-parser to v17 ([#201](https://www.github.com/bcoe/c8/issues/201)) ([d730c63](https://www.github.com/bcoe/c8/commit/d730c63235c1292da65cdc19ba68ffcb9d316dc2))
* escaping issue with cobertura reporter ([#203](https://www.github.com/bcoe/c8/issues/203)) ([e93747b](https://www.github.com/bcoe/c8/commit/e93747b9e9044fa14f5ceebda9d0d789aba1c655))

## [7.1.0](https://www.github.com/bcoe/c8/compare/v7.0.1...v7.1.0) (2020-02-09)


### Features

* adds TypeScript definitions ([d39801b](https://www.github.com/bcoe/c8/commit/d39801bc9b2713aa56592010e6394a295bd12b0b)), closes [#195](https://www.github.com/bcoe/c8/issues/195)


### Bug Fixes

* **deps:** update dependency furi to v2 ([#193](https://www.github.com/bcoe/c8/issues/193)) ([6b9af6e](https://www.github.com/bcoe/c8/commit/6b9af6ee8cbbacd85eea91dc49bb269fe3651c12))
* **deps:** v8-to-istanbul with patch for crasher ([#200](https://www.github.com/bcoe/c8/issues/200)) ([d4b7d80](https://www.github.com/bcoe/c8/commit/d4b7d80d78f3d1cb2e9a2e9e106af0cef327b446))

### [7.0.1](https://www.github.com/bcoe/c8/compare/v7.0.0...v7.0.1) (2020-01-13)


### Bug Fixes

* all flag not propagated to check-coverage command ([#188](https://www.github.com/bcoe/c8/issues/188)) ([86eaf72](https://www.github.com/bcoe/c8/commit/86eaf72a8c7af93d6ec9699b741d11df50017a8d))

## [7.0.0](https://www.github.com/bcoe/c8/compare/v6.0.1...v7.0.0) (2019-12-22)


### ⚠ BREAKING CHANGES

* new test-exclude with modified exclude rules (#179)
* **istanbul-reports:** lcov reports now use relative paths (#168)

### Features

* adds --all functionality ([#158](https://www.github.com/bcoe/c8/issues/158)) ([2eb631e](https://www.github.com/bcoe/c8/commit/2eb631e460eba3d06925ee1d128e0db82ec50b6c))
* **istanbul-reports:** lcov reports now use relative paths ([#168](https://www.github.com/bcoe/c8/issues/168)) ([35d9338](https://www.github.com/bcoe/c8/commit/35d9338b69ba803c19a19d16ff601e3ec5692fa6))
* new test-exclude with modified exclude rules ([#179](https://www.github.com/bcoe/c8/issues/179)) ([af7d94d](https://www.github.com/bcoe/c8/commit/af7d94d715ab98d67e6b5bff5dfba19430681c9c))


### Bug Fixes

* **deps:** update dependency v8-to-istanbul to v4 ([#167](https://www.github.com/bcoe/c8/issues/167)) ([97b9769](https://www.github.com/bcoe/c8/commit/97b97699870ddc4af780cedb25cbb3a87e0eb777))
* **deps:** update dependency yargs to v15 ([#164](https://www.github.com/bcoe/c8/issues/164)) ([e41a483](https://www.github.com/bcoe/c8/commit/e41a4831aac92591f303d48038a327e9631affee))
* **deps:** update dependency yargs-parser to v16 ([#157](https://www.github.com/bcoe/c8/issues/157)) ([15746e5](https://www.github.com/bcoe/c8/commit/15746e51640e6e172f27f02c12056e2977342005))

### [6.0.1](https://github.com/bcoe/c8/compare/v6.0.0...v6.0.1) (2019-10-26)


### Bug Fixes

* regex flags in dependency were breaking Node 8 ([a9d9645](https://github.com/bcoe/c8/commit/a9d9645858031cee985087828f5e04cfd8922868))

## [6.0.0](https://github.com/bcoe/c8/compare/v5.0.4...v6.0.0) (2019-10-24)


### ⚠ BREAKING CHANGES

* Node.js' source-map and lineLength cache is now used to remap coverage output (this allows tools like ts-node to be supported, which transpile at runtime).

### Features

* use Node.js' source-map cache, to support tools like ts-node ([#152](https://github.com/bcoe/c8/issues/152)) ([53bba15](https://github.com/bcoe/c8/commit/53bba15bee07e8f0446fd85cc59d2b562fe34a21))


### Bug Fixes

* **deps:** update dependency yargs-parser to v15 ([#153](https://github.com/bcoe/c8/issues/153)) ([80153de](https://github.com/bcoe/c8/commit/80153de61be8e5830f1c228945184e4878f8cf0c))

### [5.0.4](https://github.com/bcoe/c8/compare/v5.0.3...v5.0.4) (2019-09-06)


### Bug Fixes

* **deps:** merging failed when the same script occurred multiple times in the same report ([#147](https://github.com/bcoe/c8/issues/147)) ([1ebcaf9](https://github.com/bcoe/c8/commit/1ebcaf9))
* don't load JSON that does not look like coverage ([#146](https://github.com/bcoe/c8/issues/146)) ([a6481f1](https://github.com/bcoe/c8/commit/a6481f1))
* **deps:** update dependency yargs-parser to v14 ([#144](https://github.com/bcoe/c8/issues/144)) ([9b3d089](https://github.com/bcoe/c8/commit/9b3d089))

### [5.0.3](https://www.github.com/bcoe/c8/compare/v5.0.2...v5.0.3) (2019-09-06)


### Bug Fixes

* **deps:** update dependency rimraf to v3 ([#132](https://www.github.com/bcoe/c8/issues/132)) ([7601748](https://www.github.com/bcoe/c8/commit/7601748))
* **deps:** update dependency yargs to v14 ([#134](https://www.github.com/bcoe/c8/issues/134)) ([e49737f](https://www.github.com/bcoe/c8/commit/e49737f))
* **deps:** update deps to address warning in cross-spawn ([#141](https://www.github.com/bcoe/c8/issues/141)) ([4b66221](https://www.github.com/bcoe/c8/commit/4b66221))

### [5.0.2](https://www.github.com/bcoe/c8/compare/v5.0.1...v5.0.2) (2019-06-24)


### Bug Fixes

* HTML report now has correct source positions for Node >10.16.0 ([#125](https://www.github.com/bcoe/c8/issues/125)) ([c49fa7f](https://www.github.com/bcoe/c8/commit/c49fa7f))
* **deps:** update dependency find-up to v4 ([#119](https://www.github.com/bcoe/c8/issues/119)) ([c568d96](https://www.github.com/bcoe/c8/commit/c568d96))
* **deps:** update dependency yargs-parser to v13 ([#124](https://www.github.com/bcoe/c8/issues/124)) ([1eb3394](https://www.github.com/bcoe/c8/commit/1eb3394))
* do not override NODE_V8_COVERAGE if set ([#70](https://www.github.com/bcoe/c8/issues/70)) ([8bb67b0](https://www.github.com/bcoe/c8/commit/8bb67b0))

### [5.0.1](https://www.github.com/bcoe/c8/compare/v5.0.0...v5.0.1) (2019-05-20)


### Bug Fixes

* temporary files should be in tmp folder ([#106](https://www.github.com/bcoe/c8/issues/106)) ([64dd2e6](https://www.github.com/bcoe/c8/commit/64dd2e6))

## [5.0.0](https://www.github.com/bcoe/c8/compare/v4.1.5...v5.0.0) (2019-05-20)


### ⚠ BREAKING CHANGES

* temp directory now defaults to setting for report directory

### Features

* default temp directory to report directory ([#102](https://www.github.com/bcoe/c8/issues/102)) ([8602f4a](https://www.github.com/bcoe/c8/commit/8602f4a))
* load .nycrc/.nycrc.json to simplify migration ([#100](https://www.github.com/bcoe/c8/issues/100)) ([bd7484f](https://www.github.com/bcoe/c8/commit/bd7484f))

### [4.1.5](https://github.com/bcoe/c8/compare/v4.1.4...v4.1.5) (2019-05-11)


### Bug Fixes

* exit with code 1 when report output fails ([#92](https://github.com/bcoe/c8/issues/92)) ([a27b694](https://github.com/bcoe/c8/commit/a27b694))
* remove the unmaintained mkdirp dependency ([#91](https://github.com/bcoe/c8/issues/91)) ([a465b65](https://github.com/bcoe/c8/commit/a465b65))



## [4.1.4](https://github.com/bcoe/c8/compare/v4.1.3...v4.1.4) (2019-05-03)


### Bug Fixes

* we were not exiting with 1 if mkdir failed ([#89](https://github.com/bcoe/c8/issues/89)) ([fb02ed6](https://github.com/bcoe/c8/commit/fb02ed6))



## [4.1.3](https://github.com/bcoe/c8/compare/v4.1.2...v4.1.3) (2019-05-03)


### Bug Fixes

* switch to mkdirp for Node 8 ([206b83f](https://github.com/bcoe/c8/commit/206b83f))



## [4.1.2](https://github.com/bcoe/c8/compare/v4.1.1...v4.1.2) (2019-05-02)


### Bug Fixes

* make tmp directory regardless of clean ([44d2185](https://github.com/bcoe/c8/commit/44d2185))



## [4.1.1](https://github.com/bcoe/c8/compare/v4.1.0...v4.1.1) (2019-05-02)



# [4.1.0](https://github.com/bcoe/c8/compare/v4.0.0...v4.1.0) (2019-05-02)


### Bug Fixes

* exclude coverage of the CJS-ESM bridge from results ([#83](https://github.com/bcoe/c8/issues/83)) ([da2c945](https://github.com/bcoe/c8/commit/da2c945))
* upgrade to @bcoe/v8-coverage with breaking regex dropped ([6c28e7f](https://github.com/bcoe/c8/commit/6c28e7f))


### Features

* add --report-dir alias (for consistency with nyc) ([0dd1b04](https://github.com/bcoe/c8/commit/0dd1b04))
* add support for ignoring lines, functions, and blocks ([#87](https://github.com/bcoe/c8/issues/87)) ([c66950e](https://github.com/bcoe/c8/commit/c66950e))



# [4.0.0](https://github.com/bcoe/c8/compare/v3.5.0...v4.0.0) (2019-05-02)


### Features

* add support for 1:1 source-maps ([#85](https://github.com/bcoe/c8/issues/85)) ([6ca4345](https://github.com/bcoe/c8/commit/6ca4345))
* foreground-child's done() method was not being called ([#82](https://github.com/bcoe/c8/issues/82)) ([fde596e](https://github.com/bcoe/c8/commit/fde596e))


### BREAKING CHANGES

* c8 will now load source-maps if possible and remap coverage accordingly



# [3.5.0](https://github.com/bcoe/c8/compare/v3.4.0...v3.5.0) (2019-04-12)


### Features

* allow  --reports-dir to be configured ([#65](https://github.com/bcoe/c8/issues/65)) ([5ab31f5](https://github.com/bcoe/c8/commit/5ab31f5))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/bcoe/c8/compare/v3.3.0...v3.4.0) (2019-01-24)


### Features

* support --check-coverage for reports ([#60](https://github.com/bcoe/c8/issues/60)) ([b542930](https://github.com/bcoe/c8/commit/b542930))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/bcoe/c8/compare/v3.2.1...v3.3.0) (2019-01-23)


### Bug Fixes

* file URL to system path conversion ([#46](https://github.com/bcoe/c8/issues/46)) ([e7f8cf2](https://github.com/bcoe/c8/commit/e7f8cf2))
* float patch for branch/function coverage merge bug ([#56](https://github.com/bcoe/c8/issues/56)) ([1de0cca](https://github.com/bcoe/c8/commit/1de0cca))
* snapshot ([7fd9e13](https://github.com/bcoe/c8/commit/7fd9e13))


### Features

* add thresholds for enforcing coverage percentage ([#59](https://github.com/bcoe/c8/issues/59)) ([70e8943](https://github.com/bcoe/c8/commit/70e8943))
* allow script wrapper length to be specified ([#51](https://github.com/bcoe/c8/issues/51)) ([a22c4e0](https://github.com/bcoe/c8/commit/a22c4e0))



<a name="3.2.1"></a>
## [3.2.1](https://github.com/bcoe/c8/compare/v3.2.0...v3.2.1) (2018-10-21)


### Bug Fixes

* address file:// issue with CJS ([#39](https://github.com/bcoe/c8/issues/39)) ([d4f9cab](https://github.com/bcoe/c8/commit/d4f9cab))
* process coverage merging ([#37](https://github.com/bcoe/c8/issues/37)) ([67959b4](https://github.com/bcoe/c8/commit/67959b4))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/bcoe/c8/compare/v3.1.0...v3.2.0) (2018-09-16)


### Bug Fixes

* make tests run on Windows ([#25](https://github.com/bcoe/c8/issues/25)) ([08e44d0](https://github.com/bcoe/c8/commit/08e44d0))


### Features

* improve test assertions ([#28](https://github.com/bcoe/c8/issues/28)) ([522720e](https://github.com/bcoe/c8/commit/522720e))
* warn instead of throw on exception ([#29](https://github.com/bcoe/c8/issues/29)) ([a8620d4](https://github.com/bcoe/c8/commit/a8620d4))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/bcoe/c8/compare/v3.0.3...v3.1.0) (2018-09-11)


### Features

* allow relative paths to be optionally included ([3806c79](https://github.com/bcoe/c8/commit/3806c79))



<a name="3.0.3"></a>
## [3.0.3](https://github.com/bcoe/c8/compare/v3.0.2...v3.0.3) (2018-09-10)



<a name="3.0.2"></a>
## [3.0.2](https://github.com/bcoe/c8/compare/v3.0.1...v3.0.2) (2018-09-10)



<a name="3.0.1"></a>
## [3.0.1](https://github.com/bcoe/c8/compare/v3.0.0...v3.0.1) (2018-09-10)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/bcoe/c8/compare/v1.0.1...v3.0.0) (2018-09-10)

### Features

* switch to using Node's built in coverage ([#22](https://github.com/bcoe/c8/issues/22)) ([3c1b92b](https://github.com/bcoe/c8/commit/3c1b92b))


### BREAKING CHANGES

* switches to using NODE_V8_COVERAGE rather than inspector directly


<a name="2.0.0"></a>
# [2.0.0](https://github.com/bcoe/c8/compare/v1.0.1...v2.0.0) (2017-12-17)


### Bug Fixes

* tweak inspector event timing ([#6](https://github.com/bcoe/c8/issues/6)) ([01f654e](https://github.com/bcoe/c8/commit/01f654e))


### Features

* first pass at functional prototype without subprocess support ([#5](https://github.com/bcoe/c8/issues/5)) ([9534f56](https://github.com/bcoe/c8/commit/9534f56))
* implement Istanbul reporting ([#8](https://github.com/bcoe/c8/issues/8)) ([8e430bf](https://github.com/bcoe/c8/commit/8e430bf))
* switch to stderr and default port ([#7](https://github.com/bcoe/c8/issues/7)) ([bb117b7](https://github.com/bcoe/c8/commit/bb117b7))


### BREAKING CHANGES

* dropped subprocess support for the time being, while we march towards an initial implementation.



<a name="1.0.1"></a>
## [1.0.1](https://github.com/bcoe/c8/compare/v1.0.0...v1.0.1) (2017-10-26)


### Bug Fixes

* pin to functional version of spawn-wrap ([d1ced8c](https://github.com/bcoe/c8/commit/d1ced8c))



<a name="1.0.0"></a>
# 1.0.0 (2017-10-26)


### Features

* playing around with initial implementation ([18f5471](https://github.com/bcoe/c8/commit/18f5471))
