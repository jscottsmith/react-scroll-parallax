"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var utils_1 = require("../utils");
describe('utils', function () {
    it('should trim file name for simple path', function () {
        var input = '/home/user/projects/react-docgen-typescript/src/__tests__/data/ExportsPropTypeImport.tsx';
        chai_1.assert.equal((0, utils_1.trimFileName)(input), 'react-docgen-typescript/src/__tests__/data/ExportsPropTypeImport.tsx');
    });
    it('should trim file name for complex path', function () {
        var input = '/home/user/projects/react-docgen-typescript/react-docgen-typescript/src/__tests__/data/ExportsPropTypeImport.tsx';
        chai_1.assert.equal((0, utils_1.trimFileName)(input), 'react-docgen-typescript/src/__tests__/data/ExportsPropTypeImport.tsx');
    });
});
//# sourceMappingURL=utils.js.map