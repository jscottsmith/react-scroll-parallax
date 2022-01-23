/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LoadContext, PluginConfig, InitializedPlugin } from '@docusaurus/types';
export default function initPlugins({ pluginConfigs, context, }: {
    pluginConfigs: PluginConfig[];
    context: LoadContext;
}): InitializedPlugin[];
