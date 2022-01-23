'use strict';
const childProcess = require('child_process');
const {EOL} = require('os');
const {expect} = require('chai');

function getColorCmd(cmd, args, {shortFlags} = {}) {
    const flags = Object.entries(args || {}).reduce((s, [flag, value]) => {
        return s + `${shortFlags ? '-' : '--'}${flag} ${value} `;
    }, '');
    const cmds = {
        darwin: `CLICOLOR_FORCE="1" ${cmd} | node lib/cli ${flags}`,
        linux: `CLICOLOR="1" ${cmd} | node lib/cli ${flags}`,
        // for win32 compatibility, make sure there is no space between the cmd and the pipe
        win32: `${cmd}| node lib/cli ${flags}`
    };
    return cmds[process.platform];
}

function echo(str) {
    if (process.platform === 'win32') {
        return `echo ${str}`;
    }
    return `echo "${str}"`;
}

function runCLI (cmd, args) {
    return new Promise((resolve, reject) => {
        childProcess.exec(cmd, {
            ...args,
            timeout: 10000
        }, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }

            if (stderr) {
                return reject(stderr);
            }

            resolve(stdout);
        });
    });
}

function runColorCLI (data, args, opts) {
    return runCLI(getColorCmd(data, args, opts));
}

describe('cli', function () {
    it('converts colors', async function () {
        const data = echo('what\u001b[0;31m what?');
        const result = `what<span style="color:#A00"> what?${EOL}</span>`;

        const stdout = await runColorCLI(data);
        expect(stdout).to.equal(result);
    });

    it('works with flags', async function () {
        const data = echo('test\ntest\n');
        // Has an additional line break relative to programmatic, due to `echo`
        const result = 'test<br/>test<br/><br/>';

        const stdout = await runColorCLI(data, {newline: ''});
        expect(stdout).to.equal(result);
    });

    it('works with multiple flags', async function () {
        const data = echo('test\n<test\n');
        // Has an additional line break relative to programmatic, due to `echo`
        const result = 'test<br/>&lt;test<br/><br/>';

        let stdout = await runColorCLI(
            data, {
                newline: '', escapeXML: '', fg: '"#FAF"', bg: '"#0F0"'
            }
        );
        expect(stdout).to.equal(result);
        stdout = await runColorCLI(
            data, {
                n: '', x: '', f: '"#FAF"', b: '"#0F0"'
            },
            {shortFlags: true}
        );
        expect(stdout).to.equal(result);
    });

    it('prints version', async function () {
        const result = '0.6.14\n';
        let stdout = await runCLI('node lib/cli --version');
        expect(stdout).to.equal(result);
        stdout = await runCLI('node lib/cli -v');
        expect(stdout).to.equal(result);
    });

    it('prints help', async function () {
        const result = 'ansi-to-html [options] [file]';
        let stdout = await runCLI('node lib/cli --help');
        expect(stdout).to.contain(result);
        stdout = await runCLI('node lib/cli -h');
        expect(stdout).to.contain(result);
    });

    it('works with a file', async function () {
        // Has an additional line break relative to programmatic, due to `echo`
        const result = 'test\ntest\n';

        const stdout = await runCLI('node lib/cli test/fixtures/data.txt');
        expect(stdout).to.equal(result);
    });
});
