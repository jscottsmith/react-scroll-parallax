/**
 * This data originates from the storiesHash state in Storybook. Grab it from the Manager node
 * using React DevTools by assigning it to a global variable, then use the following script to
 * remove the parameters, otherwise you'll end up with a huge file:
 *
 * JSON.stringify(
 *   Object.values($reactTemp1)
 *     .reduce((acc, {parameters, ...node}) => {
 *       acc[node.id] = node;
 *       return acc;
 *     }, {}), null, 2)
 */
export declare const stories: Record<string, import("@storybook/api").Root | import("@storybook/api").Group | import("@storybook/api").Story>;
