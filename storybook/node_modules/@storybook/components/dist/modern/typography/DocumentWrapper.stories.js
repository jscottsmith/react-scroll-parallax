import React from 'react';
import { DocumentWrapper } from './DocumentWrapper';
import MarkdownSample from './DocumentFormattingSample.md';
export default {
  component: DocumentWrapper,
  title: 'Basics/DocumentFormatting',
  decorators: [storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      width: '600px'
    }
  }, storyFn())]
};
export const WithMarkdown = () => /*#__PURE__*/React.createElement(DocumentWrapper, null, /*#__PURE__*/React.createElement(MarkdownSample, null));
WithMarkdown.displayName = "WithMarkdown";
export const WithDOM = () => /*#__PURE__*/React.createElement(DocumentWrapper, null, /*#__PURE__*/React.createElement("h1", null, "h1 Heading"), /*#__PURE__*/React.createElement("h2", null, "h2 Heading"), /*#__PURE__*/React.createElement("h3", null, "h3 Heading"), /*#__PURE__*/React.createElement("h4", null, "h4 Heading"), /*#__PURE__*/React.createElement("h5", null, "h5 Heading"), /*#__PURE__*/React.createElement("h6", null, "h6 Heading"), /*#__PURE__*/React.createElement("h2", null, "Typographic replacements"), /*#__PURE__*/React.createElement("p", null, "Enable typographer option to see result."), /*#__PURE__*/React.createElement("p", null, "\xA9 \xA9 \xAE \xAE \u2122 \u2122 \xA7 \xA7 \xB1"), /*#__PURE__*/React.createElement("p", null, "test\u2026 test\u2026 test\u2026 test?.. test!.."), /*#__PURE__*/React.createElement("p", null, "!!! ??? , \u2013 \u2014"), /*#__PURE__*/React.createElement("p", null, "\u201CSmartypants, double quotes\u201D and \u2018single quotes\u2019"), /*#__PURE__*/React.createElement("h2", null, "Emphasis"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "This is bold text")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "This is bold text")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "This is italic text")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, "This is italic text")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("em", null, /*#__PURE__*/React.createElement("strong", null, "This is bold italic text"))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("s", null, "Strikethrough")), /*#__PURE__*/React.createElement("h2", null, "Blockquotes"), /*#__PURE__*/React.createElement("blockquote", null, /*#__PURE__*/React.createElement("p", null, "Blockquotes can also be nested\u2026"), /*#__PURE__*/React.createElement("blockquote", null, /*#__PURE__*/React.createElement("p", null, "\u2026by using additional greater-than signs right next to each other\u2026"), /*#__PURE__*/React.createElement("blockquote", null, /*#__PURE__*/React.createElement("p", null, "\u2026or with spaces between arrows.")))), /*#__PURE__*/React.createElement("h2", null, "Lists"), /*#__PURE__*/React.createElement("p", null, "Unordered"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Create a list by starting a line with ", /*#__PURE__*/React.createElement("code", null, "+"), ", ", /*#__PURE__*/React.createElement("code", null, "-"), ", or ", /*#__PURE__*/React.createElement("code", null, "*")), /*#__PURE__*/React.createElement("li", null, "Sub-lists are made by indenting 2 spaces:", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Marker character change forces new list start:", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Ac tristique libero volutpat at")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Facilisis in pretium nisl aliquet")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Nulla volutpat aliquam velit"))))), /*#__PURE__*/React.createElement("li", null, "Very easy!")), /*#__PURE__*/React.createElement("p", null, "Ordered"), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("p", null, "Lorem ipsum dolor sit amet")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("p", null, "Consectetur adipiscing elit")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("p", null, "Integer molestie lorem at massa")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("p", null, "You can use sequential numbers\u2026")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("p", null, "\u2026or keep all the numbers as ", /*#__PURE__*/React.createElement("code", null, "1.")))), /*#__PURE__*/React.createElement("p", null, "Start numbering with offset:"), /*#__PURE__*/React.createElement("ol", {
  start: 57
}, /*#__PURE__*/React.createElement("li", null, "foo"), /*#__PURE__*/React.createElement("li", null, "bar")), /*#__PURE__*/React.createElement("h2", null, "Horizontal Rule"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h2", null, "Tables"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Option"), /*#__PURE__*/React.createElement("th", null, "Description"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "data"), /*#__PURE__*/React.createElement("td", null, "path to data files to supply the data that will be passed into templates.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "engine"), /*#__PURE__*/React.createElement("td", null, "engine to be used for processing templates. Handlebars is the default.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "ext"), /*#__PURE__*/React.createElement("td", null, "extension to be used for dest files.")))), /*#__PURE__*/React.createElement("p", null, "Right aligned columns"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
  style: {
    textAlign: 'right'
  }
}, "Option"), /*#__PURE__*/React.createElement("th", {
  style: {
    textAlign: 'right'
  }
}, "Description"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
  style: {
    textAlign: 'right'
  }
}, "data"), /*#__PURE__*/React.createElement("td", {
  style: {
    textAlign: 'right'
  }
}, "path to data files to supply the data that will be passed into templates.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
  style: {
    textAlign: 'right'
  }
}, "engine"), /*#__PURE__*/React.createElement("td", {
  style: {
    textAlign: 'right'
  }
}, "engine to be used for processing templates. Handlebars is the default.")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
  style: {
    textAlign: 'right'
  }
}, "ext"), /*#__PURE__*/React.createElement("td", {
  style: {
    textAlign: 'right'
  }
}, "extension to be used for dest files.")))), /*#__PURE__*/React.createElement("h2", null, "Links"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
  href: "http://dev.nodeca.com"
}, "link text")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
  href: "http://nodeca.github.io/pica/demo/",
  title: "title text!"
}, "link with title")), /*#__PURE__*/React.createElement("p", null, "Autoconverted link ", /*#__PURE__*/React.createElement("a", {
  href: "https://github.com/nodeca/pica"
}, "https://github.com/nodeca/pica"), "\xA0(enable linkify to see)"), /*#__PURE__*/React.createElement("h2", null, "Images"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("img", {
  src: "https://octodex.github.com/images/minion.png",
  alt: "Minion"
}), /*#__PURE__*/React.createElement("img", {
  src: "https://octodex.github.com/images/stormtroopocat.jpg",
  alt: "Stormtroopocat",
  title: "The Stormtroopocat"
})));
WithDOM.displayName = "WithDOM";