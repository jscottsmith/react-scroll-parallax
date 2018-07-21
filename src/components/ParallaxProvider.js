import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ParallaxContext from '../modules/ParallaxContext';
import ParallaxController from '../modules/ParallaxController';

const createController = () => {
    // Don't initialize on the server
    const isServer = typeof window === 'undefined';

    if (!isServer) {
        // Must not be the server so kick it off...
        return ParallaxController.init();
    }
    return null;
};

export default class ParallaxProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    componentWillMount() {
        this.controller = createController();
    }

    componentWillUnmount() {
        this.controller = this.controller.destroy();
    }

    render() {
        const { children } = this.props;

        return (
            <ParallaxContext.Provider value={this.controller}>
                {children}
            </ParallaxContext.Provider>
        );
    }
}
