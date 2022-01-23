import { StoryId, StoryName, AnyFramework, ProjectAnnotations, StoryContextForLoaders, ComponentTitle, Args, Globals } from '@storybook/csf';
import { RenderContext, Story } from '@storybook/store';
import { PreviewWeb } from './PreviewWeb';
export declare type WebProjectAnnotations<TFramework extends AnyFramework> = ProjectAnnotations<TFramework> & {
    renderToDOM?: (context: RenderContext<TFramework>, element: Element) => Promise<void> | void;
};
export interface DocsContextProps<TFramework extends AnyFramework = AnyFramework> {
    id: StoryId;
    title: ComponentTitle;
    name: StoryName;
    storyById: (id: StoryId) => Story<TFramework>;
    componentStories: () => Story<TFramework>[];
    loadStory: (id: StoryId) => Promise<Story<TFramework>>;
    renderStoryToElement: PreviewWeb<TFramework>['renderStoryToElement'];
    getStoryContext: (story: Story<TFramework>) => StoryContextForLoaders<TFramework>;
    /**
     * mdxStoryNameToKey is an MDX-compiler-generated mapping of an MDX story's
     * display name to its story key for ID generation. It's used internally by the `<Story>`
     * and `Preview` doc blocks.
     */
    mdxStoryNameToKey?: Record<string, string>;
    mdxComponentAnnotations?: any;
    /** @deprecated */
    kind?: ComponentTitle;
    /** @deprecated */
    story?: StoryName;
    /** @deprecated */
    args?: Args;
    /** @deprecated */
    globals?: Globals;
    /** @deprecated */
    parameters?: Globals;
}
