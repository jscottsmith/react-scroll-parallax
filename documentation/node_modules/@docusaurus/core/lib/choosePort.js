"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * This feature was heavily inspired by create-react-app and
 * uses many of the same utility functions to implement it.
 */
const child_process_1 = require("child_process");
const detect_port_1 = (0, tslib_1.__importDefault)(require("detect-port"));
const is_root_1 = (0, tslib_1.__importDefault)(require("is-root"));
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const prompts_1 = (0, tslib_1.__importDefault)(require("prompts"));
const isInteractive = process.stdout.isTTY;
const execOptions = {
    encoding: 'utf8',
    stdio: [
        'pipe',
        'pipe',
        'ignore', // stderr
    ],
};
// Clears console
function clearConsole() {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
}
// Gets process id of what is on port
function getProcessIdOnPort(port) {
    return (0, child_process_1.execSync)(`lsof -i:${port} -P -t -sTCP:LISTEN`, execOptions)
        .toString()
        .split('\n')[0]
        .trim();
}
// Gets process command
function getProcessCommand(processId) {
    const command = (0, child_process_1.execSync)(`ps -o command -p ${processId} | sed -n 2p`, execOptions);
    return command.toString().replace(/\n$/, '');
}
// Gets directory of a process from its process id
function getDirectoryOfProcessById(processId) {
    return (0, child_process_1.execSync)(`lsof -p ${processId} | awk '$4=="cwd" {for (i=9; i<=NF; i++) printf "%s ", $i}'`, execOptions)
        .toString()
        .trim();
}
// Gets process on port
function getProcessForPort(port) {
    try {
        const processId = getProcessIdOnPort(port);
        const directory = getDirectoryOfProcessById(processId);
        const command = getProcessCommand(processId);
        return logger_1.default.interpolate `code=${command} subdue=${`(pid ${processId})`} in path=${directory}`;
    }
    catch (e) {
        return null;
    }
}
/**
 * Detects if program is running on port and prompts user
 * to choose another if port is already being used
 */
async function choosePort(host, defaultPort) {
    return (0, detect_port_1.default)({ port: defaultPort, hostname: host }).then((port) => new Promise((resolve) => {
        if (port === defaultPort) {
            resolve(port);
            return;
        }
        const message = process.platform !== 'win32' && defaultPort < 1024 && !(0, is_root_1.default)()
            ? `Admin permissions are required to run a server on a port below 1024.`
            : `Something is already running on port ${defaultPort}.`;
        if (isInteractive) {
            clearConsole();
            const existingProcess = getProcessForPort(defaultPort);
            const question = {
                type: 'confirm',
                name: 'shouldChangePort',
                message: logger_1.default.yellow(`${logger_1.default.bold('[WARNING]')} ${message}${existingProcess ? ` Probably:\n  ${existingProcess}` : ''}

Would you like to run the app on another port instead?`),
                initial: true,
            };
            (0, prompts_1.default)(question).then((answer) => {
                if (answer.shouldChangePort === true) {
                    resolve(port);
                }
                else {
                    resolve(null);
                }
            });
        }
        else {
            logger_1.default.error(message);
            resolve(null);
        }
    }), (err) => {
        throw new Error(`Could not find an open port at ${host}.
${`Network error message: "${err.message || err}".`}`);
    });
}
exports.default = choosePort;
