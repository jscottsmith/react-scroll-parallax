function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useState, Fragment } from 'react';
import { styled } from '@storybook/theming';
import { Icons, Loader } from '@storybook/components';
const Centered = styled.div({
  top: '50%',
  position: 'absolute',
  transform: 'translateY(-50%)',
  width: '100%',
  textAlign: 'center'
});
const LoaderWrapper = styled.div({
  position: 'relative',
  height: '32px'
});
const Message = styled.div(({
  theme
}) => ({
  paddingTop: '12px',
  color: theme.color.mediumdark,
  maxWidth: '295px',
  margin: '0 auto',
  fontSize: `${theme.typography.size.s1}px`,
  lineHeight: `16px`
}));
const Iframe = styled.iframe({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  border: 0,
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%'
}, ({
  isLoaded
}) => ({
  visibility: isLoaded ? 'visible' : 'hidden'
}));
const AlertIcon = styled(props => /*#__PURE__*/React.createElement(Icons, _extends({
  icon: "alert"
}, props)))(({
  theme
}) => ({
  color: theme.color.mediumdark,
  width: 40,
  margin: '0 auto'
}));

const getIframeUrl = version => {
  const [major, minor] = version.split('.');
  return `https://storybook.js.org/releases/iframe/${major}.${minor}`;
};

const ReleaseNotesLoader = () => /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement(LoaderWrapper, null, /*#__PURE__*/React.createElement(Loader, null)), /*#__PURE__*/React.createElement(Message, null, "Loading release notes"));

ReleaseNotesLoader.displayName = "ReleaseNotesLoader";

const MaxWaitTimeMessaging = () => /*#__PURE__*/React.createElement(Centered, null, /*#__PURE__*/React.createElement(AlertIcon, null), /*#__PURE__*/React.createElement(Message, null, "The release notes couldn't be loaded. Check your internet connection and try again."));

MaxWaitTimeMessaging.displayName = "MaxWaitTimeMessaging";

const PureReleaseNotesScreen = ({
  didHitMaxWaitTime,
  isLoaded,
  setLoaded,
  version
}) => /*#__PURE__*/React.createElement(Fragment, null, !isLoaded && !didHitMaxWaitTime && /*#__PURE__*/React.createElement(ReleaseNotesLoader, null), didHitMaxWaitTime ? /*#__PURE__*/React.createElement(MaxWaitTimeMessaging, null) : /*#__PURE__*/React.createElement(Iframe, {
  isLoaded: isLoaded,
  onLoad: () => setLoaded(true),
  src: getIframeUrl(version),
  title: `Release notes for Storybook version ${version}`
}));

PureReleaseNotesScreen.displayName = "PureReleaseNotesScreen";
const MAX_WAIT_TIME = 10000; // 10 seconds

const ReleaseNotesScreen = ({
  version
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [didHitMaxWaitTime, setDidHitMaxWaitTime] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => !isLoaded && setDidHitMaxWaitTime(true), MAX_WAIT_TIME);
    return () => clearTimeout(timer);
  }, [isLoaded]);
  return /*#__PURE__*/React.createElement(PureReleaseNotesScreen, {
    didHitMaxWaitTime: didHitMaxWaitTime,
    isLoaded: isLoaded,
    setLoaded: setLoaded,
    version: version
  });
};

ReleaseNotesScreen.displayName = "ReleaseNotesScreen";
export { ReleaseNotesScreen, PureReleaseNotesScreen };