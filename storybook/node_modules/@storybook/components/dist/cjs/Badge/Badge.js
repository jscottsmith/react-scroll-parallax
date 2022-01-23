"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = void 0;

require("core-js/modules/es.string.bold.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BadgeWrapper = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'inline-block',
    fontSize: 11,
    lineHeight: '12px',
    alignSelf: 'center',
    padding: '4px 12px',
    borderRadius: '3em',
    fontWeight: theme.typography.weight.bold
  };
}, {
  svg: {
    height: 12,
    width: 12,
    marginRight: 4,
    marginTop: -2,
    path: {
      fill: 'currentColor'
    }
  }
}, function (_ref2) {
  var theme = _ref2.theme,
      status = _ref2.status;

  switch (status) {
    case 'critical':
      {
        return {
          color: theme.color.critical,
          background: theme.background.critical
        };
      }

    case 'negative':
      {
        return {
          color: theme.color.negative,
          background: theme.background.negative
        };
      }

    case 'warning':
      {
        return {
          color: theme.color.warning,
          background: theme.background.warning
        };
      }

    case 'neutral':
      {
        return {
          color: theme.color.dark,
          background: theme.color.mediumlight
        };
      }

    case 'positive':
      {
        return {
          color: theme.color.positive,
          background: theme.background.positive
        };
      }

    default:
      {
        return {};
      }
  }
});

var Badge = function Badge(_ref3) {
  var props = Object.assign({}, _ref3);
  return /*#__PURE__*/_react.default.createElement(BadgeWrapper, props);
};

exports.Badge = Badge;
Badge.displayName = "Badge";