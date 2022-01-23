import { InspectionType } from '../inspection';
export function getPrettyIdentifier(inferredType) {
  var type = inferredType.type,
      identifier = inferredType.identifier;

  switch (type) {
    case InspectionType.FUNCTION:
      return getPrettyFuncIdentifier(identifier, inferredType.hasParams);

    case InspectionType.ELEMENT:
      return getPrettyElementIdentifier(identifier);

    default:
      return identifier;
  }
}
export function getPrettyFuncIdentifier(identifier, hasArguments) {
  return hasArguments ? "".concat(identifier, "( ... )") : "".concat(identifier, "()");
}
export function getPrettyElementIdentifier(identifier) {
  return "<".concat(identifier, " />");
}