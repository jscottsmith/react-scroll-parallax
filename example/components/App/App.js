import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ScrollProvider } from 'react-scroll-parallax';
import { ParallaxTest } from 'components';

export default class App extends Component {
    render() {
        return (
            <ScrollProvider>
                <ParallaxTest />
            </ScrollProvider>
        );
    }
}
