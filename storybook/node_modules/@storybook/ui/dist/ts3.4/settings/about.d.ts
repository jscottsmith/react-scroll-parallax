import { FunctionComponent } from 'react';
import { State } from '@storybook/api';
declare const AboutScreen: FunctionComponent<{
    latest: State['versions']['latest'];
    current: State['versions']['current'];
}>;
export { AboutScreen };
