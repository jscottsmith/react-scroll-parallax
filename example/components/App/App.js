import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ParallaxTest } from 'components';

export default class App extends Component {
    render() {
        return (
            <ParallaxProvider>
                <ParallaxTest />
            </ParallaxProvider>
        );
    }
}
