"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeHeadingIds = exports.writeTranslations = exports.clear = exports.serve = exports.externalCommand = exports.deploy = exports.swizzle = exports.start = exports.build = void 0;
var build_1 = require("./commands/build");
Object.defineProperty(exports, "build", { enumerable: true, get: function () { return __importDefault(build_1).default; } });
var start_1 = require("./commands/start");
Object.defineProperty(exports, "start", { enumerable: true, get: function () { return __importDefault(start_1).default; } });
var swizzle_1 = require("./commands/swizzle");
Object.defineProperty(exports, "swizzle", { enumerable: true, get: function () { return __importDefault(swizzle_1).default; } });
var deploy_1 = require("./commands/deploy");
Object.defineProperty(exports, "deploy", { enumerable: true, get: function () { return __importDefault(deploy_1).default; } });
var external_1 = require("./commands/external");
Object.defineProperty(exports, "externalCommand", { enumerable: true, get: function () { return __importDefault(external_1).default; } });
var serve_1 = require("./commands/serve");
Object.defineProperty(exports, "serve", { enumerable: true, get: function () { return __importDefault(serve_1).default; } });
var clear_1 = require("./commands/clear");
Object.defineProperty(exports, "clear", { enumerable: true, get: function () { return __importDefault(clear_1).default; } });
var writeTranslations_1 = require("./commands/writeTranslations");
Object.defineProperty(exports, "writeTranslations", { enumerable: true, get: function () { return __importDefault(writeTranslations_1).default; } });
var writeHeadingIds_1 = require("./commands/writeHeadingIds");
Object.defineProperty(exports, "writeHeadingIds", { enumerable: true, get: function () { return __importDefault(writeHeadingIds_1).default; } });
