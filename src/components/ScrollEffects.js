import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleBetween, parseUnit } from '../utils';

const defaultVal = {
    value: 0,
    unit: 'px',
};

const defaultValNoUnit = {
    value: 1,
    unit: '',
};

class ScrollEffects extends Component {
    static propTypes = {
        progress: PropTypes.number.isRequired,
        x: PropTypes.array,
        y: PropTypes.array,
        scale: PropTypes.array,
        opacity: PropTypes.array,
        children: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.parseOffsetUnits();
    }

    parseOffsetUnits() {
        const { x, y } = this.props;
        this.offsets = {
            x: x && x.map(f => parseUnit(f)),
            y: y && y.map(f => parseUnit(f)),
        };
    }

    scaleValues() {
        const { progress, opacity, scale } = this.props;
        const { x, y } = this.offsets;

        // Only scale a value if one exists
        const hasX = typeof x !== 'undefined';
        const hasY = typeof y !== 'undefined';
        const hasScale = typeof scale !== 'undefined';
        const hasOpacity = typeof opacity !== 'undefined';

        const values = {
            x: defaultVal,
            y: defaultVal,
            scale: defaultValNoUnit,
            opacity: defaultValNoUnit,
        };

        if (hasX) {
            values.x = {
                value: scaleBetween(progress, x[0].value, x[1].value, 1, 0),
                unit: x[0].unit,
            };
        }
        if (hasY) {
            values.y = {
                value: scaleBetween(progress, y[0].value, y[1].value, 1, 0),
                unit: y[0].unit,
            };
        }
        if (hasScale) {
            values.scale = {
                value: scaleBetween(progress, scale[0], scale[1], 1, 0),
                unit: null,
            };
        }
        if (hasOpacity) {
            values.opacity = {
                value: scaleBetween(progress, opacity[0], opacity[1], 1, 0),
                unit: null,
            };
        }

        return values;
    }

    getStyles() {
        const { x, y, opacity, scale } = this.scaleValues();

        const translateTransform =
            x.value || y.value
                ? `translate3d(${x.value}${x.unit}, ${y.value}${y.unit}, 0)`
                : '';
        const scaleTransform = scale.value ? `scale(${scale.value})` : '';

        return {
            opacity: opacity.value,
            transform: `${translateTransform} ${scaleTransform}`,
        };
    }

    render() {
        const style = this.getStyles();

        return this.props.children({ style });
    }
}

export default ScrollEffects;
