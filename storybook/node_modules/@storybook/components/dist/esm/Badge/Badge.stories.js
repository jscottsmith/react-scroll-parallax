import React from 'react';
import { storiesOf } from '@storybook/react';
import { Badge } from './Badge';
storiesOf('Basics/Badge', module).add('all badges', function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    status: "positive"
  }, "Positive"), /*#__PURE__*/React.createElement(Badge, {
    status: "negative"
  }, "Negative"), /*#__PURE__*/React.createElement(Badge, {
    status: "neutral"
  }, "Neutral"));
});