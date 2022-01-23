"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InspectionType = void 0;
var InspectionType;
exports.InspectionType = InspectionType;

(function (InspectionType) {
  InspectionType["IDENTIFIER"] = "Identifier";
  InspectionType["LITERAL"] = "Literal";
  InspectionType["OBJECT"] = "Object";
  InspectionType["ARRAY"] = "Array";
  InspectionType["FUNCTION"] = "Function";
  InspectionType["CLASS"] = "Class";
  InspectionType["ELEMENT"] = "Element";
  InspectionType["UNKNOWN"] = "Unknown";
})(InspectionType || (exports.InspectionType = InspectionType = {}));