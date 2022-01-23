import React from 'react';
import { ControlProps, ObjectValue, ObjectConfig } from './types';
export declare type ObjectProps = ControlProps<ObjectValue> & ObjectConfig & {
    theme: any;
};
export declare const ObjectControl: React.FC<ObjectProps>;
