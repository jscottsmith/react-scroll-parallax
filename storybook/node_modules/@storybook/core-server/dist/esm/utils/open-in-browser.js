import { logger } from '@storybook/node-logger';
import open from 'better-opn';
import dedent from 'ts-dedent';
export function openInBrowser(address) {
  try {
    open(address);
  } catch (error) {
    logger.error(dedent`
      Could not open ${address} inside a browser. If you're running this command inside a
      docker container or on a CI, you need to pass the '--ci' flag to prevent opening a
      browser by default.
    `);
  }
}