import { sourceDecorator } from './sourceDecorator';
import { prepareForInline } from './prepareForInline';
import { SourceType } from '../../shared';
export declare const decorators: (typeof sourceDecorator)[];
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: typeof prepareForInline;
        source: {
            type: SourceType;
            language: string;
        };
    };
};
