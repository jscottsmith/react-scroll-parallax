"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBrokenLinks = exports.filterExistingFileLinks = exports.getBrokenLinksErrorMessage = exports.getAllBrokenLinks = void 0;
const tslib_1 = require("tslib");
const react_router_config_1 = require("react-router-config");
const resolve_pathname_1 = (0, tslib_1.__importDefault)(require("resolve-pathname"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const lodash_1 = require("lodash");
const utils_1 = require("@docusaurus/utils");
const utils_2 = require("./utils");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
function toReactRouterRoutes(routes) {
    // @ts-expect-error: types incompatible???
    return routes;
}
// matchRoutes does not support qs/anchors, so we remove it!
function onlyPathname(link) {
    return link.split('#')[0].split('?')[0];
}
function getPageBrokenLinks({ pagePath, pageLinks, routes, }) {
    // ReactRouter is able to support links like ./../somePath
    // but matchRoutes does not do this resolving internally
    // we must resolve the links before using matchRoutes
    // resolvePathname is used internally by ReactRouter
    function resolveLink(link) {
        const resolvedLink = (0, resolve_pathname_1.default)(onlyPathname(link), pagePath);
        return { link, resolvedLink };
    }
    function isBrokenLink(link) {
        const matchedRoutes = [link, decodeURI(link)]
            .map((l) => (0, react_router_config_1.matchRoutes)(toReactRouterRoutes(routes), l))
            .reduce((prev, cur) => prev.concat(cur));
        return matchedRoutes.length === 0;
    }
    return pageLinks.map(resolveLink).filter((l) => isBrokenLink(l.resolvedLink));
}
// The route defs can be recursive, and have a parent match-all route
// We don't want to match broken links like /docs/brokenLink against /docs/*
// For this reason, we only consider the "final routes", that do not have subroutes
// We also need to remove the match all 404 route
function filterIntermediateRoutes(routesInput) {
    const routesWithout404 = routesInput.filter((route) => route.path !== '*');
    return (0, utils_2.getAllFinalRoutes)(routesWithout404);
}
function getAllBrokenLinks({ allCollectedLinks, routes, }) {
    const filteredRoutes = filterIntermediateRoutes(routes);
    const allBrokenLinks = (0, lodash_1.mapValues)(allCollectedLinks, (pageLinks, pagePath) => getPageBrokenLinks({ pageLinks, pagePath, routes: filteredRoutes }));
    // remove pages without any broken link
    return (0, lodash_1.pickBy)(allBrokenLinks, (brokenLinks) => brokenLinks.length > 0);
}
exports.getAllBrokenLinks = getAllBrokenLinks;
function getBrokenLinksErrorMessage(allBrokenLinks) {
    if (Object.keys(allBrokenLinks).length === 0) {
        return undefined;
    }
    function brokenLinkMessage(brokenLink) {
        const showResolvedLink = brokenLink.link !== brokenLink.resolvedLink;
        return `${brokenLink.link}${showResolvedLink ? ` (resolved as: ${brokenLink.resolvedLink})` : ''}`;
    }
    function pageBrokenLinksMessage(pagePath, brokenLinks) {
        return `\n- On source page path = ${pagePath}:\n   -> linking to ${brokenLinks
            .map(brokenLinkMessage)
            .join('\n   -> linking to ')}`;
    }
    // If there's a broken link appearing very often, it is probably a broken link on the layout!
    // Add an additional message in such case to help user figure this out.
    // see https://github.com/facebook/docusaurus/issues/3567#issuecomment-706973805
    function getLayoutBrokenLinksHelpMessage() {
        const flatList = Object.entries(allBrokenLinks).flatMap(([pagePage, brokenLinks]) => brokenLinks.map((brokenLink) => ({ pagePage, brokenLink })));
        const countedBrokenLinks = (0, lodash_1.countBy)(flatList, (item) => item.brokenLink.link);
        const FrequencyThreshold = 5; // Is this a good value?
        const frequentLinks = Object.entries(countedBrokenLinks)
            .filter(([, count]) => count >= FrequencyThreshold)
            .map(([link]) => link);
        if (frequentLinks.length === 0) {
            return '';
        }
        return `\n\nIt looks like some of the broken links we found appear in many pages of your site.\nMaybe those broken links appear on all pages through your site layout?\nWe recommend that you check your theme configuration for such links (particularly, theme navbar and footer).\nFrequent broken links are linking to:\n- ${frequentLinks.join(`\n- `)}\n`;
    }
    return (`Docusaurus found broken links!\n\nPlease check the pages of your site in the list below, and make sure you don't reference any path that does not exist.\nNote: it's possible to ignore broken links with the 'onBrokenLinks' Docusaurus configuration, and let the build pass.${getLayoutBrokenLinksHelpMessage()}` +
        `\n\nExhaustive list of all broken links found:\n${Object.entries(allBrokenLinks)
            .map(([pagePath, brokenLinks]) => pageBrokenLinksMessage(pagePath, brokenLinks))
            .join('\n')}
`);
}
exports.getBrokenLinksErrorMessage = getBrokenLinksErrorMessage;
function isExistingFile(filePath) {
    try {
        return fs_extra_1.default.statSync(filePath).isFile();
    }
    catch (e) {
        return false;
    }
}
// If a file actually exist on the file system, we know the link is valid
// even if docusaurus does not know about this file, so we don't report it
async function filterExistingFileLinks({ baseUrl, outDir, allCollectedLinks, }) {
    // not easy to make this async :'(
    function linkFileExists(link) {
        // /baseUrl/javadoc/ -> /outDir/javadoc
        const baseFilePath = (0, utils_1.removeSuffix)(`${outDir}/${(0, utils_1.removePrefix)(link, baseUrl)}`, '/');
        // -> /outDir/javadoc
        // -> /outDir/javadoc.html
        // -> /outDir/javadoc/index.html
        const filePathsToTry = [baseFilePath];
        if (!path_1.default.extname(baseFilePath)) {
            filePathsToTry.push(`${baseFilePath}.html`);
            filePathsToTry.push(path_1.default.join(baseFilePath, 'index.html'));
        }
        return filePathsToTry.some(isExistingFile);
    }
    return (0, lodash_1.mapValues)(allCollectedLinks, (links) => links.filter((link) => !linkFileExists(link)));
}
exports.filterExistingFileLinks = filterExistingFileLinks;
async function handleBrokenLinks({ allCollectedLinks, onBrokenLinks, routes, baseUrl, outDir, }) {
    if (onBrokenLinks === 'ignore') {
        return;
    }
    // If we link to a file like /myFile.zip, and the file actually exist for the file system
    // it is not a broken link, it may simply be a link to an existing static file...
    const allCollectedLinksFiltered = await filterExistingFileLinks({
        allCollectedLinks,
        baseUrl,
        outDir,
    });
    const allBrokenLinks = getAllBrokenLinks({
        allCollectedLinks: allCollectedLinksFiltered,
        routes,
    });
    const errorMessage = getBrokenLinksErrorMessage(allBrokenLinks);
    if (errorMessage) {
        (0, utils_1.reportMessage)(errorMessage, onBrokenLinks);
    }
}
exports.handleBrokenLinks = handleBrokenLinks;
