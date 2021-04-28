import { withKnobs } from '@storybook/addon-knobs';

// reset the window on each story
const withWindowReset = (storyFn) => {
    window.scrollTo(0, 0);
    return storyFn();
};

export const decorators = [withKnobs, withWindowReset];
