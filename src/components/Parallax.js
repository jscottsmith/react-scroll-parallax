import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { offsetMin, offsetMax } from '../utils/propValidation';

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

    componentDidMount() {
        // add this Parallax element to the global listener
        if (typeof ParallaxScrollListener === 'undefined') {
            throw new Error('Must initialize the ParallaxScroller before adding React Parallax components.');
        }
        // create a new parallax element and save the reference
        this.element = ParallaxScrollListener.createElement({
            _inner: this._inner,
            _outer: this._outer,
            props: this.props,
        });
    }

    componentWillReceiveProps(nextProps) {
        // updates the elements props when changed
        if (this.props !== nextProps) {
            ParallaxScrollListener.updateElement(this.element, { props: nextProps });
        }
        // resets element styles when disabled
        if (this.props.disabled !== nextProps.disabled && nextProps.disabled) {
            ParallaxScrollListener.resetElementStyles(this.element);
        }
    }

    componentWillUnmount() {
        ParallaxScrollListener.removeElement(this.element);
    }

    // refs
    mapRefOuter = ref => {
        this._outer = ref;
    };

    mapRefInner = ref => {
        this._inner = ref;
    };

    render() {
        const {
            children,
            className,
            tag: Tag,
        } = this.props;

        const rootClass = 'parallax-outer' + (className ? ` ${className}` : '');

        return (
            <Tag
                className={rootClass}
                ref={this.mapRefOuter}
            >
                <div
                    className="parallax-inner"
                    ref={this.mapRefInner}
                >
                    {children}
                </div>
            </Tag>
        );
    }
}
