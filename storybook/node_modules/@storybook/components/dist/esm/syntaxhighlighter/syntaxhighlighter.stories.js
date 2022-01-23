import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider, themes, ensure } from '@storybook/theming';
import { SyntaxHighlighter } from './lazy-syntaxhighlighter';
storiesOf('Basics/SyntaxHighlighter', module).add('bash', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "bash",
    copyable: false
  }, "npx npm-check-updates '/storybook/' -u && npm install");
}).add('css', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "css",
    copyable: false
  }, "\n        .className {\n          border: 1px solid hotpink;\n        }\n      ");
}).add('json', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "json",
    copyable: false
  }, "\n      {\n        \"number\": 1,\n        \"string\": \"something\",\n        \"object\": {\n          \"property\": \"value\",\n        },\n        array: [1,2,3],\n      }\n      ");
}).add('markdown', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "markdown",
    copyable: false
  }, "\n      # a big header\n\n      some code:\n\n      ~~~js\n      const name = \"a string\";\n      ~~~\n\n      > crazy\n\n      ");
}).add('yaml', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "yaml",
    copyable: false
  }, "\n        product:\n        - sku         : BL394D\n          quantity    : 4\n          description : Basketball\n          price       : 450.00\n      ");
}).add('jsx', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "jsx",
    copyable: false
  }, "import { Good, Things } from 'life';\n\n        const result = () => <Good><Things all={true} /></Good>;\n\n        export { result as default };\n      ");
}).add('js', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "jsx",
    copyable: false
  }, "import React, { createElement } from 'react';\n        import { Good, Things } from 'life';\n\n        const result = () => createElement(Good, [createElement(Things, [], { all: true }), []);\n\n        console.log(result);\n\n        export { result as default };\n      ");
}).add('graphql', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "graphql",
    copyable: false
  }, "query HeroNameAndFriends($episode: Episode) {\n          hero(episode: $episode) {\n            name\n            friends {\n              name\n            }\n          }\n        }\n      ");
}).add('unsupported', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "C#",
    bordered: true,
    copyable: true
  }, "\n        // A Hello World! program in C#.\n        using System;\n        namespace HelloWorld\n        {\n          class Hello \n          {\n            static void Main() \n            {\n              Console.WriteLine(\"Hello World!\");\n\n              // Keep the console window open in debug mode.\n              Console.WriteLine(\"Press any key to exit.\");\n              Console.ReadKey();\n            }\n          }\n        }\n      ");
}).add('dark unsupported', function () {
  var theme = ensure(themes.dark);
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    bordered: true,
    language: "C#",
    copyable: true
  }, "\n            // A Hello World! program in C#.\n            using System;\n            namespace HelloWorld\n            {\n              class Hello \n              {\n                static void Main() \n                {\n                  Console.WriteLine(\"Hello World!\");\n\n                  // Keep the console window open in debug mode.\n                  Console.WriteLine(\"Press any key to exit.\");\n                  Console.ReadKey();\n                }\n              }\n            }\n          "));
}).add('story', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "jsx",
    copyable: false
  }, "\n        import React from 'react';\n        import { storiesOf } from '@storybook/react';\n        import { styled } from '@storybook/theming';\n\n        import Heading from './heading';\n\n        const Holder = styled.div({\n          margin: 10,\n          border: '1px dashed deepskyblue',\n          // overflow: 'hidden',\n        });\n\n        storiesOf('Basics|Heading', module).add('types', () => (\n          <div>\n            <Holder>\n              <Heading>DEFAULT WITH ALL CAPS</Heading>\n            </Holder>\n            <Holder>\n              <Heading sub=\"With a great sub\">THIS LONG DEFAULT WITH ALL CAPS & SUB</Heading>\n            </Holder>\n            <Holder>\n              <Heading type=\"page\">page type</Heading>\n            </Holder>\n            <Holder>\n              <Heading type=\"page\" sub=\"With a sub\">\n                page type\n              </Heading>\n            </Holder>\n          </div>\n        ));\n      ");
}).add('bordered & copy-able', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "jsx",
    copyable: true,
    bordered: true
  }, "import { Good, Things } from 'life';\n\n        const result = () => <Good><Things /></Good>;\n\n        export { result as default };\n      ");
}).add('padded', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "jsx",
    padded: true
  }, "import { Good, Things } from 'life';\n\n        const result = () => <Good><Things /></Good>;\n\n        export { result as default };\n      ");
}).add('showLineNumbers', function () {
  return /*#__PURE__*/React.createElement(SyntaxHighlighter, {
    language: "jsx",
    copyable: false,
    showLineNumbers: true
  }, "import { Good, Things } from 'life';\n\n        const result = () => <Good><Things /></Good>;\n\n        export { result as default };\n      ");
});