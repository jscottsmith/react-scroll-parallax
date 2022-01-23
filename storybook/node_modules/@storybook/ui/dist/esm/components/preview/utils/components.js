import { styled } from '@storybook/theming';
import { Link } from '@storybook/router';
export var FrameWrap = styled.div(function (_ref) {
  var offset = _ref.offset;
  return {
    position: 'absolute',
    overflow: 'auto',
    left: 0,
    right: 0,
    bottom: 0,
    top: offset,
    zIndex: 3,
    transition: 'all 0.1s linear',
    height: "calc(100% - ".concat(offset, "px)"),
    background: 'transparent'
  };
});
export var UnstyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'inherit',
  display: 'inline-block'
});
export var DesktopOnly = styled.span({
  // Hides full screen icon at mobile breakpoint defined in app.js
  '@media (max-width: 599px)': {
    display: 'none'
  }
});
export var IframeWrapper = styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    background: theme.background.content
  };
});
export var LoaderWrapper = styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: theme.background.content,
    zIndex: 1
  };
});