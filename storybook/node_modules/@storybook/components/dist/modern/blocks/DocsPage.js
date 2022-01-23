import React from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { withReset } from '../typography/shared';
const breakpoint = 600;
export const Title = styled.h1(withReset, ({
  theme
}) => ({
  color: theme.color.defaultText,
  fontSize: theme.typography.size.m3,
  fontWeight: theme.typography.weight.black,
  lineHeight: '32px',
  [`@media (min-width: ${breakpoint}px)`]: {
    fontSize: theme.typography.size.l1,
    lineHeight: '36px',
    marginBottom: '.5rem' // 8px

  }
}));
export const Subtitle = styled.h2(withReset, ({
  theme
}) => ({
  fontWeight: theme.typography.weight.regular,
  fontSize: theme.typography.size.s3,
  lineHeight: '20px',
  borderBottom: 'none',
  marginBottom: 15,
  [`@media (min-width: ${breakpoint}px)`]: {
    fontSize: theme.typography.size.m1,
    lineHeight: '28px',
    marginBottom: 24
  },
  color: transparentize(0.25, theme.color.defaultText)
}));
export const DocsContent = styled.div({
  maxWidth: 1000,
  width: '100%'
});
export const DocsWrapper = styled.div(({
  theme
}) => ({
  background: theme.background.content,
  display: 'flex',
  justifyContent: 'center',
  padding: '4rem 20px',
  minHeight: '100vh',
  boxSizing: 'border-box',
  [`@media (min-width: ${breakpoint}px)`]: {}
}));
export const DocsPageWrapper = ({
  children
}) => /*#__PURE__*/React.createElement(DocsWrapper, null, /*#__PURE__*/React.createElement(DocsContent, null, children));
DocsPageWrapper.displayName = "DocsPageWrapper";