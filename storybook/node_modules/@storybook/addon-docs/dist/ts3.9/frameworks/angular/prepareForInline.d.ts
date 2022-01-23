import React from 'react';
import { AngularFramework, StoryContext } from '@storybook/angular';
import { PartialStoryFn } from '@storybook/csf';
/**
 * Uses the angular renderer to generate a story. Uses p-limit to run synchronously
 */
export declare const prepareForInline: (storyFn: PartialStoryFn<AngularFramework>, { id, parameters, component }: StoryContext) => React.DetailedReactHTMLElement<React.HTMLAttributes<undefined>, undefined>;
