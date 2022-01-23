"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateObject = generateObject;

var _captions = require("../captions");

var _lib = require("../../../../lib");

var _generateCode = require("../generateCode");

function generateObject(_ref) {
  var inferredType = _ref.inferredType,
      ast = _ref.ast;
  var _ref2 = inferredType,
      depth = _ref2.depth;

  if (depth === 1) {
    var compactObject = (0, _generateCode.generateObjectCode)(ast, true);

    if (!(0, _lib.isTooLongForDefaultValueSummary)(compactObject)) {
      return (0, _lib.createSummaryValue)(compactObject);
    }
  }

  return (0, _lib.createSummaryValue)(_captions.OBJECT_CAPTION, (0, _generateCode.generateObjectCode)(ast));
}