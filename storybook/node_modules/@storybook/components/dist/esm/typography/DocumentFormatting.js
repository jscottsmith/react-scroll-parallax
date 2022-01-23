import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import { withReset, withMargin, headerCommon, codeCommon } from './shared';
import { StyledSyntaxHighlighter } from '../blocks/Source';
export var H1 = styled.h1(withReset, headerCommon, function (_ref) {
  var theme = _ref.theme;
  return {
    fontSize: "".concat(theme.typography.size.l1, "px"),
    fontWeight: theme.typography.weight.black
  };
});
export var H2 = styled.h2(withReset, headerCommon, function (_ref2) {
  var theme = _ref2.theme;
  return {
    fontSize: "".concat(theme.typography.size.m2, "px"),
    paddingBottom: 4,
    borderBottom: "1px solid ".concat(theme.appBorderColor)
  };
});
export var H3 = styled.h3(withReset, headerCommon, function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontSize: "".concat(theme.typography.size.m1, "px")
  };
});
export var H4 = styled.h4(withReset, headerCommon, function (_ref4) {
  var theme = _ref4.theme;
  return {
    fontSize: "".concat(theme.typography.size.s3, "px")
  };
});
export var H5 = styled.h5(withReset, headerCommon, function (_ref5) {
  var theme = _ref5.theme;
  return {
    fontSize: "".concat(theme.typography.size.s2, "px")
  };
});
export var H6 = styled.h6(withReset, headerCommon, function (_ref6) {
  var theme = _ref6.theme;
  return {
    fontSize: "".concat(theme.typography.size.s2, "px"),
    color: theme.color.dark
  };
});
export var Pre = styled.pre(withReset, withMargin, function (_ref7) {
  var theme = _ref7.theme;
  return {
    // reset
    fontFamily: theme.typography.fonts.mono,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    lineHeight: '18px',
    padding: '11px 1rem',
    whiteSpace: 'pre-wrap',
    color: 'inherit',
    borderRadius: 3,
    margin: '1rem 0',
    '&:not(.prismjs)': {
      background: 'transparent',
      border: 'none',
      borderRadius: 0,
      padding: 0,
      margin: 0
    },
    '& pre, &.prismjs': {
      padding: 15,
      margin: 0,
      whiteSpace: 'pre-wrap',
      color: 'inherit',
      fontSize: '13px',
      lineHeight: '19px',
      code: {
        color: 'inherit',
        fontSize: 'inherit'
      }
    },
    '& code': {
      whiteSpace: 'pre'
    },
    '& code, & tt': {
      border: 'none'
    }
  };
});

var Link = function Link(_ref8) {
  var input = _ref8.href,
      children = _ref8.children,
      props = _objectWithoutProperties(_ref8, ["href", "children"]);

  var isStorybookPath = /^\//.test(input);
  var isAnchorUrl = /^#.*/.test(input);
  var href = isStorybookPath ? "?path=".concat(input) : input;
  var target = isAnchorUrl ? '_self' : '_top';
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: target
  }, props), children);
};

Link.displayName = "Link";
export var A = styled(Link)(withReset, function (_ref9) {
  var theme = _ref9.theme;
  return {
    fontSize: 'inherit',
    lineHeight: '24px',
    color: theme.color.secondary,
    textDecoration: 'none',
    '&.absent': {
      color: '#cc0000'
    },
    '&.anchor': {
      display: 'block',
      paddingLeft: 30,
      marginLeft: -30,
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0
    }
  };
});
export var HR = styled.hr(function (_ref10) {
  var theme = _ref10.theme;
  return {
    border: '0 none',
    borderTop: "1px solid ".concat(theme.appBorderColor),
    height: 4,
    padding: 0
  };
});
export var DL = styled.dl(withReset, Object.assign({}, withMargin, {
  padding: 0,
  '& dt': {
    fontSize: '14px',
    fontWeight: 'bold',
    fontStyle: 'italic',
    padding: 0,
    margin: '16px 0 4px'
  },
  '& dt:first-of-type': {
    padding: 0
  },
  '& dt > :first-of-type': {
    marginTop: 0
  },
  '& dt > :last-child': {
    marginBottom: 0
  },
  '& dd': {
    margin: '0 0 16px',
    padding: '0 15px'
  },
  '& dd > :first-of-type': {
    marginTop: 0
  },
  '& dd > :last-child': {
    marginBottom: 0
  }
}));
export var Blockquote = styled.blockquote(withReset, withMargin, function (_ref11) {
  var theme = _ref11.theme;
  return {
    borderLeft: "4px solid ".concat(theme.color.medium),
    padding: '0 15px',
    color: theme.color.dark,
    '& > :first-of-type': {
      marginTop: 0
    },
    '& > :last-child': {
      marginBottom: 0
    }
  };
});
export var Table = styled.table(withReset, withMargin, function (_ref12) {
  var theme = _ref12.theme;
  return {
    fontSize: theme.typography.size.s2,
    lineHeight: '24px',
    padding: 0,
    borderCollapse: 'collapse',
    '& tr': {
      borderTop: "1px solid ".concat(theme.appBorderColor),
      backgroundColor: theme.appContentBg,
      margin: 0,
      padding: 0
    },
    '& tr:nth-of-type(2n)': {
      backgroundColor: theme.base === 'dark' ? theme.color.darker : theme.color.lighter
    },
    '& tr th': {
      fontWeight: 'bold',
      color: theme.color.defaultText,
      border: "1px solid ".concat(theme.appBorderColor),
      margin: 0,
      padding: '6px 13px'
    },
    '& tr td': {
      border: "1px solid ".concat(theme.appBorderColor),
      color: theme.color.defaultText,
      margin: 0,
      padding: '6px 13px'
    },
    '& tr th :first-of-type, & tr td :first-of-type': {
      marginTop: 0
    },
    '& tr th :last-child, & tr td :last-child': {
      marginBottom: 0
    }
  };
});
export var Img = styled.img({
  maxWidth: '100%'
});
export var Div = styled.div(withReset);
export var Span = styled.span(withReset, function (_ref13) {
  var theme = _ref13.theme;
  return {
    '&.frame': {
      display: 'block',
      overflow: 'hidden',
      '& > span': {
        border: "1px solid ".concat(theme.color.medium),
        display: 'block',
        float: 'left',
        overflow: 'hidden',
        margin: '13px 0 0',
        padding: 7,
        width: 'auto'
      },
      '& span img': {
        display: 'block',
        float: 'left'
      },
      '& span span': {
        clear: 'both',
        color: theme.color.darkest,
        display: 'block',
        padding: '5px 0 0'
      }
    },
    '&.align-center': {
      display: 'block',
      overflow: 'hidden',
      clear: 'both',
      '& > span': {
        display: 'block',
        overflow: 'hidden',
        margin: '13px auto 0',
        textAlign: 'center'
      },
      '& span img': {
        margin: '0 auto',
        textAlign: 'center'
      }
    },
    '&.align-right': {
      display: 'block',
      overflow: 'hidden',
      clear: 'both',
      '& > span': {
        display: 'block',
        overflow: 'hidden',
        margin: '13px 0 0',
        textAlign: 'right'
      },
      '& span img': {
        margin: 0,
        textAlign: 'right'
      }
    },
    '&.float-left': {
      display: 'block',
      marginRight: 13,
      overflow: 'hidden',
      float: 'left',
      '& span': {
        margin: '13px 0 0'
      }
    },
    '&.float-right': {
      display: 'block',
      marginLeft: 13,
      overflow: 'hidden',
      float: 'right',
      '& > span': {
        display: 'block',
        overflow: 'hidden',
        margin: '13px auto 0',
        textAlign: 'right'
      }
    }
  };
});
var listCommon = {
  paddingLeft: 30,
  '& :first-of-type': {
    marginTop: 0
  },
  '& :last-child': {
    marginBottom: 0
  }
};
export var LI = styled.li(withReset, function (_ref14) {
  var theme = _ref14.theme;
  return {
    fontSize: theme.typography.size.s2,
    color: theme.color.defaultText,
    lineHeight: '24px',
    '& + li': {
      marginTop: '.25em'
    },
    '& ul, & ol': {
      marginTop: '.25em',
      marginBottom: 0
    },
    '& code': codeCommon({
      theme: theme
    })
  };
});
export var UL = styled.ul(withReset, withMargin, Object.assign({}, listCommon, {
  listStyle: 'disc'
}));
export var OL = styled.ol(withReset, withMargin, Object.assign({}, listCommon, {
  listStyle: 'decimal'
}));
export var P = styled.p(withReset, withMargin, function (_ref15) {
  var theme = _ref15.theme;
  return {
    fontSize: theme.typography.size.s2,
    lineHeight: '24px',
    color: theme.color.defaultText,
    '& code': codeCommon({
      theme: theme
    })
  };
});
var DefaultCodeBlock = styled.code(function (_ref16) {
  var theme = _ref16.theme;
  return {
    // from reset
    fontFamily: theme.typography.fonts.mono,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    display: 'inline-block',
    paddingLeft: 2,
    paddingRight: 2,
    verticalAlign: 'baseline',
    color: 'inherit'
  };
}, codeCommon);
var isInlineCodeRegex = /[\n\r]/g;

var isReactChildString = function isReactChildString(child) {
  return typeof child === 'string';
};

export var Code = function Code(_ref17) {
  var _language$;

  var className = _ref17.className,
      children = _ref17.children,
      props = _objectWithoutProperties(_ref17, ["className", "children"]);

  var language = (className || '').match(/lang-(\S+)/);
  var childrenArray = React.Children.toArray(children);
  var isInlineCode = !childrenArray.filter(isReactChildString).some(function (child) {
    return child.match(isInlineCodeRegex);
  });

  if (isInlineCode) {
    return /*#__PURE__*/React.createElement(DefaultCodeBlock, _extends({}, props, {
      className: className
    }), childrenArray);
  }

  return /*#__PURE__*/React.createElement(StyledSyntaxHighlighter, _extends({
    bordered: true,
    copyable: true,
    language: (_language$ = language === null || language === void 0 ? void 0 : language[1]) !== null && _language$ !== void 0 ? _language$ : 'plaintext',
    format: false
  }, props), children);
};
Code.displayName = "Code";
export var TT = styled.title(codeCommon);
/**
 * This is a "local" reset to style subtrees with Storybook styles
 *
 * We can't style individual elements (e.g. h1, h2, etc.) in here
 * because the CSS specificity is too high, so those styles can too
 * easily override child elements that are not expecting it.
 */

export var ResetWrapper = styled.div(withReset);

var nameSpaceClassNames = function nameSpaceClassNames(_ref18, key) {
  var props = Object.assign({}, _ref18);
  var classes = [props.class, props.className]; // eslint-disable-next-line no-param-reassign

  delete props.class; // eslint-disable-next-line no-param-reassign

  props.className = ['sbdocs', "sbdocs-".concat(key)].concat(classes).filter(Boolean).join(' ');
  return props;
};

export var components = {
  h1: function (props) {
    return /*#__PURE__*/React.createElement(H1, nameSpaceClassNames(props, 'h1'));
  },
  h2: function (props) {
    return /*#__PURE__*/React.createElement(H2, nameSpaceClassNames(props, 'h2'));
  },
  h3: function (props) {
    return /*#__PURE__*/React.createElement(H3, nameSpaceClassNames(props, 'h3'));
  },
  h4: function (props) {
    return /*#__PURE__*/React.createElement(H4, nameSpaceClassNames(props, 'h4'));
  },
  h5: function (props) {
    return /*#__PURE__*/React.createElement(H5, nameSpaceClassNames(props, 'h5'));
  },
  h6: function (props) {
    return /*#__PURE__*/React.createElement(H6, nameSpaceClassNames(props, 'h6'));
  },
  pre: function (props) {
    return /*#__PURE__*/React.createElement(Pre, nameSpaceClassNames(props, 'pre'));
  },
  a: function (props) {
    return /*#__PURE__*/React.createElement(A, nameSpaceClassNames(props, 'a'));
  },
  hr: function (props) {
    return /*#__PURE__*/React.createElement(HR, nameSpaceClassNames(props, 'hr'));
  },
  dl: function (props) {
    return /*#__PURE__*/React.createElement(DL, nameSpaceClassNames(props, 'dl'));
  },
  blockquote: function (props) {
    return /*#__PURE__*/React.createElement(Blockquote, nameSpaceClassNames(props, 'blockquote'));
  },
  table: function (props) {
    return /*#__PURE__*/React.createElement(Table, nameSpaceClassNames(props, 'table'));
  },
  img: function (props) {
    return /*#__PURE__*/React.createElement(Img, nameSpaceClassNames(props, 'img'));
  },
  div: function (props) {
    return /*#__PURE__*/React.createElement(Div, nameSpaceClassNames(props, 'div'));
  },
  span: function (props) {
    return /*#__PURE__*/React.createElement(Span, nameSpaceClassNames(props, 'span'));
  },
  li: function (props) {
    return /*#__PURE__*/React.createElement(LI, nameSpaceClassNames(props, 'li'));
  },
  ul: function (props) {
    return /*#__PURE__*/React.createElement(UL, nameSpaceClassNames(props, 'ul'));
  },
  ol: function (props) {
    return /*#__PURE__*/React.createElement(OL, nameSpaceClassNames(props, 'ol'));
  },
  p: function (props) {
    return /*#__PURE__*/React.createElement(P, nameSpaceClassNames(props, 'p'));
  },
  code: function (props) {
    return /*#__PURE__*/React.createElement(Code, nameSpaceClassNames(props, 'code'));
  },
  tt: function (props) {
    return /*#__PURE__*/React.createElement(TT, nameSpaceClassNames(props, 'tt'));
  },
  resetwrapper: function (props) {
    return /*#__PURE__*/React.createElement(ResetWrapper, nameSpaceClassNames(props, 'resetwrapper'));
  }
};