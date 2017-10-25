import React, { Component } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ParallaxTest } from 'components';

export default class App extends Component {
    // this just serves to test unmount/re-mount ParallaxProvider
    state = {
        mount: true,
    };

    render() {
        return (
            <main>
                {this.state.mount ? (
                    <ParallaxProvider>
                        <ParallaxTest />
                    </ParallaxProvider>
                ) : (
                    <div />
                )}
            </main>
        );
    }
}
