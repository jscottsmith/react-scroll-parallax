/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Detects if program is running on port and prompts user
 * to choose another if port is already being used
 */
export default function choosePort(host: string, defaultPort: number): Promise<number | null>;
