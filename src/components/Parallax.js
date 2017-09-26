import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withScrollPosition,
    withObserver,
    withViewportProgress,
    withBounds,
} from '../hoc';
import { scaleBetween, compose, parseUnit } from '../utils';

class Parallax extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        progress: PropTypes.number.isRequired,
        isInView: PropTypes.bool.isRequired,
        x: PropTypes.array,
        y: PropTypes.array,

        // @TODO: these should also be available
        // scale
        // rotation
        // opacity
        // tag/element name?
    };

    componentDidMount() {
        this.setup();
    }

    setup() {
        const { x, y } = this.props;

        this.offsets = {
            x: x.map(f => parseUnit(f)),
            y: y.map(f => parseUnit(f)),
        };
    }

    scaleValues() {
        const { progress } = this.props;
        const { x: _x, y: _y } = this.offsets;

        // @TODO: allow numbers with units and parse to determine

        // Only scale a value if one exists
        const hasX = typeof _x !== 'undefined';
        const hasY = typeof _y !== 'undefined';

        let x = 0;
        let y = 0;

        if (hasX) {
            x = scaleBetween(progress, _x[0].value, _x[1].value, 1, 0);
        }
        if (hasY) {
            y = scaleBetween(progress, _y[0].value, _y[1].value, 1, 0);
        }

        return {
            x: {
                value: x,
                unit: _x[0].unit,
            },
            y: {
                value: y,
                unit: _y[0].unit,
            },
        };
    }

    getStyles() {
        const { x, y } = this.scaleValues();

        return {
            transform: `translate3d(${x.value}${x.unit}, ${y.value}${y.unit}, 0)`,
        };
    }

    render() {
        const { children } = this.props;

        const style = this.getStyles();

        const baseClass = 'parallax-element';

        return (
            <div style={style} className={baseClass}>
                {children}
            </div>
        );
    }
}

// Compose together all HOCs
// The order of which is important since
// some rely on props provided by the others.
// Each decorator provides a necessary
// prop -- or element -- required by the
// <Parallax> component.
//
// |
// withObserver () => {isInView}
// |
// withScrollPosition (isInView) => if (isInView) {scrollY}
// |
// withViewportProgress (isInView, scrollY) => return {progress}
// |
// withBounds (innerRef) => bounds (ref)
// |
// <Parallax>

const decorators = compose(
    withObserver,
    withScrollPosition,
    withViewportProgress,
    withBounds
);

export default decorators(Parallax);
