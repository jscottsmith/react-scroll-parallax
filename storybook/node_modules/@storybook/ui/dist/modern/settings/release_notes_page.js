import { useStorybookApi } from '@storybook/api';
import React, { useEffect } from 'react';
import { ReleaseNotesScreen } from './release_notes';

const ReleaseNotesPage = () => {
  const api = useStorybookApi();
  useEffect(() => {
    api.setDidViewReleaseNotes();
  }, []);
  const version = api.releaseNotesVersion();
  return /*#__PURE__*/React.createElement(ReleaseNotesScreen, {
    version: version
  });
};

ReleaseNotesPage.displayName = "ReleaseNotesPage";
export { ReleaseNotesPage };