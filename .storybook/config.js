import { configure, addDecorator } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { withKnobs } from '@storybook/addon-knobs';
import { ParallaxProvider } from 'react-scroll-parallax';
import React from 'react';

// Decorate all stories with ParallaxProvider and center styles
const CenterDecorator = storyFn => (
    <div className="center elements">
        <ParallaxProvider>{storyFn()}</ParallaxProvider>
    </div>
);

// reset the window on each story
const withWindowReset = storyFn => {
    window.scrollTo(0, 0);
    return storyFn();
};

addDecorator(withKnobs);
addDecorator(withWindowReset);
addDecorator(CenterDecorator);

const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
