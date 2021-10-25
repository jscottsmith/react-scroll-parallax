import React, { Component } from 'react';
import { Element } from '../classes/Element';
import ParallaxController from '../classes/ParallaxController';
import withController from './withController';

export interface ParallaxProps {
    parallaxController: any;

    /**
     * Offsets on x-axis in % or px. If no unit is passed percent is assumed. Percent is based on
     * the elements width.
     */
    x?: Array<string | number>;
    /**
     * Offsets on y-axis in % or px. If no unit is passed percent is assumed. Percent is based on
     * the elements width.
     */
    y?: Array<string | number>;
    /**
     * Optionally pass additional class names to be added to the outermost parallax element.
     */
    className?: string;
    /**
     * Disables parallax effects on individual elements when true.
     */
    disabled?: boolean;
    /**
     * Optionally pass a style object to be added to the innermost parallax element.
     */
    styleInner?: any;
    /**
     * Optionally pass a style object to be added to the outermost parallax element.
     */
    styleOuter?: any;
    /**
     * Optionally pass an element tag name to be applied to the innermost parallax element.
     */
    tagInner?: any;
    /**
     * Optionally pass an element tag name to be applied to the outermost parallax element.
     */
    tagOuter?: any;
}

class Parallax extends Component<ParallaxProps, {}> {
    static defaultProps = {
        disabled: false,
        tagInner: 'div',
        tagOuter: 'div',
        x: [0, 0],
        y: [0, 0],
    };

    element: Element;
    _outer: HTMLElement;
    _inner: HTMLElement;

    componentDidMount() {
        // Make sure the provided controller is an instance of the Parallax Controller
        const isInstance = this.controller instanceof ParallaxController;

        // Throw if neither context or global is available
        if (!this.controller && !isInstance) {
            throw new Error(
                "Must wrap your application's <Parallax /> components in a <ParallaxProvider />."
            );
        }

        // create a new parallax element and save the reference
        this.element = this.controller.createElement(this._getElementOptions());
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.disabled !== prevProps.disabled ||
            this.props.x[0] !== prevProps.x[0] ||
            this.props.x[1] !== prevProps.x[1] ||
            this.props.y[0] !== prevProps.y[0] ||
            this.props.y[1] !== prevProps.y[1]
        ) {
            this.controller.updateElementPropsById(
                this.element.id,
                this._getElementOptions().props
            );
        }
        // resets element styles when disabled
        if (this.props.disabled !== prevProps.disabled && this.props.disabled) {
            this.controller.resetElementStyles(this.element);
        }
    }

    componentWillUnmount() {
        this.controller.removeElementById(this.element.id);
    }

    _getElementOptions() {
        return {
            elInner: this._inner,
            elOuter: this._outer,
            props: {
                disabled: this.props.disabled,
                x0: this.props.x[0],
                x1: this.props.x[1],
                y0: this.props.y[0],
                y1: this.props.y[1],
            },
        };
    }

    get controller() {
        return this.props.parallaxController;
    }

    mapRefOuter = (ref: HTMLElement) => {
        this._outer = ref;
    };

    mapRefInner = (ref: HTMLElement) => {
        this._inner = ref;
    };

    render() {
        const {
            children,
            className,
            tagOuter: Outer,
            tagInner: Inner,
            styleOuter,
            styleInner,
        } = this.props;

        const rootClass = 'parallax-outer' + (className ? ` ${className}` : '');

        return (
            <Outer
                className={rootClass}
                ref={this.mapRefOuter}
                style={styleOuter}
            >
                <Inner
                    className="parallax-inner"
                    ref={this.mapRefInner}
                    style={styleInner}
                >
                    {children}
                </Inner>
            </Outer>
        );
    }
}

export default withController(Parallax);
