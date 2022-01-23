"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessibilityGoldIconLongHeadLineNoSubHeadline = exports.accessibilityGoldIconLongHeadLineNoSubHeadlineData = exports.AccessibilityGoldIcon = exports.accessibilityGoldIconData = exports.AccessibilityIcon = exports.accessibilityIconData = exports.BookIconLongSubHeadline = exports.bookIconLongSubHeadlineData = exports.BookIconSubHeadline = exports.bookIconSubHeadlineData = exports.StrongEmphasizedSubHeadline = exports.strongEmphasizedSubHeadlineData = exports.StrongSubHeadline = exports.strongSubHeadlineData = exports.BookIcon = exports.bookIconData = exports.LinkIconWithColorSubHeadline = exports.linkIconWithColorSubHeadlineData = exports.LinkIconWithColor = exports.linkIconWithColorData = exports.Link = exports.linkData = exports.LongHeadline = exports.longHeadlineData = exports.Simple = exports.simpleData = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _router = require("@storybook/router");

var _NotificationItem = _interopRequireDefault(require("./NotificationItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  component: _NotificationItem.default,
  title: 'UI/Notifications/NotificationItem',
  decorators: [function (StoryFn) {
    return /*#__PURE__*/_react.default.createElement(_router.LocationProvider, null, /*#__PURE__*/_react.default.createElement(StoryFn, null));
  }, function (storyFn) {
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: '240px',
        margin: '1rem'
      }
    }, storyFn());
  }],
  excludeStories: /.*Data$/
};
exports.default = _default;

var onClear = function onClear() {};

var onDismissNotification = function onDismissNotification() {};

var Template = function Template(args) {
  return /*#__PURE__*/_react.default.createElement(_NotificationItem.default, args);
};

Template.displayName = "Template";
var simpleData = {
  id: '1',
  onClear: onClear,
  content: {
    headline: 'Storybook cool!'
  }
};
exports.simpleData = simpleData;
var Simple = Template.bind({});
exports.Simple = Simple;
Simple.args = {
  notification: simpleData,
  onDismissNotification: onDismissNotification
};
var longHeadlineData = {
  id: '2',
  onClear: onClear,
  content: {
    headline: 'This is a long message that extends over two lines!'
  }
};
exports.longHeadlineData = longHeadlineData;
var LongHeadline = Template.bind({});
exports.LongHeadline = LongHeadline;
LongHeadline.args = {
  notification: longHeadlineData,
  onDismissNotification: onDismissNotification
};
var linkData = {
  id: '3',
  onClear: onClear,
  content: {
    headline: 'Storybook X.X is available! Download now »'
  },
  link: '/some/path'
};
exports.linkData = linkData;
var Link = Template.bind({});
exports.Link = Link;
Link.args = {
  notification: linkData,
  onDismissNotification: onDismissNotification
};
var linkIconWithColorData = {
  id: '4',
  onClear: onClear,
  content: {
    headline: 'Storybook with a smile!'
  },
  icon: {
    name: 'facehappy',
    color: 'hotpink'
  },
  link: '/some/path'
};
exports.linkIconWithColorData = linkIconWithColorData;
var LinkIconWithColor = Template.bind({});
exports.LinkIconWithColor = LinkIconWithColor;
LinkIconWithColor.args = {
  notification: linkIconWithColorData,
  onDismissNotification: onDismissNotification
};
var linkIconWithColorSubHeadlineData = {
  id: '5',
  onClear: onClear,
  content: {
    headline: 'Storybook X.X is available with a smile! Download now »',
    subHeadline: 'This link also has a sub headline'
  },
  icon: {
    name: 'facehappy',
    color: 'tomato'
  },
  link: '/some/path'
};
exports.linkIconWithColorSubHeadlineData = linkIconWithColorSubHeadlineData;
var LinkIconWithColorSubHeadline = Template.bind({});
exports.LinkIconWithColorSubHeadline = LinkIconWithColorSubHeadline;
LinkIconWithColorSubHeadline.args = {
  notification: linkIconWithColorSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var bookIconData = {
  id: '6',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!'
  },
  icon: {
    name: 'book'
  }
};
exports.bookIconData = bookIconData;
var BookIcon = Template.bind({});
exports.BookIcon = BookIcon;
BookIcon.args = {
  notification: bookIconData,
  onDismissNotification: onDismissNotification
};
var strongSubHeadlineData = {
  id: '7',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: /*#__PURE__*/_react.default.createElement("strong", null, "Strong subHeadline")
  },
  icon: {
    name: 'book'
  }
};
exports.strongSubHeadlineData = strongSubHeadlineData;
var StrongSubHeadline = Template.bind({});
exports.StrongSubHeadline = StrongSubHeadline;
StrongSubHeadline.args = {
  notification: strongSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var strongEmphasizedSubHeadlineData = {
  id: '8',
  onClear: onClear,
  content: {
    headline: 'Storybook cool!',
    subHeadline: /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("em", null, "Emphasized"), " normal ", /*#__PURE__*/_react.default.createElement("strong", null, "strong Storybook!"))
  },
  icon: {
    name: 'book'
  }
};
exports.strongEmphasizedSubHeadlineData = strongEmphasizedSubHeadlineData;
var StrongEmphasizedSubHeadline = Template.bind({});
exports.StrongEmphasizedSubHeadline = StrongEmphasizedSubHeadline;
StrongEmphasizedSubHeadline.args = {
  notification: strongEmphasizedSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var bookIconSubHeadlineData = {
  id: '9',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: 'Find out more!'
  },
  icon: {
    name: 'book'
  }
};
exports.bookIconSubHeadlineData = bookIconSubHeadlineData;
var BookIconSubHeadline = Template.bind({});
exports.BookIconSubHeadline = BookIconSubHeadline;
BookIconSubHeadline.args = {
  notification: bookIconSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var bookIconLongSubHeadlineData = {
  id: '10',
  onClear: onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: 'Find out more! by clicking on on buttons and downloading some applications. Find out more! by clicking on buttons and downloading some applications'
  },
  icon: {
    name: 'book'
  }
};
exports.bookIconLongSubHeadlineData = bookIconLongSubHeadlineData;
var BookIconLongSubHeadline = Template.bind({});
exports.BookIconLongSubHeadline = BookIconLongSubHeadline;
BookIconLongSubHeadline.args = {
  notification: bookIconLongSubHeadlineData,
  onDismissNotification: onDismissNotification
};
var accessibilityIconData = {
  id: '11',
  onClear: onClear,
  content: {
    headline: 'Storybook has a accessibility icon!',
    subHeadline: 'It is here!'
  },
  icon: {
    name: 'accessibility'
  }
};
exports.accessibilityIconData = accessibilityIconData;
var AccessibilityIcon = Template.bind({});
exports.AccessibilityIcon = AccessibilityIcon;
AccessibilityIcon.args = {
  notification: accessibilityIconData,
  onDismissNotification: onDismissNotification
};
var accessibilityGoldIconData = {
  id: '12',
  onClear: onClear,
  content: {
    headline: 'Accessibility icon!',
    subHeadline: 'It is gold!'
  },
  icon: {
    name: 'accessibility',
    color: 'gold'
  }
};
exports.accessibilityGoldIconData = accessibilityGoldIconData;
var AccessibilityGoldIcon = Template.bind({});
exports.AccessibilityGoldIcon = AccessibilityGoldIcon;
AccessibilityGoldIcon.args = {
  notification: accessibilityGoldIconData,
  onDismissNotification: onDismissNotification
};
var accessibilityGoldIconLongHeadLineNoSubHeadlineData = {
  id: '13',
  onClear: onClear,
  content: {
    headline: 'Storybook notifications has a accessibility icon it can be any color!'
  },
  icon: {
    name: 'accessibility',
    color: 'gold'
  }
};
exports.accessibilityGoldIconLongHeadLineNoSubHeadlineData = accessibilityGoldIconLongHeadLineNoSubHeadlineData;
var AccessibilityGoldIconLongHeadLineNoSubHeadline = Template.bind({});
exports.AccessibilityGoldIconLongHeadLineNoSubHeadline = AccessibilityGoldIconLongHeadLineNoSubHeadline;
AccessibilityGoldIconLongHeadLineNoSubHeadline.args = {
  notification: accessibilityGoldIconLongHeadLineNoSubHeadlineData,
  onDismissNotification: onDismissNotification
};