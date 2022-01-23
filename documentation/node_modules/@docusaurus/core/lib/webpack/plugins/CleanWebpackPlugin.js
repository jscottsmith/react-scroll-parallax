"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const del_1 = require("del");
class CleanWebpackPlugin {
    constructor(options = {}) {
        this.verbose = options.verbose === true || false;
        this.cleanStaleWebpackAssets =
            options.cleanStaleWebpackAssets === true ||
                options.cleanStaleWebpackAssets === false
                ? options.cleanStaleWebpackAssets
                : true;
        this.protectWebpackAssets =
            options.protectWebpackAssets === true ||
                options.protectWebpackAssets === false
                ? options.protectWebpackAssets
                : true;
        this.cleanOnceBeforeBuildPatterns = Array.isArray(options.cleanOnceBeforeBuildPatterns)
            ? options.cleanOnceBeforeBuildPatterns
            : ['**/*'];
        /**
         * Store webpack build assets
         */
        this.currentAssets = [];
        /**
         * Only used with cleanOnceBeforeBuildPatterns
         */
        this.initialClean = false;
        this.outputPath = '';
        this.apply = this.apply.bind(this);
        this.handleInitial = this.handleInitial.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.removeFiles = this.removeFiles.bind(this);
    }
    apply(compiler) {
        if (!compiler.options.output || !compiler.options.output.path) {
            console.warn('clean-webpack-plugin: options.output.path not defined. Plugin disabled...');
            return;
        }
        this.outputPath = compiler.options.output.path;
        const { hooks } = compiler;
        if (this.cleanOnceBeforeBuildPatterns.length !== 0) {
            hooks.compile.tap('clean-webpack-plugin', () => {
                this.handleInitial();
            });
        }
        hooks.done.tap('clean-webpack-plugin', (stats) => {
            this.handleDone(stats);
        });
    }
    /**
     * Initially remove files from output directory prior to build.
     *
     * Only happens once.
     *
     * Warning: It is recommended to initially clean your build directory outside of webpack to minimize unexpected behavior.
     */
    handleInitial() {
        if (this.initialClean) {
            return;
        }
        this.initialClean = true;
        this.removeFiles(this.cleanOnceBeforeBuildPatterns);
    }
    handleDone(stats) {
        /**
         * Do nothing if there is a webpack error
         */
        if (stats.hasErrors()) {
            if (this.verbose) {
                console.warn('clean-webpack-plugin: pausing due to webpack errors');
            }
            return;
        }
        /**
         * Fetch Webpack's output asset files
         */
        const statsAssets = stats.toJson({
            all: false,
            assets: true,
        }).assets || [];
        const assets = statsAssets.map((asset) => asset.name);
        /**
         * Get all files that were in the previous build but not the current
         *
         * (relies on del's cwd: outputPath option)
         */
        const staleFiles = this.currentAssets.filter((previousAsset) => assets.includes(previousAsset) === false);
        /**
         * Save assets for next compilation
         */
        this.currentAssets = assets.sort();
        const removePatterns = [];
        /**
         * Remove unused webpack assets
         */
        if (this.cleanStaleWebpackAssets === true && staleFiles.length !== 0) {
            removePatterns.push(...staleFiles);
        }
        if (removePatterns.length !== 0) {
            this.removeFiles(removePatterns);
        }
    }
    removeFiles(patterns) {
        try {
            const deleted = (0, del_1.sync)(patterns, {
                force: false,
                // Change context to build directory
                cwd: this.outputPath,
                dryRun: false,
                dot: true,
                ignore: this.protectWebpackAssets ? this.currentAssets : [],
            });
            /**
             * Log if verbose is enabled
             */
            if (this.verbose) {
                deleted.forEach((file) => {
                    const filename = path_1.default.relative(process.cwd(), file);
                    /**
                     * Use console.warn over .log
                     * https://github.com/webpack/webpack/issues/1904
                     * https://github.com/johnagan/clean-webpack-plugin/issues/11
                     */
                    console.warn(`clean-webpack-plugin: removed ${filename}`);
                });
            }
        }
        catch (error) {
            const needsForce = /Cannot delete files\/folders outside the current working directory\./.test(error.message);
            if (needsForce) {
                const message = 'clean-webpack-plugin: Cannot delete files/folders outside the current working directory. Can be overridden with the "dangerouslyAllowCleanPatternsOutsideProject" option.';
                throw new Error(message);
            }
            throw error;
        }
    }
}
exports.default = CleanWebpackPlugin;
