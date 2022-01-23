export function extractComponentDescription(component) {
  if (!component) {
    return null;
  }

  const {
    __docgen = {}
  } = component;
  return __docgen.description;
}