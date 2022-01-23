import { ArgTypes, Args, StoryContext, AnyFramework } from '@storybook/csf';
/**
 * Generate a svelte template.
 *
 * @param component Component
 * @param args Args
 * @param argTypes ArgTypes
 * @param slotProperty Property used to simulate a slot
 */
export declare function generateSvelteSource(component: any, args: Args, argTypes: ArgTypes, slotProperty: string): string;
/**
 * Svelte source decorator.
 * @param storyFn Fn
 * @param context  StoryContext
 */
export declare const sourceDecorator: (storyFn: any, context: StoryContext<AnyFramework>) => any;
