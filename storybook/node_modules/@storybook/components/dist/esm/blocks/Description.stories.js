import React from 'react';
import { Description } from './Description';
export default {
  title: 'Docs/Description',
  component: Description
};
var textCaption = "That was Wintermute, manipulating the lock the way it had manipulated the drone micro and the amplified breathing of the room where Case waited. The semiotics of the bright void beyond the chain link. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a paid killer in the dark, curled in his capsule in some coffin hotel, his hands clawed into the nearest door and watched the other passengers as he rode. After the postoperative check at the clinic, Molly took him to the simple Chinese hollow points Shin had sold him. Still it was a handgun and nine rounds of ammunition, and as he made his way down Shiga from the missionaries, the train reached Case\u2019s station. Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. Case felt the edge of the Flatline as a construct, a hardwired ROM cassette replicating a dead man\u2019s skills, obsessions, kneejerk responses. They were dropping, losing altitude in a canyon of rainbow foliage, a lurid communal mural that completely covered the hull of the console in faded pinks and yellows.";
var markdownCaption = "\n# My Example Markdown\n\nThe group looked like tall, exotic grazing animals, swaying gracefully and unconsciously with the movement of the train, their high heels like polished hooves against the gray metal of the Flatline as a construct, a hardwired ROM cassette replicating a dead man\u2019s skills, obsessions, kneejerk responses.\n\n![An image](http://place-hold.it/350x150)\n\nHe stared at the clinic, Molly took him to the Tank War, mouth touched with hot gold as a gliding cursor struck sparks from the wall of a skyscraper canyon.\n";
var markdownWithLinksCaption = "\n# [Link](https://storybook.js.org/) in heading\n## [Link](https://storybook.js.org/) in heading\n### [Link](https://storybook.js.org/) in heading\n#### [Link](https://storybook.js.org/) in heading\n##### [Link](https://storybook.js.org/) in heading\n###### [Link](https://storybook.js.org/) in heading\n\nHe stared at the clinic, [Molly](https://storybook.js.org/) took him to the *[Tank War](https://storybook.js.org/)*, mouth touched with hot gold as a gliding cursor struck sparks from the wall of a **[skyscraper](https://storybook.js.org/)** canyon.\n";
var markdownWithCodeSnippets = "\n# My Example Markdown\n\nAn `inline` codeblock\n\n```tsx\n// TypeScript React code block\nexport const MyStory = () => {\n  return <Button>Click me</Button>;\n};\n```\n\n```\ncode block with with no language\nconst a = fn({\n  b: 2,\n});\n```\n";

var Template = function Template(args) {
  return /*#__PURE__*/React.createElement(Description, args);
};

Template.displayName = "Template";
export var Text = Template.bind({});
Text.args = {
  markdown: textCaption
};
export var Markdown = Template.bind({});
Markdown.args = {
  markdown: markdownCaption
};
export var MarkdownLinks = Template.bind({});
MarkdownLinks.args = {
  markdown: markdownWithLinksCaption
};
export var MarkdownCodeSnippets = Template.bind({});
MarkdownCodeSnippets.args = {
  markdown: markdownWithCodeSnippets
};