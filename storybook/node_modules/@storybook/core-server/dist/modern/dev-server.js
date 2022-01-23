function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.promise.js";
import "core-js/modules/es.symbol.description.js";
import express, { Router } from 'express';
import compression from 'compression';
import { logConfig } from '@storybook/core-common';
import { getMiddleware } from './utils/middleware';
import { getServerAddresses } from './utils/server-address';
import { getServer } from './utils/server-init';
import { useStatics } from './utils/server-statics';
import { useStoriesJson } from './utils/stories-json';
import { getServerChannel } from './utils/get-server-channel';
import { openInBrowser } from './utils/open-in-browser';
import { getPreviewBuilder } from './utils/get-preview-builder';
import { getManagerBuilder } from './utils/get-manager-builder'; // @ts-ignore

export var router = new Router();
export async function storybookDevServer(options) {
  var startTime = process.hrtime();
  var app = express();
  var server = await getServer(app, options);
  var serverChannel = getServerChannel(server);
  app.use(compression({
    level: 1
  }));

  if (typeof options.extendServer === 'function') {
    options.extendServer(server);
  }

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }); // User's own static files

  await useStatics(router, options);
  var features = await options.presets.apply('features');

  if (features !== null && features !== void 0 && features.buildStoriesJson || features !== null && features !== void 0 && features.storyStoreV7) {
    await useStoriesJson(router, serverChannel, options);
  }

  getMiddleware(options.configDir)(router);
  app.use(router);
  var port = options.port,
      host = options.host;
  var proto = options.https ? 'https' : 'http';

  var _getServerAddresses = getServerAddresses(port, host, proto),
      address = _getServerAddresses.address,
      networkAddress = _getServerAddresses.networkAddress;

  await new Promise(function (resolve, reject) {
    // FIXME: Following line doesn't match TypeScript signature at all 🤔
    // @ts-ignore
    server.listen({
      port: port,
      host: host
    }, function (error) {
      return error ? reject(error) : resolve();
    });
  });
  var previewBuilder = await getPreviewBuilder(options.configDir);
  var managerBuilder = await getManagerBuilder(options.configDir);

  if (options.debugWebpack) {
    logConfig('Preview webpack config', await previewBuilder.getConfig(options));
    logConfig('Manager webpack config', await managerBuilder.getConfig(options));
  }

  var preview = options.ignorePreview ? Promise.resolve() : previewBuilder.start({
    startTime: startTime,
    options: options,
    router: router,
    server: server
  });
  var manager = managerBuilder.start({
    startTime: startTime,
    options: options,
    router: router,
    server: server
  });

  var _await$Promise$all = await Promise.all([preview, manager // TODO #13083 Restore this when compiling the preview is fast enough
  // .then((result) => {
  //   if (!options.ci && !options.smokeTest) openInBrowser(address);
  //   return result;
  // })
  .catch(previewBuilder.bail)]),
      _await$Promise$all2 = _slicedToArray(_await$Promise$all, 2),
      previewResult = _await$Promise$all2[0],
      managerResult = _await$Promise$all2[1]; // TODO #13083 Remove this when compiling the preview is fast enough


  if (!options.ci && !options.smokeTest && options.open) {
    openInBrowser(host ? networkAddress : address);
  }

  return {
    previewResult: previewResult,
    managerResult: managerResult,
    address: address,
    networkAddress: networkAddress
  };
}