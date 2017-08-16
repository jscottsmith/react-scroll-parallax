import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { offsetMin, offsetMax } from '../utils/propValidation';
import { ParallaxController } from 'react-scroll-parallax';

export default class Parallax extends Component {
    static defaultProps = {
        disabled: false,
        offsetYMax: 0,
        offsetYMin: 0,
        offsetXMax: 0,
        offsetXMin: 0,
        slowerScrollRate: false, // determines whether scroll rate is faster or slower than standard scroll
        tag: 'div',
    };

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        disabled: PropTypes.bool.isRequired,
        offsetXMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        offsetXMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        offsetYMax: offsetMax,
        offsetYMin: offsetMin,
        slowerScrollRate: PropTypes.bool.isRequired,
        tag: PropTypes.string.isRequired,
    };

    static contextTypes = {
        parallaxController: PropTypes.object, // not required because this could be rendered on the server.
    };

    componentDidMount() {
        // Make sure the provided context is an instance of the controller
        if (!(this.context.parallaxController instanceof ParallaxController)) {
            throw new Error(
                "Must wrap your application's <Parallax /> components in a <ParallaxProvider />."
            );
        }

        // create a new parallax element and save the reference
        this.element = this.context.parallaxController.createElement({
            elInner: this._inner,
            elOuter: this._outer,
            props: {
                disabled: this.props.disabled,
                offsetXMax: this.props.offsetXMax,
                offsetXMin: this.props.offsetXMin,
                offsetYMax: this.props.offsetYMax,
                offsetYMin: this.props.offsetYMin,
                slowerScrollRate: this.props.slowerScrollRate,
            },
        });
    }

    componentWillReceiveProps(nextProps) {
        // updates the elements props when changed
        if (this.props !== nextProps) {
            this.context.parallaxController.updateElement(this.element, {
                props: {
                    disabled: nextProps.disabled,
                    offsetXMax: nextProps.offsetXMax,
                    offsetXMin: nextProps.offsetXMin,
                    offsetYMax: nextProps.offsetYMax,
                    offsetYMin: nextProps.offsetYMin,
                    slowerScrollRate: nextProps.slowerScrollRate,
                },
            });
        }
        // resets element styles when disabled
        if (this.props.disabled !== nextProps.disabled && nextProps.disabled) {
            this.context.parallaxController.resetElementStyles(this.element);
        }
    }

    componentWillUnmount() {
        this.context.parallaxController.removeElement(this.element);
    }

    // refs
    mapRefOuter = ref => {
        this._outer = ref;
    };

    mapRefInner = ref => {
        this._inner = ref;
    };

    render() {
        const { children, className, tag: Tag } = this.props;

        const rootClass = 'parallax-outer' + (className ? ` ${className}` : '');

        return (
            <Tag className={rootClass} ref={this.mapRefOuter}>
                <div className="parallax-inner" ref={this.mapRefInner}>
                    {children}
                </div>
            </Tag>
        );
    }
}
