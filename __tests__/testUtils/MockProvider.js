import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ParallaxContext from 'helpers/ParallaxContext';

export default class MockProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        controllerMock: PropTypes.object.isRequired,
    };

    componentWillMount() {
        this.controller = this.props.controllerMock;
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
