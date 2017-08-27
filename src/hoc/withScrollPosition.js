import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollController } from '../index.js';

export default function withScrollPosition(WrappedComponent) {
    return class WithScroll extends PureComponent {
        static contextTypes = {
            scrollController: PropTypes.object, // not required because this could be rendered on the server.
        };

        static propTypes = {
            isInView: PropTypes.bool,
        };

        constructor(props, context) {
            super(props, context);

            // So that we can render on the server without prop errors
            const hasWindow = typeof window !== 'undefined';

            if (hasWindow) {
                const { scrollY } = context.scrollController.state;
                this.state = {
                    scrollY,
                };
            } else {
                this.state = {
                    scrollY: 0, // value for server so no required props throw
                };
            }
        }

        componentWillMount() {
            const { scrollController } = this.context;

            // Make sure this is server safe
            const hasWindow = typeof window !== 'undefined';

            // Make sure the provided context is an instance of the controller
            const hasController = scrollController instanceof ScrollController;

            // if this has the window and no controller throw an error
            if (hasWindow && !hasController) {
                throw new Error(
                    "No scrollController exist in context. Must wrap your application's [[ parallax ]] components in a <ScrollProvider />."
                );
            }

            // Subscribe to scroll updates by passing a handler to setState of current scroll
            if (hasWindow) scrollController.subscribe(this.updateScroll);
        }

        componentWillUnmount() {
            const { scrollController } = this.context;

            // Unsubscribe to scroll updates by passing the subscribed scroll handler
            scrollController.unsubscribe(this.updateScroll);
        }

        updateScroll = ({ scrollY }) => {
            const { isInView } = this.props;

            // only updates the scrollY when the element is in view
            if (isInView) {
                this.setState(() => ({
                    scrollY,
                }));
            }
        };

        render() {
            const { scrollY } = this.state;
            return <WrappedComponent scrollY={scrollY} {...this.props} />;
        }
    };
}
