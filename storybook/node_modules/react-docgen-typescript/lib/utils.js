"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimFileName = void 0;
var path = require("path");
function trimFileName(fileName) {
    // We'll use the currentDirectoryName to trim parent fileNames
    var currentDirectoryPath = process.cwd();
    var currentDirectoryParts = currentDirectoryPath.split(path.sep);
    var currentDirectoryName = currentDirectoryParts[currentDirectoryParts.length - 1];
    var fileNameParts = fileName.split('/');
    var idx = fileNameParts.lastIndexOf(currentDirectoryName);
    return fileNameParts.slice(idx, fileNameParts.length).join('/');
}
exports.trimFileName = trimFileName;
//# sourceMappingURL=utils.js.map