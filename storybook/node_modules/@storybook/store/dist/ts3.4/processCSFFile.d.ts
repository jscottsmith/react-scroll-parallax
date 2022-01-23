import { AnyFramework, ComponentTitle } from '@storybook/csf';
import { ModuleExports, CSFFile } from './types';
import { Path } from '.';
export declare function processCSFFile<TFramework extends AnyFramework>(moduleExports: ModuleExports, importPath: Path, title: ComponentTitle): CSFFile<TFramework>;
