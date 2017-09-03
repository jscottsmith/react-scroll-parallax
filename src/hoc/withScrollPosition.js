import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollController } from 'react-scroll-parallax';

// This HOC serves to connect a component via context
// to the ScrollController which provides the current
// scroll state that is then passed as props to the
// <WrappedComponent />.

// NOTE: Since the scroll state should only be updated when
// the element is in view, this HOC should be composed
// within a withObserver() HOC.

function withScrollPosition(WrappedComponent) {
    return class ScrollPosition extends PureComponent {
        static contextTypes = {
            scrollController: PropTypes.object, // not required because this could be rendered on the server.
        };

        static propTypes = {
            isInView: PropTypes.bool,
        };

        state = {
            scrollY: 0, // value for server so no required props throw
        };

        componentWillMount() {
            const { scrollController } = this.context;

            // Make sure this is server safe
            const hasWindow = typeof window !== 'undefined';

            // Make sure the provided context is an instance of the controller
            const hasController = scrollController instanceof ScrollController;

            // if this has the window and no controller throw an error
            if (hasWindow && !hasController) {
                throw new Error(
                    "No scrollController exist in context. Must wrap your application's <Parallax> components in a <ScrollProvider />."
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

export default withScrollPosition;
