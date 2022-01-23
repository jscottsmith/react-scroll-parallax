"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = (0, tslib_1.__importDefault)(require("http"));
const serve_handler_1 = (0, tslib_1.__importDefault)(require("serve-handler"));
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const server_1 = require("../server");
const build_1 = (0, tslib_1.__importDefault)(require("./build"));
const commandUtils_1 = require("./commandUtils");
async function serve(siteDir, cliOptions) {
    let dir = path_1.default.isAbsolute(cliOptions.dir)
        ? cliOptions.dir
        : path_1.default.join(siteDir, cliOptions.dir);
    if (cliOptions.build) {
        dir = await (0, build_1.default)(siteDir, {
            config: cliOptions.config,
            outDir: dir,
        }, false);
    }
    const host = (0, commandUtils_1.getCLIOptionHost)(cliOptions.host);
    const port = await (0, commandUtils_1.getCLIOptionPort)(cliOptions.port, host);
    if (port === null) {
        process.exit();
    }
    const { siteConfig: { baseUrl, trailingSlash }, } = await (0, server_1.loadSiteConfig)({
        siteDir,
        customConfigFilePath: cliOptions.config,
    });
    const servingUrl = `http://${host}:${port}`;
    const server = http_1.default.createServer((req, res) => {
        var _a, _b;
        // Automatically redirect requests to /baseUrl/
        if (!((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith(baseUrl))) {
            res.writeHead(302, {
                Location: baseUrl,
            });
            res.end();
            return;
        }
        // Remove baseUrl before calling serveHandler
        // Reason: /baseUrl/ should serve /build/index.html, not /build/baseUrl/index.html (does not exist)
        req.url = (_b = req.url) === null || _b === void 0 ? void 0 : _b.replace(baseUrl, '/');
        (0, serve_handler_1.default)(req, res, {
            cleanUrls: true,
            public: dir,
            trailingSlash,
        });
    });
    logger_1.default.success `Serving path=${cliOptions.dir} directory at path=${servingUrl + baseUrl}.`;
    server.listen(port);
}
exports.default = serve;
