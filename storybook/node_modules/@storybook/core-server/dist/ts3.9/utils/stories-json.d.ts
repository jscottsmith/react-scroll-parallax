import { Router } from 'express';
import { Options, NormalizedStoriesSpecifier } from '@storybook/core-common';
import { ServerChannel } from './get-server-channel';
export declare const DEBOUNCE = 100;
export declare function extractStoriesJson(outputFile: string, normalizedStories: NormalizedStoriesSpecifier[], options: {
    configDir: string;
    workingDir: string;
    storiesV2Compatibility: boolean;
    storyStoreV7: boolean;
}): Promise<void>;
export declare function useStoriesJson(router: Router, serverChannel: ServerChannel, options: Options, workingDir?: string): Promise<void>;
