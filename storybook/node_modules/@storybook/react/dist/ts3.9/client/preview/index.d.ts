/// <reference types="webpack-env" />
/// <reference types="node" />
import { ClientStoryApi, Loadable } from '@storybook/addons';
import './globals';
import { IStorybookSection } from './types';
import { ReactFramework } from './types-6-0';
interface ClientApi extends ClientStoryApi<ReactFramework['storyResult']> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
}
export declare const storiesOf: ClientApi['storiesOf'];
export declare const configure: ClientApi['configure'];
export declare const addDecorator: ClientApi['addDecorator'];
export declare type DecoratorFn = Parameters<typeof addDecorator>[0];
export declare const addParameters: ClientApi['addParameters'];
export declare const clearDecorators: ClientApi['clearDecorators'];
export declare const setAddon: ClientApi['setAddon'];
export declare const forceReRender: ClientApi['forceReRender'];
export declare const getStorybook: ClientApi['getStorybook'];
export declare const raw: ClientApi['raw'];
export {};
