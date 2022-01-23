import React from 'react';
import { Description } from './Description';
export default {
  title: 'Docs/Description',
  component: Description
};
const textCaption = `That was Wintermute, manipulating the lock the way it had manipulated the drone micro and the amplified breathing of the room where Case waited. The semiotics of the bright void beyond the chain link. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a paid killer in the dark, curled in his capsule in some coffin hotel, his hands clawed into the nearest door and watched the other passengers as he rode. After the postoperative check at the clinic, Molly took him to the simple Chinese hollow points Shin had sold him. Still it was a handgun and nine rounds of ammunition, and as he made his way down Shiga from the missionaries, the train reached Case’s station. Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. Case felt the edge of the Flatline as a construct, a hardwired ROM cassette replicating a dead man’s skills, obsessions, kneejerk responses. They were dropping, losing altitude in a canyon of rainbow foliage, a lurid communal mural that completely covered the hull of the console in faded pinks and yellows.`;
const markdownCaption = `
# My Example Markdown

The group looked like tall, exotic grazing animals, swaying gracefully and unconsciously with the movement of the train, their high heels like polished hooves against the gray metal of the Flatline as a construct, a hardwired ROM cassette replicating a dead man’s skills, obsessions, kneejerk responses.

![An image](http://place-hold.it/350x150)

He stared at the clinic, Molly took him to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the wall of a skyscraper canyon.
`;
const markdownWithLinksCaption = `
# [Link](https://storybook.js.org/) in heading
## [Link](https://storybook.js.org/) in heading
### [Link](https://storybook.js.org/) in heading
#### [Link](https://storybook.js.org/) in heading
##### [Link](https://storybook.js.org/) in heading
###### [Link](https://storybook.js.org/) in heading

He stared at the clinic, [Molly](https://storybook.js.org/) took him to the *[Tank War](https://storybook.js.org/)*, mouth touched with hot gold as a gliding cursor struck sparks from the wall of a **[skyscraper](https://storybook.js.org/)** canyon.
`;
const markdownWithCodeSnippets = `
# My Example Markdown

An \`inline\` codeblock

\`\`\`tsx
// TypeScript React code block
export const MyStory = () => {
  return <Button>Click me</Button>;
};
\`\`\`

\`\`\`
code block with with no language
const a = fn({
  b: 2,
});
\`\`\`
`;

const Template = args => /*#__PURE__*/React.createElement(Description, args);

Template.displayName = "Template";
export const Text = Template.bind({});
Text.args = {
  markdown: textCaption
};
export const Markdown = Template.bind({});
Markdown.args = {
  markdown: markdownCaption
};
export const MarkdownLinks = Template.bind({});
MarkdownLinks.args = {
  markdown: markdownWithLinksCaption
};
export const MarkdownCodeSnippets = Template.bind({});
MarkdownCodeSnippets.args = {
  markdown: markdownWithCodeSnippets
};