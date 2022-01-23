import { AnyFramework } from '@storybook/csf';
import { ModuleExports } from '@storybook/store';
import { WebProjectAnnotations } from './types';
export declare function composeConfigs<TFramework extends AnyFramework>(moduleExportList: ModuleExports[]): WebProjectAnnotations<TFramework>;
