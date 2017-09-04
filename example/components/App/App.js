import React, { Component } from 'react';
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
