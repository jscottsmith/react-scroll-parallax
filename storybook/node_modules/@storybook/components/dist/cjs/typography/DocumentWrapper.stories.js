"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithDOM = exports.WithMarkdown = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _DocumentWrapper = require("./DocumentWrapper");

var _DocumentFormattingSample = _interopRequireDefault(require("./DocumentFormattingSample.md"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _DocumentWrapper.DocumentWrapper,
  title: 'Basics/DocumentFormatting',
  decorators: [function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '600px'
      }
    }, storyFn());
  }]
};
exports.default = _default;

var WithMarkdown = function WithMarkdown() {
  return /*#__PURE__*/_react.default.createElement(_DocumentWrapper.DocumentWrapper, null, /*#__PURE__*/_react.default.createElement(_DocumentFormattingSample.default, null));
};

exports.WithMarkdown = WithMarkdown;
WithMarkdown.displayName = "WithMarkdown";

var WithDOM = function WithDOM() {
  return /*#__PURE__*/_react.default.createElement(_DocumentWrapper.DocumentWrapper, null, /*#__PURE__*/_react.default.createElement("h1", null, "h1 Heading"), /*#__PURE__*/_react.default.createElement("h2", null, "h2 Heading"), /*#__PURE__*/_react.default.createElement("h3", null, "h3 Heading"), /*#__PURE__*/_react.default.createElement("h4", null, "h4 Heading"), /*#__PURE__*/_react.default.createElement("h5", null, "h5 Heading"), /*#__PURE__*/_react.default.createElement("h6", null, "h6 Heading"), /*#__PURE__*/_react.default.createElement("h2", null, "Typographic replacements"), /*#__PURE__*/_react.default.createElement("p", null, "Enable typographer option to see result."), /*#__PURE__*/_react.default.createElement("p", null, "\xA9 \xA9 \xAE \xAE \u2122 \u2122 \xA7 \xA7 \xB1"), /*#__PURE__*/_react.default.createElement("p", null, "test\u2026 test\u2026 test\u2026 test?.. test!.."), /*#__PURE__*/_react.default.createElement("p", null, "!!! ??? , \u2013 \u2014"), /*#__PURE__*/_react.default.createElement("p", null, "\u201CSmartypants, double quotes\u201D and \u2018single quotes\u2019"), /*#__PURE__*/_react.default.createElement("h2", null, "Emphasis"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, "This is bold text")), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, "This is bold text")), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "This is italic text")), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, "This is italic text")), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("em", null, /*#__PURE__*/_react.default.createElement("strong", null, "This is bold italic text"))), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("s", null, "Strikethrough")), /*#__PURE__*/_react.default.createElement("h2", null, "Blockquotes"), /*#__PURE__*/_react.default.createElement("blockquote", null, /*#__PURE__*/_react.default.createElement("p", null, "Blockquotes can also be nested\u2026"), /*#__PURE__*/_react.default.createElement("blockquote", null, /*#__PURE__*/_react.default.createElement("p", null, "\u2026by using additional greater-than signs right next to each other\u2026"), /*#__PURE__*/_react.default.createElement("blockquote", null, /*#__PURE__*/_react.default.createElement("p", null, "\u2026or with spaces between arrows.")))), /*#__PURE__*/_react.default.createElement("h2", null, "Lists"), /*#__PURE__*/_react.default.createElement("p", null, "Unordered"), /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "Create a list by starting a line with ", /*#__PURE__*/_react.default.createElement("code", null, "+"), ", ", /*#__PURE__*/_react.default.createElement("code", null, "-"), ", or ", /*#__PURE__*/_react.default.createElement("code", null, "*")), /*#__PURE__*/_react.default.createElement("li", null, "Sub-lists are made by indenting 2 spaces:", /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "Marker character change forces new list start:", /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "Ac tristique libero volutpat at")), /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "Facilisis in pretium nisl aliquet")), /*#__PURE__*/_react.default.createElement("ul", null, /*#__PURE__*/_react.default.createElement("li", null, "Nulla volutpat aliquam velit"))))), /*#__PURE__*/_react.default.createElement("li", null, "Very easy!")), /*#__PURE__*/_react.default.createElement("p", null, "Ordered"), /*#__PURE__*/_react.default.createElement("ol", null, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("p", null, "Lorem ipsum dolor sit amet")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("p", null, "Consectetur adipiscing elit")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("p", null, "Integer molestie lorem at massa")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("p", null, "You can use sequential numbers\u2026")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("p", null, "\u2026or keep all the numbers as ", /*#__PURE__*/_react.default.createElement("code", null, "1.")))), /*#__PURE__*/_react.default.createElement("p", null, "Start numbering with offset:"), /*#__PURE__*/_react.default.createElement("ol", {
    start: 57
  }, /*#__PURE__*/_react.default.createElement("li", null, "foo"), /*#__PURE__*/_react.default.createElement("li", null, "bar")), /*#__PURE__*/_react.default.createElement("h2", null, "Horizontal Rule"), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement("h2", null, "Tables"), /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Option"), /*#__PURE__*/_react.default.createElement("th", null, "Description"))), /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "data"), /*#__PURE__*/_react.default.createElement("td", null, "path to data files to supply the data that will be passed into templates.")), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "engine"), /*#__PURE__*/_react.default.createElement("td", null, "engine to be used for processing templates. Handlebars is the default.")), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "ext"), /*#__PURE__*/_react.default.createElement("td", null, "extension to be used for dest files.")))), /*#__PURE__*/_react.default.createElement("p", null, "Right aligned columns"), /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Option"), /*#__PURE__*/_react.default.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Description"))), /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "data"), /*#__PURE__*/_react.default.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "path to data files to supply the data that will be passed into templates.")), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "engine"), /*#__PURE__*/_react.default.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "engine to be used for processing templates. Handlebars is the default.")), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "ext"), /*#__PURE__*/_react.default.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, "extension to be used for dest files.")))), /*#__PURE__*/_react.default.createElement("h2", null, "Links"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("a", {
    href: "http://dev.nodeca.com"
  }, "link text")), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("a", {
    href: "http://nodeca.github.io/pica/demo/",
    title: "title text!"
  }, "link with title")), /*#__PURE__*/_react.default.createElement("p", null, "Autoconverted link ", /*#__PURE__*/_react.default.createElement("a", {
    href: "https://github.com/nodeca/pica"
  }, "https://github.com/nodeca/pica"), "\xA0(enable linkify to see)"), /*#__PURE__*/_react.default.createElement("h2", null, "Images"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("img", {
    src: "https://octodex.github.com/images/minion.png",
    alt: "Minion"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: "https://octodex.github.com/images/stormtroopocat.jpg",
    alt: "Stormtroopocat",
    title: "The Stormtroopocat"
  })));
};

exports.WithDOM = WithDOM;
WithDOM.displayName = "WithDOM";