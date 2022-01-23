import { FC, Context } from 'react';
import { StoryId } from '@storybook/api';
export declare type SourceItem = string;
export declare type StorySources = Record<StoryId, SourceItem>;
export interface SourceContextProps {
    sources: StorySources;
    setSource?: (id: StoryId, item: SourceItem) => void;
}
export declare const SourceContext: Context<SourceContextProps>;
export declare const SourceContainer: FC<{}>;
