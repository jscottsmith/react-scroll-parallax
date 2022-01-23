function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import global from 'global';
import React, { useMemo, useCallback, forwardRef } from 'react';
import { Icons, WithTooltip, Spaced, TooltipLinkList } from '@storybook/components';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { useStorybookApi } from '@storybook/api';
import { MenuItemIcon } from './Menu';
const {
  document,
  window: globalWindow
} = global;
const IndicatorPlacement = styled.aside(({
  theme
}) => ({
  height: 16,
  display: 'flex',
  alignItems: 'center',
  '& > * + *': {
    marginLeft: theme.layoutMargin
  }
}));
const IndicatorClickTarget = styled.button(({
  theme
}) => ({
  height: 20,
  width: 20,
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  outline: 'none',
  border: '1px solid transparent',
  borderRadius: '100%',
  cursor: 'pointer',
  color: theme.base === 'light' ? transparentize(0.3, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText),
  '&:hover': {
    color: theme.barSelectedColor
  },
  '&:focus': {
    color: theme.barSelectedColor,
    borderColor: theme.color.secondary
  },
  svg: {
    height: 10,
    width: 10,
    transition: 'all 150ms ease-out',
    color: 'inherit'
  }
}));
const MessageTitle = styled.span(({
  theme
}) => ({
  fontWeight: theme.typography.weight.bold
}));
const Message = styled.a(({
  theme
}) => ({
  textDecoration: 'none',
  lineHeight: '16px',
  padding: 15,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  color: theme.color.defaultText,
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.appBorderColor}`
  },
  '&:hover': {
    background: theme.background.hoverable,
    color: theme.color.darker
  },
  '&:link': {
    color: theme.color.darker
  },
  '&:active': {
    color: theme.color.darker
  },
  '&:focus': {
    color: theme.color.darker
  },
  '& > *': {
    flex: 1
  },
  '& > svg': {
    marginTop: 3,
    width: 16,
    height: 16,
    marginRight: 10,
    flex: 'unset'
  }
}));
export const MessageWrapper = styled.div({
  width: 280,
  boxSizing: 'border-box',
  borderRadius: 8,
  overflow: 'hidden'
});
const BlueIcon = styled(Icons)(({
  theme
}) => ({
  color: theme.color.secondary
}));
const YellowIcon = styled(Icons)(({
  theme
}) => ({
  color: theme.color.gold
}));
const RedIcon = styled(Icons)(({
  theme
}) => ({
  color: theme.color.negative
}));
const GreenIcon = styled(Icons)(({
  theme
}) => ({
  color: theme.color.green
}));
const Version = styled.div(({
  theme
}) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: theme.typography.size.s1,
  fontWeight: theme.typography.weight.regular,
  color: theme.base === 'light' ? transparentize(0.3, theme.color.defaultText) : transparentize(0.6, theme.color.defaultText),
  '& > * + *': {
    marginLeft: 4
  },
  svg: {
    height: 10,
    width: 10
  }
}));

const CurrentVersion = ({
  url,
  versions
}) => {
  const currentVersionId = useMemo(() => {
    const c = Object.entries(versions).find(([k, v]) => v === url);
    return c && c[0] ? c[0] : 'current';
  }, [url, versions]);
  return /*#__PURE__*/React.createElement(Version, null, /*#__PURE__*/React.createElement("span", null, currentVersionId), /*#__PURE__*/React.createElement(Icons, {
    icon: "chevrondown"
  }));
};

CurrentVersion.displayName = "CurrentVersion";
export const RefIndicator = /*#__PURE__*/React.memo( /*#__PURE__*/forwardRef((_ref, forwardedRef) => {
  let {
    state
  } = _ref,
      ref = _objectWithoutPropertiesLoose(_ref, ["state"]);

  const api = useStorybookApi();
  const list = useMemo(() => Object.values(ref.stories || {}), [ref.stories]);
  const componentCount = useMemo(() => list.filter(v => v.isComponent).length, [list]);
  const leafCount = useMemo(() => list.filter(v => v.isLeaf).length, [list]);
  const changeVersion = useCallback((event, item) => {
    event.preventDefault();
    api.changeRefVersion(ref.id, item.href);
  }, []);
  return /*#__PURE__*/React.createElement(IndicatorPlacement, {
    ref: forwardedRef
  }, /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "bottom-start",
    trigger: "click",
    tooltip: /*#__PURE__*/React.createElement(MessageWrapper, null, /*#__PURE__*/React.createElement(Spaced, {
      row: 0
    }, state === 'loading' && /*#__PURE__*/React.createElement(LoadingMessage, {
      url: ref.url
    }), (state === 'error' || state === 'empty') && /*#__PURE__*/React.createElement(ErrorOccurredMessage, {
      url: ref.url
    }), state === 'ready' && /*#__PURE__*/React.createElement(ReadyMessage, {
      url: ref.url,
      componentCount,
      leafCount
    }), state === 'auth' && /*#__PURE__*/React.createElement(LoginRequiredMessage, ref), ref.type === 'auto-inject' && state !== 'error' && /*#__PURE__*/React.createElement(PerformanceDegradedMessage, null), state !== 'loading' && /*#__PURE__*/React.createElement(ReadDocsMessage, null)))
  }, /*#__PURE__*/React.createElement(IndicatorClickTarget, {
    "data-action": "toggle-indicator",
    "aria-label": "toggle indicator"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "globe"
  }))), ref.versions && Object.keys(ref.versions).length ? /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "bottom-start",
    trigger: "click",
    tooltip: /*#__PURE__*/React.createElement(TooltipLinkList, {
      links: Object.entries(ref.versions).map(([id, href]) => ({
        left: href === ref.url ? /*#__PURE__*/React.createElement(MenuItemIcon, {
          icon: "check"
        }) : /*#__PURE__*/React.createElement("span", null),
        id,
        title: id,
        href,
        onClick: changeVersion
      }))
    })
  }, /*#__PURE__*/React.createElement(CurrentVersion, {
    url: ref.url,
    versions: ref.versions
  })) : null);
}));

const ReadyMessage = ({
  url,
  componentCount,
  leafCount
}) => /*#__PURE__*/React.createElement(Message, {
  href: url.replace(/\/?$/, '/index.html'),
  target: "_blank"
}, /*#__PURE__*/React.createElement(BlueIcon, {
  icon: "globe"
}), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "View external Storybook"), /*#__PURE__*/React.createElement("div", null, "Explore ", componentCount, " components and ", leafCount, " stories in a new browser tab.")));

ReadyMessage.displayName = "ReadyMessage";

const LoginRequiredMessage = ({
  loginUrl,
  id
}) => {
  const open = useCallback(e => {
    e.preventDefault();
    const childWindow = globalWindow.open(loginUrl, `storybook_auth_${id}`, 'resizable,scrollbars'); // poll for window to close

    const timer = setInterval(() => {
      if (!childWindow) {
        clearInterval(timer);
      } else if (childWindow.closed) {
        clearInterval(timer);
        document.location.reload();
      }
    }, 1000);
  }, []);
  return /*#__PURE__*/React.createElement(Message, {
    onClick: open
  }, /*#__PURE__*/React.createElement(YellowIcon, {
    icon: "lock"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Log in required"), /*#__PURE__*/React.createElement("div", null, "You need to authenticate to view this Storybook's components.")));
};

LoginRequiredMessage.displayName = "LoginRequiredMessage";

const ReadDocsMessage = () => /*#__PURE__*/React.createElement(Message, {
  href: "https://storybook.js.org",
  target: "_blank"
}, /*#__PURE__*/React.createElement(GreenIcon, {
  icon: "document"
}), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Read Composition docs"), /*#__PURE__*/React.createElement("div", null, "Learn how to combine multiple Storybooks into one.")));

ReadDocsMessage.displayName = "ReadDocsMessage";

const ErrorOccurredMessage = ({
  url
}) => /*#__PURE__*/React.createElement(Message, {
  href: url.replace(/\/?$/, '/index.html'),
  target: "_blank"
}, /*#__PURE__*/React.createElement(RedIcon, {
  icon: "alert"
}), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Something went wrong"), /*#__PURE__*/React.createElement("div", null, "This external Storybook didn't load. Debug it in a new tab now.")));

ErrorOccurredMessage.displayName = "ErrorOccurredMessage";

const LoadingMessage = ({
  url
}) => /*#__PURE__*/React.createElement(Message, {
  href: url.replace(/\/?$/, '/index.html'),
  target: "_blank"
}, /*#__PURE__*/React.createElement(BlueIcon, {
  icon: "time"
}), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Please wait"), /*#__PURE__*/React.createElement("div", null, "This Storybook is loading.")));

LoadingMessage.displayName = "LoadingMessage";

const PerformanceDegradedMessage = () => /*#__PURE__*/React.createElement(Message, {
  href: "https://storybook.js.org/docs",
  target: "_blank"
}, /*#__PURE__*/React.createElement(YellowIcon, {
  icon: "lightning"
}), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MessageTitle, null, "Reduce lag"), /*#__PURE__*/React.createElement("div", null, "Learn how to speed up Composition performance.")));

PerformanceDegradedMessage.displayName = "PerformanceDegradedMessage";