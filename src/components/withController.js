import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ParallaxContext from '../modules/ParallaxContext';

export default WrappedComponent => {
    class WithController extends Component {
        static propTypes = {
            parallaxController: PropTypes.object,
        };

        render() {
            return (
                <ParallaxContext.Consumer>
                    {controller => (
                        <WrappedComponent
                            parallaxController={controller}
                            {...this.props}
                        />
                    )}
                </ParallaxContext.Consumer>
            );
        }
    }

    return WithController;
};
