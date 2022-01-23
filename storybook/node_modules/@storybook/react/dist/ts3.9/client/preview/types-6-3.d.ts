import { ComponentProps, JSXElementConstructor } from 'react';
import type { StoryFn, StoryObj, Story, Meta } from './types-6-0';
export * from './types-6-0';
/**
 * For the common case where a component's stories are simple components that receives args as props:
 *
 * ```tsx
 * export default { ... } as ComponentMeta<typeof Button>;
 * ```
 */
export declare type ComponentMeta<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Meta<ComponentProps<T>>;
/**
 * For the common case where a (CSFv2) story is a simple component that receives args as props:
 *
 * ```tsx
 * const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />
 * ```
 */
export declare type ComponentStoryFn<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = StoryFn<ComponentProps<T>>;
/**
 * For the common case where a (CSFv3) story is a simple component that receives args as props:
 *
 * ```tsx
 * const MyStory: ComponentStory<typeof Button> = {
 *   args: { buttonArg1: 'val' },
 * }
 * ```
 */
export declare type ComponentStoryObj<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = StoryObj<ComponentProps<T>>;
/**
 * For the common case where a (CSFv2) story is a simple component that receives args as props:
 *
 * ```tsx
 * const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />
 * ```
 *
 * NOTE: this is an alias for `ComponentStoryFn`.
 * In Storybook v7, `ComponentStory` will alias `ComponentStoryObj`
 */
export declare type ComponentStory<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Story<ComponentProps<T>>;
