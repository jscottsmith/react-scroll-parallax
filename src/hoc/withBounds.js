import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// The with bounds HOC wraps a component
// and provides the bounds to be observed
// based upon the [x, y] translations

// @TODO: Hopefully this can also account
// for future props past to parallax element
// like scale and rotation. Not going to handle
// z because that requires knowing the perspective
// and would be difficult to calculate

function withBounds(WrappedComponent) {
    return class Bounds extends PureComponent {
        static propTypes = {
            className: PropTypes.string,
            x: PropTypes.array,
            y: PropTypes.array,
        };

        mapRef = ref => {
            this.el = ref;
        };

        getRef = () => {
            // NOTE: this ref is required so that
            // the withViewportProgress() HOC and the
            // withObserver() HOC can access the DOM
            // element. It's not used within this class.
            return this.el;
        };

        getBounds() {
            const { x, y } = this.props;

            const position = 'absolute';
            const visibility = 'hidden';
            const border = '1px dotted tomato';

            let top = 0;
            let bottom = 0;
            let right = 0;
            let left = 0;

            if (y) {
                const y0 = Math.abs(y[0]) * -1;
                const y1 = Math.abs(y[1]) * -1;
                top = `${y0}px`;
                bottom = `${y1}px`;
            }

            if (x) {
                const x0 = Math.abs(x[0]) * -1;
                const x1 = Math.abs(x[1]) * -1;
                left = `${x0}px`;
                right = `${x1}px`;
            }

            return {
                position,
                border,
                top,
                right,
                bottom,
                left,
                visibility,
            };
        }

        render() {
            const { className } = this.props;

            return (
                <div
                    className={className}
                    style={{
                        position: 'relative',
                    }}
                >
                    <span
                        className="parallax__bounds"
                        style={this.getBounds()}
                        ref={this.mapRef}
                    />

                    <WrappedComponent getRef={this.getRef} {...this.props} />
                </div>
            );
        }
    };
}

export default withBounds;
