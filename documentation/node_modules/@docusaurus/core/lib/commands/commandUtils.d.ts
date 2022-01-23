/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HostPortCLIOptions } from '@docusaurus/types';
export declare function getCLIOptionHost(hostOption: HostPortCLIOptions['host']): string;
export declare function getCLIOptionPort(portOption: HostPortCLIOptions['port'], host: string): Promise<number | null>;
