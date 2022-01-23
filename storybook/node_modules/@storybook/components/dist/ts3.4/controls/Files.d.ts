import { FunctionComponent } from 'react';
import { ControlProps } from './types';
export interface FilesControlProps extends ControlProps<string[]> {
    accept?: string;
}
export declare const FilesControl: FunctionComponent<FilesControlProps>;
