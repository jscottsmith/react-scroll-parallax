import { InspectionType } from '../inspection';
export function getPrettyIdentifier(inferredType) {
  const {
    type,
    identifier
  } = inferredType;

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
  return hasArguments ? `${identifier}( ... )` : `${identifier}()`;
}
export function getPrettyElementIdentifier(identifier) {
  return `<${identifier} />`;
}