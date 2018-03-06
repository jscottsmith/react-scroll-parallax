import React, { Component } from "react";
import PropTypes from "prop-types";
import Observed from "react-observed";
import {
    validateOffsets,
    validateScale,
    validateOpacity
} from "../utils/propValidation";
import {
    Bounds,
    ScrollEffects,
    ScrollPosition,
    ViewportProgress
} from "./index.js";

class Parallax extends Component {
    static defaultProps = {
        x: [0, 0],
        y: [0, 0],
        scale: [1, 1],
        opacity: [1, 1]
    };

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element.isRequired,
            PropTypes.func.isRequired
        ]),
        className: PropTypes.string,
        x: validateOffsets,
        y: validateOffsets,
        scale: validateScale,
        opacity: validateOpacity,
        observerOptions: PropTypes.object,
        elementStyle: PropTypes.object
        // @TODO: these should also be available:
        // rotation
        // tag/element name?
    };

    getWrapperClass(isInView) {
        const { className } = this.props;
        let cx = "parallax-wrapper";
        cx = isInView ? `${cx} is-in-view` : cx;
        cx = className ? `${cx} ${className}` : cx;

        return cx;
    }

    render() {
        // NOTE: Each component in this tree provides a render
        // callback with necessary params to provide as props
        // for the child component
        //
        // It's not as bad as it looks. ;)
        //
        // <Observed> => ({ isInView, mapRef })
        // ↓
        // <ScrollPosition> => ({ scrollY })
        // ↓
        // <ViewportProgress> => ({ progress, mapRef, updateAttributeCache })
        // ↓
        // <ScrollEffects> => ({ style })
        // ↓
        // markup

        const {
            children,
            x,
            y,
            scale,
            opacity,
            observerOptions,
            elementStyle
        } = this.props;

        // if child is a function, call it with updateAttributeCache
        const isFunc = children instanceof Function;

        // prettier-ignore
        return (
            <Observed initialViewState options={observerOptions}>
                {({ isInView, mapRef: observedRef }) => (
                    <ScrollPosition isInView={isInView}>
                        {({ scrollY }) => (
                            <ViewportProgress isInView={isInView} scrollY={scrollY}>
                                {({ progress, updateAttributeCache, mapRef: viewportRef }) => (
                                    <ScrollEffects progress={progress} x={x} y={y} scale={scale} opacity={opacity}>
                                        {({ style }) => (
                                            <div className={this.getWrapperClass(isInView)}>
                                                <Bounds
                                                    refCallbacks={[observedRef, viewportRef]}
                                                    updateAttributeCache={updateAttributeCache}
                                                    scale={scale}
                                                    x={x}
                                                    y={y}
                                                >
                                                    <div style={style} className="parallax-element" style={elementStyle}>
                                                        {isFunc ? children({ updateAttributeCache, progress, isInView }) : children}
                                                    </div>
                                                </Bounds>                                                
                                            </div>
                                        )}
                                    </ScrollEffects>
                                )}
                            </ViewportProgress>
                        )}
                    </ScrollPosition>
                )}
            </Observed>
        );
        // prettier-ignore
    }
}

export default Parallax;
