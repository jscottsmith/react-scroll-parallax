import "core-js/modules/es.array.join.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.to-string.js";
import { checkAddonOrder } from '@storybook/core-common';
import path from 'path';
export var checkDocsLoaded = function checkDocsLoaded(configDir) {
  checkAddonOrder({
    before: {
      name: '@storybook/addon-docs',
      inEssentials: true
    },
    after: {
      name: '@storybook/addon-controls',
      inEssentials: true
    },
    configFile: path.isAbsolute(configDir) ? path.join(configDir, 'main') : path.join(process.cwd(), configDir, 'main'),
    getConfig: function getConfig(configFile) {
      return import(configFile);
    }
  });
};