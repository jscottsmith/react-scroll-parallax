import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parseOffsetUnits } from '../utils';
import Observed from 'react-observed';
import { ScrollPosition, ScrollEffects, ViewportProgress } from './index.js';

const observerOptions = {
    root: null,
    rootMargin: '10px',
    threshold: [0.01, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
};

class Parallax extends Component {
    static defaultProps = {
        observerOptions,
        x: [0, 0],
        y: [0, 0],
        scale: [1, 1],
        opacity: [1, 1],
    };

    static contextTypes = {
        resizeController: PropTypes.object, // not required because this could be rendered on the server.
    };

    static propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        x: PropTypes.array.isRequired,
        y: PropTypes.array.isRequired,
        scale: PropTypes.array.isRequired,
        opacity: PropTypes.array.isRequired,
        observerOptions: PropTypes.object.isRequired,
        // @TODO: these should also be available:
        // rotation
        // tag/element name?
    };

    state = {
        boundsStyle: {},
        boundingRect: null,
    };

    componentDidMount() {
        this.parseOffsetUnits();

        // subscribe to resize changes with handler to update bounds
        const { resizeController } = this.context;
        resizeController.subscribe(this.handleResize);
    }

    componentWillUnmount() {
        const { resizeController } = this.context;

        // Unsubscribe to resize updates by passing the subscribed handler
        resizeController.unsubscribe(this.handleResize);
    }

    parseOffsetUnits() {
        this.offsets = parseOffsetUnits(this.props);
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
        // NOTE: This sets the state of style for the bounds
        // element that will be observed by the IntersectionObserver
        // It takes the parallax props and resizes the bounds
        // to account for x and y offsets as well as scale.

        // @TODO: Consider revising this function.
        // Break into multiple focused methods.
        // Fix scaling. Needs the bounding rect
        // without scaling applied when updating

        const { x, y } = this.offsets;
        const { scale } = this.props;
        let { boundingRect } = this.state;

        // NOTE: Temporary border added to debug
        const border = '1px dotted lightgreen';

        let top = 0;
        let bottom = 0;
        let left = 0;
        let right = 0;

        const hasScale = scale;
        const hasYPercent = y[0].unit === '%';
        const hasXPercent = x[0].unit === '%';

        // NOTE: Only need the bounding rect if we are using percent
        // as a unit, or scale as an effect. Also only want to get
        // this on the initial mount when no styles have been applied.
        if ((hasYPercent || hasXPercent || hasScale) && !boundingRect) {
            boundingRect = this.el.getBoundingClientRect();
            // console.log(boundingRect);
        }

        if (y) {
            const y0 = Math.abs(y[0].value);
            const y1 = Math.abs(y[1].value);
            top = hasYPercent ? y0 / 100 * boundingRect.height : y0;
            bottom = hasYPercent ? y1 / 100 * boundingRect.height : y1;
        }

        if (x) {
            const x0 = Math.abs(x[0].value);
            const x1 = Math.abs(x[1].value);
            left = hasXPercent ? x0 / 100 * boundingRect.width : x0;
            right = hasXPercent ? x1 / 100 * boundingRect.width : x1;
        }

        if (scale) {
            const { width, height } = boundingRect;
            const scaleMax = Math.max(scale[0], scale[1]);
            const halfDeltaX = (width * scaleMax - width) / 2;
            const halfDeltaY = (height * scaleMax - height) / 2;

            top = top + halfDeltaY;
            bottom = bottom + halfDeltaY;
            left = left + halfDeltaX;
            right = right + halfDeltaX;
        }

        const boundsStyle = {
            marginTop: top * -1,
            marginBottom: bottom * -1,
            marginLeft: left * -1,
            marginRight: right * -1,
            paddingTop: top,
            paddingBottom: bottom,
            paddingLeft: left,
            paddingRight: right,
            border,
        };

        this.setState(
            () => ({
                boundsStyle,
                boundingRect,
            }),
            // NOTE: Since ViewportProgress caches the initial
            // bounds on mount it needs to be updated once the
            // bounds style is updated with the correct size
            // that accounts for offsets.
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
            <Observed
                initialViewState
                intersectionRatio={0.01}
                options={this.props.observerOptions}
            >
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
