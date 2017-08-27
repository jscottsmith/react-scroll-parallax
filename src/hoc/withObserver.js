import React, { PureComponent } from 'react';

// With Observer creates a new IntersectionObserver
// that passes an `isInView` prop to wrapped components
// IntersectionObserver will require a polyfill

export default function withObserver(
    WrappedComponent,
    options = {
        root: null, // document.querySelector('#scrollArea')
        rootMargin: '0px',
        threshold: [0.1, 1.0], // 1.0 = 100% of the el is visible, can be an array of values. callback is invoke when each is true
    }
) {
    return class Observed extends PureComponent {
        state = {
            isInView: null,
        };

        componentDidMount() {
            this.createObserver();
            this.observe();
        }

        createObserver() {
            this.observer = new IntersectionObserver(
                this.handleIntersection,
                options
            );
        }

        observe() {
            this.observer.observe(this.el);
        }

        handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                const isInView = entry.intersectionRatio > 0;

                this.setState(() => ({ isInView }));
            });
        };

        mapRef = ref => {
            this.el = ref;
        };

        render() {
            const { isInView } = this.state;
            return (
                <div ref={this.mapRef}>
                    <WrappedComponent isInView={isInView} {...this.props} />
                </div>
            );
        }
    };
}
