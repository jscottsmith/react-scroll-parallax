import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollController } from '../index.js';

export default function withScrollPosition(WrappedComponent) {
    return class WithScroll extends Component {
        static contextTypes = {
            scrollController: PropTypes.object, // not required because this could be rendered on the server.
        };

        constructor(props, context) {
            super();
            const { scrollY } = context.scrollController.state;
            this.state = {
                scrollY,
            };
        }

        componentWillMount() {
            const { scrollController } = this.context;
            // Make sure the provided context is an instance of the controller
            if (!(scrollController instanceof ScrollController)) {
                throw new Error(
                    "Must wrap your application's <ScrollPosition /> components in a <ScrollProvider />."
                );
            }

            // @TODO: Subscribe to scroll updates
            scrollController.subscribe(this.updateScroll);
        }

        componentWillUnmount() {
            const { scrollController } = this.context;
            // @TODO: Implement and test
            scrollController.unsubscribe();
        }

        updateScroll = ({ scrollY }) => {
            this.setState(() => ({
                scrollY,
            }));
        };

        render() {
            const { scrollY } = this.state;
            return <WrappedComponent scrollY={scrollY} />;
        }
    };
}
