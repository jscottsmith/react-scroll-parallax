import React from 'react';
import { LocationProvider } from '@storybook/router';
import NotificationItem from './NotificationItem';
export default {
  component: NotificationItem,
  title: 'UI/Notifications/NotificationItem',
  decorators: [StoryFn => /*#__PURE__*/React.createElement(LocationProvider, null, /*#__PURE__*/React.createElement(StoryFn, null)), storyFn => /*#__PURE__*/React.createElement("div", {
    style: {
      width: '240px',
      margin: '1rem'
    }
  }, storyFn())],
  excludeStories: /.*Data$/
};

const onClear = () => {};

const onDismissNotification = () => {};

const Template = args => /*#__PURE__*/React.createElement(NotificationItem, args);

Template.displayName = "Template";
export const simpleData = {
  id: '1',
  onClear,
  content: {
    headline: 'Storybook cool!'
  }
};
export const Simple = Template.bind({});
Simple.args = {
  notification: simpleData,
  onDismissNotification
};
export const longHeadlineData = {
  id: '2',
  onClear,
  content: {
    headline: 'This is a long message that extends over two lines!'
  }
};
export const LongHeadline = Template.bind({});
LongHeadline.args = {
  notification: longHeadlineData,
  onDismissNotification
};
export const linkData = {
  id: '3',
  onClear,
  content: {
    headline: 'Storybook X.X is available! Download now »'
  },
  link: '/some/path'
};
export const Link = Template.bind({});
Link.args = {
  notification: linkData,
  onDismissNotification
};
export const linkIconWithColorData = {
  id: '4',
  onClear,
  content: {
    headline: 'Storybook with a smile!'
  },
  icon: {
    name: 'facehappy',
    color: 'hotpink'
  },
  link: '/some/path'
};
export const LinkIconWithColor = Template.bind({});
LinkIconWithColor.args = {
  notification: linkIconWithColorData,
  onDismissNotification
};
export const linkIconWithColorSubHeadlineData = {
  id: '5',
  onClear,
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
export const LinkIconWithColorSubHeadline = Template.bind({});
LinkIconWithColorSubHeadline.args = {
  notification: linkIconWithColorSubHeadlineData,
  onDismissNotification
};
export const bookIconData = {
  id: '6',
  onClear,
  content: {
    headline: 'Storybook has a book icon!'
  },
  icon: {
    name: 'book'
  }
};
export const BookIcon = Template.bind({});
BookIcon.args = {
  notification: bookIconData,
  onDismissNotification
};
export const strongSubHeadlineData = {
  id: '7',
  onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: /*#__PURE__*/React.createElement("strong", null, "Strong subHeadline")
  },
  icon: {
    name: 'book'
  }
};
export const StrongSubHeadline = Template.bind({});
StrongSubHeadline.args = {
  notification: strongSubHeadlineData,
  onDismissNotification
};
export const strongEmphasizedSubHeadlineData = {
  id: '8',
  onClear,
  content: {
    headline: 'Storybook cool!',
    subHeadline: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("em", null, "Emphasized"), " normal ", /*#__PURE__*/React.createElement("strong", null, "strong Storybook!"))
  },
  icon: {
    name: 'book'
  }
};
export const StrongEmphasizedSubHeadline = Template.bind({});
StrongEmphasizedSubHeadline.args = {
  notification: strongEmphasizedSubHeadlineData,
  onDismissNotification
};
export const bookIconSubHeadlineData = {
  id: '9',
  onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: 'Find out more!'
  },
  icon: {
    name: 'book'
  }
};
export const BookIconSubHeadline = Template.bind({});
BookIconSubHeadline.args = {
  notification: bookIconSubHeadlineData,
  onDismissNotification
};
export const bookIconLongSubHeadlineData = {
  id: '10',
  onClear,
  content: {
    headline: 'Storybook has a book icon!',
    subHeadline: 'Find out more! by clicking on on buttons and downloading some applications. Find out more! by clicking on buttons and downloading some applications'
  },
  icon: {
    name: 'book'
  }
};
export const BookIconLongSubHeadline = Template.bind({});
BookIconLongSubHeadline.args = {
  notification: bookIconLongSubHeadlineData,
  onDismissNotification
};
export const accessibilityIconData = {
  id: '11',
  onClear,
  content: {
    headline: 'Storybook has a accessibility icon!',
    subHeadline: 'It is here!'
  },
  icon: {
    name: 'accessibility'
  }
};
export const AccessibilityIcon = Template.bind({});
AccessibilityIcon.args = {
  notification: accessibilityIconData,
  onDismissNotification
};
export const accessibilityGoldIconData = {
  id: '12',
  onClear,
  content: {
    headline: 'Accessibility icon!',
    subHeadline: 'It is gold!'
  },
  icon: {
    name: 'accessibility',
    color: 'gold'
  }
};
export const AccessibilityGoldIcon = Template.bind({});
AccessibilityGoldIcon.args = {
  notification: accessibilityGoldIconData,
  onDismissNotification
};
export const accessibilityGoldIconLongHeadLineNoSubHeadlineData = {
  id: '13',
  onClear,
  content: {
    headline: 'Storybook notifications has a accessibility icon it can be any color!'
  },
  icon: {
    name: 'accessibility',
    color: 'gold'
  }
};
export const AccessibilityGoldIconLongHeadLineNoSubHeadline = Template.bind({});
AccessibilityGoldIconLongHeadLineNoSubHeadline.args = {
  notification: accessibilityGoldIconLongHeadLineNoSubHeadlineData,
  onDismissNotification
};