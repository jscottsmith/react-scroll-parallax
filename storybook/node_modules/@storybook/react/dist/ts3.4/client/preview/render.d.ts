import { RenderContext } from '@storybook/store';
import { ArgsStoryFn } from '@storybook/csf';
import { ReactFramework } from './types-6-0';
export declare const render: ArgsStoryFn<ReactFramework>;
export declare function renderToDOM({ storyContext, unboundStoryFn, showMain, showException, forceRemount, }: RenderContext<ReactFramework>, domElement: HTMLElement): Promise<void>;
