/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ConfigOptions } from '@docusaurus/types';
import { WriteTranslationsOptions } from '../server/translations/translations';
export default function writeTranslations(siteDir: string, options: WriteTranslationsOptions & ConfigOptions & {
    locale?: string;
}): Promise<void>;
