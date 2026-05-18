import type { ReactElement } from 'react';
import type { CSSEffect } from 'parallax-controller';

export type StoryArgs = Record<string, unknown>;

export type StoryFn<TArgs = StoryArgs> = (args: TArgs) => ReactElement;

export type Story<TArgs = StoryArgs> = StoryFn<TArgs> & {
  args?: Partial<TArgs>;
  argTypes?: Record<string, unknown>;
};

export function bindStory<TArgs>(
  template: StoryFn<TArgs>,
  config?: { args?: Partial<TArgs>; argTypes?: Record<string, unknown> }
): Story<TArgs> {
  return Object.assign(template.bind({}), config) as Story<TArgs>;
}

export function createStory<TArgs>(
  render: StoryFn<TArgs>,
  config?: { args?: Partial<TArgs>; argTypes?: Record<string, unknown> }
): Story<TArgs> {
  return Object.assign(render, config) as Story<TArgs>;
}

/** Parse a comma-separated pair into a CSS effect tuple for Storybook controls. */
export function splitEffect(value: string): CSSEffect {
  const [start, end] = value.split(',');
  return [start, end];
}
