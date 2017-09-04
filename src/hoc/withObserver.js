/* global IntersectionObserver */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// With Observer creates a new IntersectionObserver
// that passes an `isInView` prop to wrapped components
// IntersectionObserver will require a polyfill

function withObserver(
    WrappedComponent,
    options = {
        root: null, // document.querySelector('#scrollArea')
        rootMargin: '0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0], // 1.0 = 100% of the el is visible, can be an array of values. callback is invoke when each is true
    }
) {
    return class Observed extends PureComponent {
        static propTypes = {
            getRef: PropTypes.func.isRequired,
        };

        state = {
            isInView: true, // initial state should be visible so that the scrollY is updated.
        };

        componentDidMount() {
            this.createObserver();
            this.observe();
        }

        componentWillUnmount() {
            this.disconnectObserver();
        }

        createObserver() {
            this.observer = new IntersectionObserver(
                this.handleIntersection,
                options
            );
        }

        disconnectObserver() {
            this.observer.disconnect();
        }

        observe() {
            // NOTE: gets the ref of the element to observe
            const el = this.props.getRef();

            this.observer.observe(el);
        }

        handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                const isInView = entry.intersectionRatio > 0.01;

                this.setState(() => ({ isInView }));
            });
        };

        render() {
            const { isInView } = this.state;

            return <WrappedComponent isInView={isInView} {...this.props} />;
        }
    };
}

export default withObserver;
