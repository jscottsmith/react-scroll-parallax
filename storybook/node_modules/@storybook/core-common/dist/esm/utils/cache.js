import Cache from 'file-system-cache';
import { resolvePathInStorybookCache } from './resolve-path-in-sb-cache';
export var cache = Cache({
  basePath: resolvePathInStorybookCache('dev-server'),
  ns: 'storybook' // Optional. A grouping namespace for items.

});