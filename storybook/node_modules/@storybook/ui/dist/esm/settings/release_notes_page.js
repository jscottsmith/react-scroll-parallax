import { useStorybookApi } from '@storybook/api';
import React, { useEffect } from 'react';
import { ReleaseNotesScreen } from './release_notes';

var ReleaseNotesPage = function ReleaseNotesPage() {
  var api = useStorybookApi();
  useEffect(function () {
    api.setDidViewReleaseNotes();
  }, []);
  var version = api.releaseNotesVersion();
  return /*#__PURE__*/React.createElement(ReleaseNotesScreen, {
    version: version
  });
};

ReleaseNotesPage.displayName = "ReleaseNotesPage";
export { ReleaseNotesPage };