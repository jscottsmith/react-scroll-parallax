import { FunctionComponent } from 'react';
export declare const AuthBlock: FunctionComponent<{
    loginUrl: string;
    id: string;
}>;
export declare const ErrorBlock: FunctionComponent<{
    error: Error;
}>;
export declare const EmptyBlock: FunctionComponent<any>;
export declare const LoaderBlock: FunctionComponent<{
    isMain: boolean;
}>;
