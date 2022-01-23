import { JSXElementConstructor } from 'react';
import { Args } from '@storybook/csf';
import type { StoryObj } from './types-6-0';
import type { ComponentStoryObj } from './types-6-3';
export type { StoryFn, StoryObj, Meta } from './types-6-0';
export type { ComponentStoryFn, ComponentStoryObj, ComponentMeta } from './types-6-3';
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export declare type Story<TArgs = Args> = StoryObj<TArgs>;
/**
 * For the common case where a (CSFv3) story is a simple component that receives args as props:
 *
 * ```tsx
 * const MyStory: ComponentStory<typeof Button> = {
 *   args: { buttonArg1: 'val' },
 * }
 * ```
 */ export declare type ComponentStory<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = ComponentStoryObj<T>;
