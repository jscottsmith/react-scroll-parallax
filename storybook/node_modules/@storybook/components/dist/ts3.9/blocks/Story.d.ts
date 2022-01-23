import { ElementType, FunctionComponent } from 'react';
import type { Parameters } from '@storybook/api';
export declare enum StoryError {
    NO_STORY = "No component or story to display"
}
interface CommonProps {
    title?: string;
    height?: string;
    id: string;
}
interface InlineStoryProps extends CommonProps {
    parameters: Parameters;
    storyFn: ElementType;
}
declare type IFrameStoryProps = CommonProps;
declare type StoryProps = InlineStoryProps | IFrameStoryProps;
/**
 * A story element, either rendered inline or in an iframe,
 * with configurable height.
 */
declare const Story: FunctionComponent<StoryProps & {
    inline?: boolean;
    error?: StoryError;
}>;
declare const StorySkeleton: () => JSX.Element;
export { Story, StorySkeleton };
