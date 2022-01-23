/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useContext} from 'react';
import ThemeContext from '@theme/ThemeContext';

function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context == null) {
    throw new Error(
      '"useThemeContext" is used outside of "Layout" component. Please see https://docusaurus.io/docs/api/themes/configuration#usethemecontext.',
    );
  }

  return context;
}

export default useThemeContext;
