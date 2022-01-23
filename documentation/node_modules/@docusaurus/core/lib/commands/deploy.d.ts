/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { BuildCLIOptions } from '@docusaurus/types';
export declare function buildSshUrl(githubHost: string, organizationName: string, projectName: string, githubPort?: string): string;
export declare function buildHttpsUrl(gitCredentials: string, githubHost: string, organizationName: string, projectName: string, githubPort?: string): string;
export declare function hasSSHProtocol(sourceRepoUrl: string): boolean;
export default function deploy(siteDir: string, cliOptions?: Partial<BuildCLIOptions>): Promise<void>;
