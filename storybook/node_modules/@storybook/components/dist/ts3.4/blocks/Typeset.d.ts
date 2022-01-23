import { FunctionComponent } from 'react';
export interface TypesetProps {
    fontFamily?: string;
    fontSizes: string[];
    fontWeight?: number;
    sampleText?: string;
}
/**
 * Convenient styleguide documentation showing examples of type
 * with different sizes and weights and configurable sample text.
 */
export declare const Typeset: FunctionComponent<TypesetProps>;
