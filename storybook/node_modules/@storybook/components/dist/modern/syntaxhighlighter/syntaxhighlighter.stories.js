import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider, themes, ensure } from '@storybook/theming';
import { SyntaxHighlighter } from './lazy-syntaxhighlighter';
storiesOf('Basics/SyntaxHighlighter', module).add('bash', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "bash",
  copyable: false
}, "npx npm-check-updates '/storybook/' -u && npm install")).add('css', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "css",
  copyable: false
}, `
        .className {
          border: 1px solid hotpink;
        }
      `)).add('json', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "json",
  copyable: false
}, `
      {
        "number": 1,
        "string": "something",
        "object": {
          "property": "value",
        },
        array: [1,2,3],
      }
      `)).add('markdown', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "markdown",
  copyable: false
}, `
      # a big header

      some code:

      ~~~js
      const name = "a string";
      ~~~

      > crazy

      `)).add('yaml', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "yaml",
  copyable: false
}, `
        product:
        - sku         : BL394D
          quantity    : 4
          description : Basketball
          price       : 450.00
      `)).add('jsx', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "jsx",
  copyable: false
}, `import { Good, Things } from 'life';

        const result = () => <Good><Things all={true} /></Good>;

        export { result as default };
      `)).add('js', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "jsx",
  copyable: false
}, `import React, { createElement } from 'react';
        import { Good, Things } from 'life';

        const result = () => createElement(Good, [createElement(Things, [], { all: true }), []);

        console.log(result);

        export { result as default };
      `)).add('graphql', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "graphql",
  copyable: false
}, `query HeroNameAndFriends($episode: Episode) {
          hero(episode: $episode) {
            name
            friends {
              name
            }
          }
        }
      `)).add('unsupported', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "C#",
  bordered: true,
  copyable: true
}, `
        // A Hello World! program in C#.
        using System;
        namespace HelloWorld
        {
          class Hello 
          {
            static void Main() 
            {
              Console.WriteLine("Hello World!");

              // Keep the console window open in debug mode.
              Console.WriteLine("Press any key to exit.");
              Console.ReadKey();
            }
          }
        }
      `)).add('dark unsupported', () => {
  const theme = ensure(themes.dark);
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    bordered: true,
    language: "C#",
    copyable: true
  }, `
            // A Hello World! program in C#.
            using System;
            namespace HelloWorld
            {
              class Hello 
              {
                static void Main() 
                {
                  Console.WriteLine("Hello World!");

                  // Keep the console window open in debug mode.
                  Console.WriteLine("Press any key to exit.");
                  Console.ReadKey();
                }
              }
            }
          `));
}).add('story', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "jsx",
  copyable: false
}, `
        import React from 'react';
        import { storiesOf } from '@storybook/react';
        import { styled } from '@storybook/theming';

        import Heading from './heading';

        const Holder = styled.div({
          margin: 10,
          border: '1px dashed deepskyblue',
          // overflow: 'hidden',
        });

        storiesOf('Basics|Heading', module).add('types', () => (
          <div>
            <Holder>
              <Heading>DEFAULT WITH ALL CAPS</Heading>
            </Holder>
            <Holder>
              <Heading sub="With a great sub">THIS LONG DEFAULT WITH ALL CAPS & SUB</Heading>
            </Holder>
            <Holder>
              <Heading type="page">page type</Heading>
            </Holder>
            <Holder>
              <Heading type="page" sub="With a sub">
                page type
              </Heading>
            </Holder>
          </div>
        ));
      `)).add('bordered & copy-able', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "jsx",
  copyable: true,
  bordered: true
}, `import { Good, Things } from 'life';

        const result = () => <Good><Things /></Good>;

        export { result as default };
      `)).add('padded', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "jsx",
  padded: true
}, `import { Good, Things } from 'life';

        const result = () => <Good><Things /></Good>;

        export { result as default };
      `)).add('showLineNumbers', () => /*#__PURE__*/React.createElement(SyntaxHighlighter, {
  language: "jsx",
  copyable: false,
  showLineNumbers: true
}, `import { Good, Things } from 'life';

        const result = () => <Good><Things /></Good>;

        export { result as default };
      `));