export var InspectionType;

(function (InspectionType) {
  InspectionType["IDENTIFIER"] = "Identifier";
  InspectionType["LITERAL"] = "Literal";
  InspectionType["OBJECT"] = "Object";
  InspectionType["ARRAY"] = "Array";
  InspectionType["FUNCTION"] = "Function";
  InspectionType["CLASS"] = "Class";
  InspectionType["ELEMENT"] = "Element";
  InspectionType["UNKNOWN"] = "Unknown";
})(InspectionType || (InspectionType = {}));