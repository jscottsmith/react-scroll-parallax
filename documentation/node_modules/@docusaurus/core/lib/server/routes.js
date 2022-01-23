"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@docusaurus/utils");
const lodash_1 = require("lodash");
const querystring_1 = require("querystring");
function indent(str) {
    const spaces = '  ';
    return `${spaces}${str.replace(/(\n)/g, `\n${spaces}`)}`;
}
const createRouteCodeString = ({ routePath, routeHash, exact, subroutesCodeStrings, props, }) => {
    const parts = [
        `path: '${routePath}'`,
        `component: ComponentCreator('${routePath}','${routeHash}')`,
    ];
    if (exact) {
        parts.push(`exact: true`);
    }
    if (subroutesCodeStrings) {
        parts.push(`routes: [
${indent((0, utils_1.removeSuffix)(subroutesCodeStrings.join(',\n'), ',\n'))}
]`);
    }
    Object.entries(props).forEach(([propName, propValue]) => {
        // Figure out how to "unquote" JS attributes that don't need to be quoted
        // Is this lib reliable? https://github.com/armanozak/should-quote
        const shouldQuote = true; // TODO
        const key = shouldQuote ? `'${propName}'` : propName;
        parts.push(`${key}: ${JSON.stringify(propValue)}`);
    });
    return `{
${indent(parts.join(',\n'))}
}`;
};
const NotFoundRouteCode = `{
  path: '*',
  component: ComponentCreator('*')
}`;
const RoutesImportsCode = [
    `import React from 'react';`,
    `import ComponentCreator from '@docusaurus/ComponentCreator';`,
].join('\n');
function isModule(value) {
    if ((0, lodash_1.isString)(value)) {
        return true;
    }
    if ((0, lodash_1.isPlainObject)(value) && (0, lodash_1.has)(value, '__import') && (0, lodash_1.has)(value, 'path')) {
        return true;
    }
    return false;
}
function getModulePath(target) {
    if (typeof target === 'string') {
        return target;
    }
    const queryStr = target.query ? `?${(0, querystring_1.stringify)(target.query)}` : '';
    return `${target.path}${queryStr}`;
}
async function loadRoutes(pluginsRouteConfigs, baseUrl) {
    const registry = {};
    const routesPaths = [(0, utils_1.normalizeUrl)([baseUrl, '404.html'])];
    const routesChunkNames = {};
    // This is the higher level overview of route code generation.
    function generateRouteCode(routeConfig) {
        const { path: routePath, component, modules = {}, routes: subroutes, exact, priority, ...props } = routeConfig;
        if (!(0, lodash_1.isString)(routePath) || !component) {
            throw new Error(`Invalid route config: path must be a string and component is required.\n${JSON.stringify(routeConfig)}`);
        }
        // Collect all page paths for injecting it later in the plugin lifecycle
        // This is useful for plugins like sitemaps, redirects etc...
        // If a route has subroutes, it is not necessarily a valid page path (more likely to be a wrapper)
        if (!subroutes) {
            routesPaths.push(routePath);
        }
        // We hash the route to generate the key, because 2 routes can conflict with
        // each others if they have the same path, ex: parent=/docs, child=/docs
        // see https://github.com/facebook/docusaurus/issues/2917
        const routeHash = (0, utils_1.simpleHash)(JSON.stringify(routeConfig), 3);
        const chunkNamesKey = `${routePath}-${routeHash}`;
        routesChunkNames[chunkNamesKey] = {
            ...genRouteChunkNames(registry, { component }, 'component', component),
            ...genRouteChunkNames(registry, modules, 'module', routePath),
        };
        return createRouteCodeString({
            routePath: routeConfig.path.replace(/'/g, "\\'"),
            routeHash,
            exact,
            subroutesCodeStrings: subroutes === null || subroutes === void 0 ? void 0 : subroutes.map(generateRouteCode),
            props,
        });
    }
    const routesConfig = `
${RoutesImportsCode}

export default [
${indent(`${pluginsRouteConfigs.map(generateRouteCode).join(',\n')},`)}
${indent(NotFoundRouteCode)}
];
`;
    return {
        registry,
        routesConfig,
        routesChunkNames,
        routesPaths,
    };
}
exports.default = loadRoutes;
function genRouteChunkNames(
// TODO instead of passing a mutating the registry, return a registry slice?
registry, value, prefix, name) {
    if (!value) {
        return null;
    }
    if (Array.isArray(value)) {
        return value.map((val, index) => genRouteChunkNames(registry, val, `${index}`, name));
    }
    if (isModule(value)) {
        const modulePath = getModulePath(value);
        const chunkName = (0, utils_1.genChunkName)(modulePath, prefix, name);
        // We need to JSON.stringify so that if its on windows, backslashes are escaped.
        const loader = `() => import(/* webpackChunkName: '${chunkName}' */ ${JSON.stringify(modulePath)})`;
        registry[chunkName] = {
            loader,
            modulePath,
        };
        return chunkName;
    }
    const newValue = {};
    Object.keys(value).forEach((key) => {
        newValue[key] = genRouteChunkNames(registry, value[key], key, name);
    });
    return newValue;
}
