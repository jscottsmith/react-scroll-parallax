function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
import { withReset, withMargin, headerCommon, codeCommon } from './shared';
import { StyledSyntaxHighlighter } from '../blocks/Source';
export const H1 = styled.h1(withReset, headerCommon, ({
  theme
}) => ({
  fontSize: `${theme.typography.size.l1}px`,
  fontWeight: theme.typography.weight.black
}));
export const H2 = styled.h2(withReset, headerCommon, ({
  theme
}) => ({
  fontSize: `${theme.typography.size.m2}px`,
  paddingBottom: 4,
  borderBottom: `1px solid ${theme.appBorderColor}`
}));
export const H3 = styled.h3(withReset, headerCommon, ({
  theme
}) => ({
  fontSize: `${theme.typography.size.m1}px`
}));
export const H4 = styled.h4(withReset, headerCommon, ({
  theme
}) => ({
  fontSize: `${theme.typography.size.s3}px`
}));
export const H5 = styled.h5(withReset, headerCommon, ({
  theme
}) => ({
  fontSize: `${theme.typography.size.s2}px`
}));
export const H6 = styled.h6(withReset, headerCommon, ({
  theme
}) => ({
  fontSize: `${theme.typography.size.s2}px`,
  color: theme.color.dark
}));
export const Pre = styled.pre(withReset, withMargin, ({
  theme
}) => ({
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
}));

const Link = (_ref) => {
  let {
    href: input,
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["href", "children"]);

  const isStorybookPath = /^\//.test(input);
  const isAnchorUrl = /^#.*/.test(input);
  const href = isStorybookPath ? `?path=${input}` : input;
  const target = isAnchorUrl ? '_self' : '_top';
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: target
  }, props), children);
};

Link.displayName = "Link";
export const A = styled(Link)(withReset, ({
  theme
}) => ({
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
}));
export const HR = styled.hr(({
  theme
}) => ({
  border: '0 none',
  borderTop: `1px solid ${theme.appBorderColor}`,
  height: 4,
  padding: 0
}));
export const DL = styled.dl(withReset, Object.assign({}, withMargin, {
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
export const Blockquote = styled.blockquote(withReset, withMargin, ({
  theme
}) => ({
  borderLeft: `4px solid ${theme.color.medium}`,
  padding: '0 15px',
  color: theme.color.dark,
  '& > :first-of-type': {
    marginTop: 0
  },
  '& > :last-child': {
    marginBottom: 0
  }
}));
export const Table = styled.table(withReset, withMargin, ({
  theme
}) => ({
  fontSize: theme.typography.size.s2,
  lineHeight: '24px',
  padding: 0,
  borderCollapse: 'collapse',
  '& tr': {
    borderTop: `1px solid ${theme.appBorderColor}`,
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
    border: `1px solid ${theme.appBorderColor}`,
    margin: 0,
    padding: '6px 13px'
  },
  '& tr td': {
    border: `1px solid ${theme.appBorderColor}`,
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
}));
export const Img = styled.img({
  maxWidth: '100%'
});
export const Div = styled.div(withReset);
export const Span = styled.span(withReset, ({
  theme
}) => ({
  '&.frame': {
    display: 'block',
    overflow: 'hidden',
    '& > span': {
      border: `1px solid ${theme.color.medium}`,
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
}));
const listCommon = {
  paddingLeft: 30,
  '& :first-of-type': {
    marginTop: 0
  },
  '& :last-child': {
    marginBottom: 0
  }
};
export const LI = styled.li(withReset, ({
  theme
}) => ({
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
    theme
  })
}));
export const UL = styled.ul(withReset, withMargin, Object.assign({}, listCommon, {
  listStyle: 'disc'
}));
export const OL = styled.ol(withReset, withMargin, Object.assign({}, listCommon, {
  listStyle: 'decimal'
}));
export const P = styled.p(withReset, withMargin, ({
  theme
}) => ({
  fontSize: theme.typography.size.s2,
  lineHeight: '24px',
  color: theme.color.defaultText,
  '& code': codeCommon({
    theme
  })
}));
const DefaultCodeBlock = styled.code(({
  theme
}) => ({
  // from reset
  fontFamily: theme.typography.fonts.mono,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  display: 'inline-block',
  paddingLeft: 2,
  paddingRight: 2,
  verticalAlign: 'baseline',
  color: 'inherit'
}), codeCommon);
const isInlineCodeRegex = /[\n\r]/g;

const isReactChildString = child => typeof child === 'string';

export const Code = (_ref2) => {
  var _language$;

  let {
    className,
    children
  } = _ref2,
      props = _objectWithoutPropertiesLoose(_ref2, ["className", "children"]);

  const language = (className || '').match(/lang-(\S+)/);
  const childrenArray = React.Children.toArray(children);
  const isInlineCode = !childrenArray.filter(isReactChildString).some(child => child.match(isInlineCodeRegex));

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
export const TT = styled.title(codeCommon);
/**
 * This is a "local" reset to style subtrees with Storybook styles
 *
 * We can't style individual elements (e.g. h1, h2, etc.) in here
 * because the CSS specificity is too high, so those styles can too
 * easily override child elements that are not expecting it.
 */

export const ResetWrapper = styled.div(withReset);

const nameSpaceClassNames = (_ref3, key) => {
  let props = Object.assign({}, _ref3);
  const classes = [props.class, props.className]; // eslint-disable-next-line no-param-reassign

  delete props.class; // eslint-disable-next-line no-param-reassign

  props.className = ['sbdocs', `sbdocs-${key}`, ...classes].filter(Boolean).join(' ');
  return props;
};

export const components = {
  h1: props => /*#__PURE__*/React.createElement(H1, nameSpaceClassNames(props, 'h1')),
  h2: props => /*#__PURE__*/React.createElement(H2, nameSpaceClassNames(props, 'h2')),
  h3: props => /*#__PURE__*/React.createElement(H3, nameSpaceClassNames(props, 'h3')),
  h4: props => /*#__PURE__*/React.createElement(H4, nameSpaceClassNames(props, 'h4')),
  h5: props => /*#__PURE__*/React.createElement(H5, nameSpaceClassNames(props, 'h5')),
  h6: props => /*#__PURE__*/React.createElement(H6, nameSpaceClassNames(props, 'h6')),
  pre: props => /*#__PURE__*/React.createElement(Pre, nameSpaceClassNames(props, 'pre')),
  a: props => /*#__PURE__*/React.createElement(A, nameSpaceClassNames(props, 'a')),
  hr: props => /*#__PURE__*/React.createElement(HR, nameSpaceClassNames(props, 'hr')),
  dl: props => /*#__PURE__*/React.createElement(DL, nameSpaceClassNames(props, 'dl')),
  blockquote: props => /*#__PURE__*/React.createElement(Blockquote, nameSpaceClassNames(props, 'blockquote')),
  table: props => /*#__PURE__*/React.createElement(Table, nameSpaceClassNames(props, 'table')),
  img: props => /*#__PURE__*/React.createElement(Img, nameSpaceClassNames(props, 'img')),
  div: props => /*#__PURE__*/React.createElement(Div, nameSpaceClassNames(props, 'div')),
  span: props => /*#__PURE__*/React.createElement(Span, nameSpaceClassNames(props, 'span')),
  li: props => /*#__PURE__*/React.createElement(LI, nameSpaceClassNames(props, 'li')),
  ul: props => /*#__PURE__*/React.createElement(UL, nameSpaceClassNames(props, 'ul')),
  ol: props => /*#__PURE__*/React.createElement(OL, nameSpaceClassNames(props, 'ol')),
  p: props => /*#__PURE__*/React.createElement(P, nameSpaceClassNames(props, 'p')),
  code: props => /*#__PURE__*/React.createElement(Code, nameSpaceClassNames(props, 'code')),
  tt: props => /*#__PURE__*/React.createElement(TT, nameSpaceClassNames(props, 'tt')),
  resetwrapper: props => /*#__PURE__*/React.createElement(ResetWrapper, nameSpaceClassNames(props, 'resetwrapper'))
};