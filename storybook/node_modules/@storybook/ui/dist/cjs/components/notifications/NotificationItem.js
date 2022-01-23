"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NotificationItemSpacer = void 0;

require("core-js/modules/es.string.bold.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.link.js");

var _react = _interopRequireDefault(require("react"));

var _router = require("@storybook/router");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _polished = require("polished");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_ICON_COLOUR = '#66BF3C';

var Notification = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    position: 'relative',
    display: 'flex',
    padding: 15,
    width: 280,
    borderRadius: 4,
    alignItems: 'center',
    background: theme.base === 'light' ? 'rgba(50,53,71,0.97)' : 'linear-gradient(0deg, rgba(248,248,248,0.97) 0%, rgba(247,252,255,0.97) 100%)',
    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)",
    color: theme.color.inverseText,
    textDecoration: 'none'
  };
});

var NotificationWithInteractiveStates = (0, _theming.styled)(Notification)(function () {
  return {
    transition: 'all 150ms ease-out',
    transform: 'translate3d(0, 0, 0)',
    '&:hover': {
      transform: 'translate3d(0, -3px, 0)',
      boxShadow: '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)'
    },
    '&:active': {
      transform: 'translate3d(0, 0, 0)',
      boxShadow: '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)'
    },
    '&:focus': {
      boxShadow: '0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)'
    }
  };
});
var NotificationLink = NotificationWithInteractiveStates.withComponent(_router.Link, {
  target: "e1poa7z40",
  label: "NotificationLink"
});

var NotificationIconWrapper = _theming.styled.div(function () {
  return {
    display: 'flex',
    marginRight: 10,
    alignItems: 'center'
  };
});

var NotificationTextWrapper = _theming.styled.div(function () {
  return {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  };
});

var Headline = _theming.styled.div(function (_ref2) {
  var theme = _ref2.theme,
      hasIcon = _ref2.hasIcon;
  return {
    height: '100%',
    width: hasIcon ? 205 : 230,
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: theme.typography.size.s1,
    lineHeight: '16px',
    fontWeight: theme.typography.weight.bold
  };
});

var SubHeadline = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    color: (0, _polished.transparentize)(0.25, theme.color.inverseText),
    fontSize: theme.typography.size.s1 - 1,
    lineHeight: '14px',
    marginTop: 2
  };
});

var ItemContent = function ItemContent(_ref4) {
  var icon = _ref4.icon,
      _ref4$content = _ref4.content,
      headline = _ref4$content.headline,
      subHeadline = _ref4$content.subHeadline;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !icon || /*#__PURE__*/_react.default.createElement(NotificationIconWrapper, null, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: icon.name,
    width: 16,
    color: icon.color || DEFAULT_ICON_COLOUR
  })), /*#__PURE__*/_react.default.createElement(NotificationTextWrapper, null, /*#__PURE__*/_react.default.createElement(Headline, {
    title: headline,
    hasIcon: !!icon
  }, headline), subHeadline && /*#__PURE__*/_react.default.createElement(SubHeadline, null, subHeadline)));
};

var DismissButtonWrapper = (0, _theming.styled)(_components.IconButton)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    alignSelf: 'center',
    marginTop: 0,
    color: theme.base === 'light' ? 'rgba(255,255,255,0.7)' : ' #999999'
  };
});

var DismissNotificationItem = function DismissNotificationItem(_ref6) {
  var onDismiss = _ref6.onDismiss;
  return /*#__PURE__*/_react.default.createElement(DismissButtonWrapper, {
    title: "Dismiss notification",
    onClick: function onClick(e) {
      e.preventDefault();
      onDismiss();
    }
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "closeAlt",
    height: 12,
    width: 12
  }));
};

DismissNotificationItem.displayName = "DismissNotificationItem";

var NotificationItemSpacer = _theming.styled.div({
  height: 48
});

exports.NotificationItemSpacer = NotificationItemSpacer;

var NotificationItem = function NotificationItem(_ref7) {
  var _ref7$notification = _ref7.notification,
      content = _ref7$notification.content,
      link = _ref7$notification.link,
      onClear = _ref7$notification.onClear,
      id = _ref7$notification.id,
      icon = _ref7$notification.icon,
      onDismissNotification = _ref7.onDismissNotification;

  var dismissNotificationItem = function dismissNotificationItem() {
    onDismissNotification(id);
    onClear();
  };

  return link ? /*#__PURE__*/_react.default.createElement(NotificationLink, {
    to: link
  }, /*#__PURE__*/_react.default.createElement(ItemContent, {
    icon: icon,
    content: content
  }), /*#__PURE__*/_react.default.createElement(DismissNotificationItem, {
    onDismiss: dismissNotificationItem
  })) : /*#__PURE__*/_react.default.createElement(Notification, null, /*#__PURE__*/_react.default.createElement(ItemContent, {
    icon: icon,
    content: content
  }), /*#__PURE__*/_react.default.createElement(DismissNotificationItem, {
    onDismiss: dismissNotificationItem
  }));
};

var _default = NotificationItem;
exports.default = _default;