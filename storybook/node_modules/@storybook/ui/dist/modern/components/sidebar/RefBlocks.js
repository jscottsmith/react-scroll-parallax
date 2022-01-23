import global from 'global';
import React, { useState, useCallback, Fragment } from 'react';
import { Icons, WithTooltip, Spaced, Button, Link } from '@storybook/components';
import { logger } from '@storybook/client-logger';
import { styled } from '@storybook/theming';
import { Loader, Contained } from './Loader';
const {
  window: globalWindow,
  document
} = global;
const TextStyle = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s2 - 1,
  lineHeight: '20px',
  margin: 0
}));
const Text = styled.div(({
  theme
}) => ({
  fontSize: theme.typography.size.s2 - 1,
  lineHeight: '20px',
  margin: 0,
  code: {
    fontSize: theme.typography.size.s1
  },
  ul: {
    paddingLeft: 20,
    marginTop: 8,
    marginBottom: 8
  }
}));
const ErrorDisplay = styled.pre({
  width: 420,
  boxSizing: 'border-box',
  borderRadius: 8,
  overflow: 'auto',
  whiteSpace: 'pre'
}, ({
  theme
}) => ({
  color: theme.color.dark
}));
const ErrorName = styled.strong(({
  theme
}) => ({
  color: theme.color.orange
}));
const ErrorImportant = styled.strong(({
  theme
}) => ({
  color: theme.color.ancillary,
  textDecoration: 'underline'
}));
const ErrorDetail = styled.em(({
  theme
}) => ({
  color: theme.color.mediumdark
}));
const firstLineRegex = /(Error): (.*)\n/;
const linesRegex = /at (?:(.*) )?\(?(.+)\)?/;

const ErrorFormatter = ({
  error
}) => {
  if (!error) {
    return /*#__PURE__*/React.createElement(Fragment, null, "This error has no stack or message");
  }

  if (!error.stack) {
    return /*#__PURE__*/React.createElement(Fragment, null, error.message || 'This error has no stack or message');
  }

  const input = error.stack.toString();
  const match = input.match(firstLineRegex);

  if (!match) {
    return /*#__PURE__*/React.createElement(Fragment, null, input);
  }

  const [, type, name] = match;
  const rawLines = input.split(/\n/).slice(1);
  const [, ...lines] = rawLines.map(line => {
    const r = line.match(linesRegex);
    return r ? {
      name: r[1],
      location: r[2].replace(document.location.origin, '')
    } : null;
  }).filter(Boolean);
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("span", null, type), ": ", /*#__PURE__*/React.createElement(ErrorName, null, name), /*#__PURE__*/React.createElement("br", null), lines.map((l, i) => l.name ?
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  React.createElement(Fragment, {
    key: i
  }, '  ', "at ", /*#__PURE__*/React.createElement(ErrorImportant, null, l.name), " (", /*#__PURE__*/React.createElement(ErrorDetail, null, l.location), ")", /*#__PURE__*/React.createElement("br", null)) :
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  React.createElement(Fragment, {
    key: i
  }, '  ', "at ", /*#__PURE__*/React.createElement(ErrorDetail, null, l.location), /*#__PURE__*/React.createElement("br", null))));
};

ErrorFormatter.displayName = "ErrorFormatter";
export const AuthBlock = ({
  loginUrl,
  id
}) => {
  const [isAuthAttempted, setAuthAttempted] = useState(false);
  const refresh = useCallback(() => {
    globalWindow.document.location.reload();
  }, []);
  const open = useCallback(e => {
    e.preventDefault();
    const childWindow = globalWindow.open(loginUrl, `storybook_auth_${id}`, 'resizable,scrollbars'); // poll for window to close

    const timer = setInterval(() => {
      if (!childWindow) {
        logger.error('unable to access loginUrl window');
        clearInterval(timer);
      } else if (childWindow.closed) {
        clearInterval(timer);
        setAuthAttempted(true);
      }
    }, 1000);
  }, []);
  return /*#__PURE__*/React.createElement(Contained, null, /*#__PURE__*/React.createElement(Spaced, null, isAuthAttempted ? /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Text, null, "Authentication on ", /*#__PURE__*/React.createElement("strong", null, loginUrl), " concluded. Refresh the page to fetch this Storybook."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    small: true,
    gray: true,
    onClick: refresh
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "sync"
  }), "Refresh now"))) : /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Text, null, "Sign in to browse this Storybook."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    small: true,
    gray: true,
    onClick: open
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "lock"
  }), "Sign in")))));
};
AuthBlock.displayName = "AuthBlock";
export const ErrorBlock = ({
  error
}) => /*#__PURE__*/React.createElement(Contained, null, /*#__PURE__*/React.createElement(Spaced, null, /*#__PURE__*/React.createElement(TextStyle, null, "Oh no! Something went wrong loading this Storybook.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(WithTooltip, {
  trigger: "click",
  closeOnClick: false,
  tooltip: /*#__PURE__*/React.createElement(ErrorDisplay, null, /*#__PURE__*/React.createElement(ErrorFormatter, {
    error: error
  }))
}, /*#__PURE__*/React.createElement(Link, {
  isButton: true
}, "View error ", /*#__PURE__*/React.createElement(Icons, {
  icon: "arrowdown"
}))), ' ', /*#__PURE__*/React.createElement(Link, {
  withArrow: true,
  href: "https://storybook.js.org/docs",
  cancel: false,
  target: "_blank"
}, "View docs"))));
ErrorBlock.displayName = "ErrorBlock";
const FlexSpaced = styled(Spaced)({
  display: 'flex'
});
const WideSpaced = styled(Spaced)({
  flex: 1
});
export const EmptyBlock = ({
  isMain
}) => /*#__PURE__*/React.createElement(Contained, null, /*#__PURE__*/React.createElement(FlexSpaced, {
  col: 1
}, /*#__PURE__*/React.createElement(WideSpaced, null, /*#__PURE__*/React.createElement(Text, null, isMain ? /*#__PURE__*/React.createElement(React.Fragment, null, "Oh no! Your Storybook is empty. Possible reasons why:", /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "The glob specified in ", /*#__PURE__*/React.createElement("code", null, "main.js"), " isn't correct."), /*#__PURE__*/React.createElement("li", null, "No stories are defined in your story files.")), ' ') : /*#__PURE__*/React.createElement(React.Fragment, null, "Yikes! Something went wrong loading these stories.")))));
EmptyBlock.displayName = "EmptyBlock";
export const LoaderBlock = ({
  isMain
}) => /*#__PURE__*/React.createElement(Contained, null, /*#__PURE__*/React.createElement(Loader, {
  size: isMain ? 17 : 5
}));
LoaderBlock.displayName = "LoaderBlock";