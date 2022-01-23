import { StoryContext } from '@storybook/csf';
import { VueFramework } from '@storybook/vue';
export declare const skipSourceRender: (context: StoryContext<VueFramework>) => any;
export declare const sourceDecorator: (storyFn: any, context: StoryContext<VueFramework>) => any;
export declare function vnodeToString(vnode: Vue.VNode): string;
