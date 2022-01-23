import "core-js/modules/es.promise.js";
import fs from 'fs-extra';
import { normalizeStories } from '@storybook/core-common';
import Events from '@storybook/core-events';
import debounce from 'lodash/debounce';
import { StoryIndexGenerator } from './StoryIndexGenerator';
import { watchStorySpecifiers } from './watch-story-specifiers';
export var DEBOUNCE = 100;
export async function extractStoriesJson(outputFile, normalizedStories, options) {
  var generator = new StoryIndexGenerator(normalizedStories, options);
  await generator.initialize();
  var index = await generator.getIndex();
  await fs.writeJson(outputFile, index);
}
export async function useStoriesJson(router, serverChannel, options, workingDir = process.cwd()) {
  var normalizedStories = normalizeStories(await options.presets.apply('stories'), {
    configDir: options.configDir,
    workingDir: workingDir
  });
  var features = await options.presets.apply('features');
  var generator = new StoryIndexGenerator(normalizedStories, {
    configDir: options.configDir,
    workingDir: workingDir,
    storiesV2Compatibility: !(features !== null && features !== void 0 && features.breakingChangesV7) && !(features !== null && features !== void 0 && features.storyStoreV7),
    storyStoreV7: features === null || features === void 0 ? void 0 : features.storyStoreV7
  }); // Wait until someone actually requests `stories.json` before we start generating/watching.
  // This is mainly for testing purposes.

  var started = false;
  var maybeInvalidate = debounce(function () {
    return serverChannel.emit(Events.STORY_INDEX_INVALIDATED);
  }, DEBOUNCE, {
    leading: true
  });

  async function ensureStarted() {
    if (started) return;
    started = true;
    watchStorySpecifiers(normalizedStories, {
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