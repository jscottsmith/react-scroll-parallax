import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// NOTE: The with bounds HOC wraps a component
// and provides the bounds to be observed
// based upon the [x, y] translations. This HOC
// should be composed within the withObserver().

// @TODO: Hopefully this can also account
// for future props past to parallax element
// like scale and rotation. Not going to handle
// z because that requires knowing the perspective
// and would be difficult to calculate the bounds
//
// Currently the bounds only accounts for x, y

function withBounds(WrappedComponent) {
    return class Bounds extends PureComponent {
        static propTypes = {
            className: PropTypes.string,
            isInView: PropTypes.bool.isRequired,
            innerRef: PropTypes.func.isRequired,
            x: PropTypes.array,
            y: PropTypes.array,
        };

        getBoundsStyle() {
            // @TODO: Cache these values, only
            // update if relevant props have updated

            const { x, y } = this.props;

            // NOTE: Temporary border added to debug
            let border;
            if (this.props.isInView) {
                border = '1px dotted lightgreen';
            } else {
                border = '1px dotted tomato';
            }

            let marginTop = 0;
            let marginBottom = 0;
            let marginLeft = 0;
            let marginRight = 0;

            let paddingTop = 0;
            let paddingBottom = 0;
            let paddingLeft = 0;
            let paddingRight = 0;

            if (y) {
                const y0 = Math.abs(y[0]) * -1;
                const y1 = Math.abs(y[1]) * -1;
                marginTop = `${y0}px`;
                marginBottom = `${y1}px`;
                paddingTop = `${Math.abs(y0)}px`;
                paddingBottom = `${Math.abs(y1)}px`;
            }

            if (x) {
                const x0 = Math.abs(x[0]) * -1;
                const x1 = Math.abs(x[1]) * -1;
                marginLeft = `${x0}px`;
                marginRight = `${x1}px`;
                paddingLeft = `${Math.abs(x0)}px`;
                paddingRight = `${Math.abs(x1)}px`;
            }

            return {
                marginTop,
                marginBottom,
                marginLeft,
                marginRight,
                paddingTop,
                paddingBottom,
                paddingLeft,
                paddingRight,
                border,
            };
        }

        render() {
            const { className, innerRef, isInView } = this.props;
            const _className = isInView ? `${className} is-in-view` : className;

            return (
                <div className={_className}>
                    <div
                        className="parallax-bounds"
                        style={this.getBoundsStyle()}
                        ref={innerRef}
                    >
                        <WrappedComponent {...this.props} />
                    </div>
                </div>
            );
        }
    };
}

export default withBounds;
