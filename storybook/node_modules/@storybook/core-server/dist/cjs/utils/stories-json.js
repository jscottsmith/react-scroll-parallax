"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractStoriesJson = extractStoriesJson;
exports.useStoriesJson = useStoriesJson;
exports.DEBOUNCE = void 0;

require("core-js/modules/es.promise.js");

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _coreCommon = require("@storybook/core-common");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _StoryIndexGenerator = require("./StoryIndexGenerator");

var _watchStorySpecifiers = require("./watch-story-specifiers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEBOUNCE = 100;
exports.DEBOUNCE = DEBOUNCE;

async function extractStoriesJson(outputFile, normalizedStories, options) {
  var generator = new _StoryIndexGenerator.StoryIndexGenerator(normalizedStories, options);
  await generator.initialize();
  var index = await generator.getIndex();
  await _fsExtra.default.writeJson(outputFile, index);
}

async function useStoriesJson(router, serverChannel, options, workingDir = process.cwd()) {
  var normalizedStories = (0, _coreCommon.normalizeStories)(await options.presets.apply('stories'), {
    configDir: options.configDir,
    workingDir: workingDir
  });
  var features = await options.presets.apply('features');
  var generator = new _StoryIndexGenerator.StoryIndexGenerator(normalizedStories, {
    configDir: options.configDir,
    workingDir: workingDir,
    storiesV2Compatibility: !(features !== null && features !== void 0 && features.breakingChangesV7) && !(features !== null && features !== void 0 && features.storyStoreV7),
    storyStoreV7: features === null || features === void 0 ? void 0 : features.storyStoreV7
  }); // Wait until someone actually requests `stories.json` before we start generating/watching.
  // This is mainly for testing purposes.

  var started = false;
  var maybeInvalidate = (0, _debounce.default)(function () {
    return serverChannel.emit(_coreEvents.default.STORY_INDEX_INVALIDATED);
  }, DEBOUNCE, {
    leading: true
  });

  async function ensureStarted() {
    if (started) return;
    started = true;
    (0, _watchStorySpecifiers.watchStorySpecifiers)(normalizedStories, {
      workingDir: workingDir
    }, function (specifier, path, removed) {
      generator.invalidate(specifier, path, removed);
      maybeInvalidate();
    });
    await generator.initialize();
  }

  router.use('/stories.json', async function (req, res) {
    await ensureStarted();

    try {
      var index = await generator.getIndex();
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(index));
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  });
}