import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { logger } from '@storybook/client-logger';
import { Tabs, TabsState, TabWrapper } from './tabs';
const colours = Array.from(new Array(15), (val, index) => index).map(i => Math.floor(1 / 15 * i * 16777215).toString(16).padStart(6, '0'));

function fibonacci(num, memo) {
  /* eslint-disable no-param-reassign */
  if (!memo) {
    memo = {};
  }

  if (memo[num]) {
    return memo[num];
  }

  if (num <= 1) {
    return 1;
  }

  memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
  return memo[num];
  /* eslint-enable no-param-reassign */
}

const panels = {
  test1: {
    title: 'Tab title #1',
    render: ({
      active,
      key
    }) => active ? /*#__PURE__*/React.createElement("div", {
      id: "test1",
      key: key
    }, "CONTENT 1") : null
  },
  test2: {
    title: 'Tab title #2',
    render: ({
      active,
      key
    }) => /*#__PURE__*/React.createElement("div", {
      key: key,
      id: "test2",
      style: {
        background: 'hotpink',
        minHeight: '100%',
        display: active ? 'block' : 'none'
      }
    }, "CONTENT 2")
  },
  test3: {
    title: 'Tab with scroll!',
    render: ({
      active,
      key
    }) => active ? /*#__PURE__*/React.createElement("div", {
      id: "test3",
      key: key
    }, colours.map((colour, i) => /*#__PURE__*/React.createElement("div", {
      key: colour,
      style: {
        background: `#${colour}`,
        height: 30 + fibonacci(i + 5) / 10
      }
    }))) : null
  },
  test4: {
    title: 'Tab title #4',
    render: ({
      active,
      key
    }) => active ? /*#__PURE__*/React.createElement("div", {
      key: key,
      id: "test4"
    }, "CONTENT 4") : null
  },
  test5: {
    title: 'Tab title #5',
    render: ({
      active,
      key
    }) => active ? /*#__PURE__*/React.createElement("div", {
      key: key,
      id: "test5"
    }, "CONTENT 5") : null
  },
  test6: {
    title: 'Tab title #6',
    render: ({
      active,
      key
    }) => /*#__PURE__*/React.createElement(TabWrapper, {
      key: key,
      active: active,
      render: () => /*#__PURE__*/React.createElement("div", null, "CONTENT 6")
    })
  }
};
const onSelect = action('onSelect');
const content = Object.entries(panels).map(([k, v]) => /*#__PURE__*/React.createElement("div", {
  key: k,
  id: k,
  title: v.title
}, v.render));
storiesOf('Basics/Tabs', module).addDecorator(s => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'relative',
    height: 'calc(100vh - 20px)',
    width: 'calc(100vw - 20px)',
    margin: 10
  }
}, s())).add('stateful - static', () => /*#__PURE__*/React.createElement(TabsState, {
  initial: "test2"
}, /*#__PURE__*/React.createElement("div", {
  id: "test1",
  title: "With a function"
}, ({
  active,
  selected
}) => active ? /*#__PURE__*/React.createElement("div", null, selected, " is selected") : null), /*#__PURE__*/React.createElement("div", {
  id: "test2",
  title: "With markup"
}, /*#__PURE__*/React.createElement("div", null, "test2 is always active (but visually hidden)")))).add('stateful - static with set button text colors', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TabsState, {
  initial: "test2"
}, /*#__PURE__*/React.createElement("div", {
  id: "test1",
  title: "With a function",
  color: "#e00000"
}, ({
  active,
  selected
}) => active ? /*#__PURE__*/React.createElement("div", null, selected, " is selected") : null), /*#__PURE__*/React.createElement("div", {
  id: "test2",
  title: "With markup",
  color: "green"
}, /*#__PURE__*/React.createElement("div", null, "test2 is always active (but visually hidden)"))))).add('stateful - static with set backgroundColor', () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TabsState, {
  initial: "test2",
  backgroundColor: "rgba(0,0,0,.05)"
}, /*#__PURE__*/React.createElement("div", {
  id: "test1",
  title: "With a function",
  color: "#e00000"
}, ({
  active,
  selected
}) => active ? /*#__PURE__*/React.createElement("div", null, selected, " is selected") : null), /*#__PURE__*/React.createElement("div", {
  id: "test2",
  title: "With markup",
  color: "green"
}, /*#__PURE__*/React.createElement("div", null, "test2 is always active (but visually hidden)"))))).add('stateful - dynamic', () => /*#__PURE__*/React.createElement(TabsState, {
  initial: "test3"
}, Object.entries(panels).map(([k, v]) => /*#__PURE__*/React.createElement("div", {
  key: k,
  id: k,
  title: v.title
}, v.render)))).add('stateful - no initial', () => /*#__PURE__*/React.createElement(TabsState, null, content)).add('stateless - bordered', () => /*#__PURE__*/React.createElement(Tabs, {
  bordered: true,
  absolute: false,
  selected: "test3",
  actions: {
    onSelect
  }
}, content)).add('stateless - with tools', () => /*#__PURE__*/React.createElement(Tabs, {
  selected: "test3",
  actions: {
    onSelect
  },
  tools: /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => logger.log('1')
  }, "1"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => logger.log('2')
  }, "2"))
}, content)).add('stateless - absolute', () => /*#__PURE__*/React.createElement(Tabs, {
  absolute: true,
  selected: "test3",
  actions: {
    onSelect
  }
}, content)).add('stateless - absolute bordered', () => /*#__PURE__*/React.createElement(Tabs, {
  absolute: true,
  bordered: true,
  selected: "test3",
  actions: {
    onSelect
  }
}, content)).add('stateless - empty', () => /*#__PURE__*/React.createElement(Tabs, {
  actions: {
    onSelect
  },
  bordered: true,
  absolute: true
}));