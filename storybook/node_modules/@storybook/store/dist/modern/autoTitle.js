import startCase from 'lodash/startCase';
import path from 'path';
import slash from 'slash'; // FIXME: types duplicated type from `core-common', to be
// removed when we remove v6 back-compat.

const stripExtension = titleWithExtension => {
  let parts = titleWithExtension.split('/');
  const last = parts[parts.length - 1];
  const dotIndex = last.indexOf('.');
  const stripped = dotIndex > 0 ? last.substr(0, dotIndex) : last;
  parts[parts.length - 1] = stripped;
  const [first, ...rest] = parts;

  if (first === '') {
    parts = rest;
  }

  return parts.join('/');
};

const startCaseTitle = title => {
  return title.split('/').map(startCase).join('/');
};

export const autoTitleFromSpecifier = (fileName, entry) => {
  const {
    directory,
    importPathMatcher,
    titlePrefix = ''
  } = entry || {}; // On Windows, backslashes are used in paths, which can cause problems here
  // slash makes sure we always handle paths with unix-style forward slash

  const normalizedFileName = slash(fileName);

  if (importPathMatcher.exec(normalizedFileName)) {
    const suffix = normalizedFileName.replace(directory, '');
    const titleAndSuffix = slash(path.join(titlePrefix, suffix));
    return startCaseTitle(stripExtension(titleAndSuffix));
  }

  return undefined;
};
export const autoTitle = (fileName, storiesEntries) => {
  for (let i = 0; i < storiesEntries.length; i += 1) {
    const title = autoTitleFromSpecifier(fileName, storiesEntries[i]);
    if (title) return title;
  }

  return undefined;
};