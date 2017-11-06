import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseUnit } from '../utils';
import {
    Observed,
    ScrollPosition,
    ScrollEffects,
    ViewportProgress,
} from './index.js';

class Parallax extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        x: PropTypes.array,
        y: PropTypes.array,
        scale: PropTypes.array,

        // @TODO: these should also be available
        // scale
        // rotation
        // opacity
        // tag/element name?
    };

    state = {
        boundsStyle: {},
        boundingRect: null,
    };

    componentDidMount() {
        this.addListeners();
        this.parseOffsetUnits();
        this.setBoundsStyle();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    addListeners() {
        window.addEventListener('resize', this.handleResize, false);
    }

    removeListeners() {
        window.removeEventListener('resize', this.handleResize, false);
    }

    parseOffsetUnits() {
        // NOTE: same parseOffsetUnits function also occurs in <ScrollEffects>
        // Consider DRYing this up somehow.
        const { x, y } = this.props;
        this.offsets = {
            x: x && x.map(f => parseUnit(f)),
            y: y && y.map(f => parseUnit(f)),
        };
    }

    handleResize = () => {
        this.setBoundsStyle();
    };

    mapRefElement = ref => {
        this.el = ref;
    };

    mapRefViewportProgress = ref => {
        this.viewportProgress = ref;
    };

    setBoundsStyle() {
        // NOTE: This sets the state of style for the bounds element
        // that will be observed by the IntersectionObserver
        // It takes the offsets and resizes the bounds to
        // account for x and y offsets as well as scale.

        // @TODO: Consider revising this function.
        // Break into multiple focused methods.
        // Fix scaling. Needs the bounding rect
        // without scaling applied when updating

        const { x, y } = this.offsets;
        const { scale } = this.props;
        let { boundingRect } = this.state;

        // NOTE: Temporary border added to debug
        const border = '1px dotted lightgreen';

        let paddingTop = 0;
        let paddingBottom = 0;
        let paddingLeft = 0;
        let paddingRight = 0;

        const hasScale = scale;
        const hasYPercent = y[0].unit === '%';
        const hasXPercent = x[0].unit === '%';

        // NOTE: Only need the bounding rect if we are using percent
        // as a unit, or scale as an effect. Also only want to get this
        // on the initial mount when no styles have been applied.
        if ((hasYPercent || hasXPercent || hasScale) && !boundingRect) {
            boundingRect = this.el.getBoundingClientRect();
            console.log(boundingRect);
        }

        if (y) {
            const y0 = Math.abs(y[0].value);
            const y1 = Math.abs(y[1].value);
            paddingTop = hasYPercent ? y0 / 100 * boundingRect.height : y0;
            paddingBottom = hasYPercent ? y1 / 100 * boundingRect.height : y1;
        }

        if (x) {
            const x0 = Math.abs(x[0].value);
            const x1 = Math.abs(x[1].value);
            paddingLeft = hasXPercent ? x0 / 100 * boundingRect.width : x0;
            paddingRight = hasXPercent ? x1 / 100 * boundingRect.width : x1;
        }

        if (scale) {
            const { width, height } = boundingRect;
            const scaleMax = Math.max(scale[0], scale[1]);
            const halfDeltaX = (width * scaleMax - width) / 2;
            const halfDeltaY = (height * scaleMax - height) / 2;

            paddingTop = paddingTop + halfDeltaY;
            paddingBottom = paddingBottom + halfDeltaY;
            paddingLeft = paddingLeft + halfDeltaX;
            paddingRight = paddingRight + halfDeltaX;
        }

        // NOTE: set negative margins based on padding
        const marginTop = paddingTop * -1;
        const marginBottom = paddingBottom * -1;
        const marginLeft = paddingLeft * -1;
        const marginRight = paddingRight * -1;

        const boundsStyle = {
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

        this.setState(
            () => ({
                boundsStyle,
                boundingRect,
            }),
            // NOTE: Since ViewportProgress caches the initial bounds on mount
            // it needs to be updated once the bounds style is updated
            // with the correct size that accounts for offsets.
            this.viewportProgress.updateAttributeCache
        );
    }

    renderMarkup(isInView, style, refCallbacks) {
        const { children, className } = this.props;
        const wrapperClass = isInView
            ? `${className} parallax-wrapper is-in-view`
            : `${className} parallax-wrapper`;

        return (
            <div className={wrapperClass}>
                <div
                    className="parallax-bounds"
                    style={this.state.boundsStyle}
                    // This calls each ref callback provided
                    ref={ref => refCallbacks.forEach(f => f(ref))}
                >
                    <div
                        style={style}
                        className="parallax-element"
                        ref={this.mapRefElement}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        // NOTE: Each component in this tree provides a render
        // callback with necessary params to provide as props
        // for the child component
        //
        // Observed => isInView, mapRef
        // ↓
        // ScrollPosition => scrollY
        // ↓
        // ViewportProgress => progress, mapRef
        // ↓
        // ScrollEffects => style
        // ↓
        // renderMarkup(isInView, style, refCallbacks)

        return (
            <Observed>
                {({ isInView, mapRef: mapRefObserved }) => (
                    <ScrollPosition isInView={isInView}>
                        {({ scrollY }) => (
                            <ViewportProgress
                                ref={this.mapRefViewportProgress}
                                isInView={isInView}
                                scrollY={scrollY}
                            >
                                {({
                                    progress,
                                    mapRef: mapRefViewportProgress,
                                }) => (
                                    <ScrollEffects
                                        progress={progress}
                                        {...this.props}
                                    >
                                        {({ style }) =>
                                            this.renderMarkup(isInView, style, [
                                                mapRefObserved,
                                                mapRefViewportProgress,
                                            ])}
                                    </ScrollEffects>
                                )}
                            </ViewportProgress>
                        )}
                    </ScrollPosition>
                )}
            </Observed>
        );
    }
}

export default Parallax;
