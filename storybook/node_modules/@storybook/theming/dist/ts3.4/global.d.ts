import { Color, Background, Typography } from './types';
declare type Value = string | number;
interface Return {
    [key: string]: {
        [key: string]: Value;
    };
}
export declare const createReset: ({ typography }: {
    typography: Typography;
}) => Return;
export declare const createGlobal: ({ color, background, typography, }: {
    color: Color;
    background: Background;
    typography: Typography;
}) => Return;
export {};
