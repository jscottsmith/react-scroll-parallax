import "core-js/modules/es.array.reduce.js";
import { combineParameters } from '@storybook/store';

function getField(moduleExportList, field) {
  return moduleExportList.map(xs => xs[field]).filter(Boolean);
}

function getArrayField(moduleExportList, field) {
  return getField(moduleExportList, field).reduce((a, b) => [...a, ...b], []);
}

function getObjectField(moduleExportList, field) {
  return Object.assign({}, ...getField(moduleExportList, field));
}

function getSingletonField(moduleExportList, field) {
  return getField(moduleExportList, field)[0];
}

export function composeConfigs(moduleExportList) {
  const allArgTypeEnhancers = getArrayField(moduleExportList, 'argTypesEnhancers');
  return {
    parameters: combineParameters(...getField(moduleExportList, 'parameters')),
    decorators: getArrayField(moduleExportList, 'decorators'),
    args: getObjectField(moduleExportList, 'args'),
    argsEnhancers: getArrayField(moduleExportList, 'argsEnhancers'),
    argTypes: getObjectField(moduleExportList, 'argTypes'),
    argTypesEnhancers: [...allArgTypeEnhancers.filter(e => !e.secondPass), ...allArgTypeEnhancers.filter(e => e.secondPass)],
    globals: getObjectField(moduleExportList, 'globals'),
    globalTypes: getObjectField(moduleExportList, 'globalTypes'),
    loaders: getArrayField(moduleExportList, 'loaders'),
    render: getSingletonField(moduleExportList, 'render'),
    play: getSingletonField(moduleExportList, 'play'),
    renderToDOM: getSingletonField(moduleExportList, 'renderToDOM'),
    applyDecorators: getSingletonField(moduleExportList, 'applyDecorators')
  };
}