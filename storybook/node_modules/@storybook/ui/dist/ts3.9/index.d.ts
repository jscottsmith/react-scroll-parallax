import { FunctionComponent } from 'react';
import Provider from './provider';
export interface RootProps {
    provider: Provider;
    history?: History;
}
export declare const Root: FunctionComponent<RootProps>;
declare function renderStorybookUI(domNode: HTMLElement, provider: Provider): void;
export { Provider };
export { renderStorybookUI as default };
