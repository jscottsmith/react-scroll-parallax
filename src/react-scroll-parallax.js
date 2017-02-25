import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';

// normalize
function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

function clamp(number, lower, upper) {
    number = number <= upper ? number : upper;
    number = number >= lower ? number : lower;
    return number;
}

// set to true to litter the console with logs and
// add classes/elements to visualize wtf is happening.
const DEBUG = false;

export default class Parallax extends Component {

    static defaultProps = {
        offsetYMax: 20,
        offsetYMin: -20,
        tag: 'div',
        debug: DEBUG,
        slowerScrollRate: false, // determines whether scroll rate is faster or slower than standard scroll
    };

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        debug: PropTypes.bool.isRequired,
        isDesktop: PropTypes.bool.isRequired,
        offsetYMax: PropTypes.number.isRequired,
        offsetYMin: PropTypes.number.isRequired,
        slowerScrollRate: PropTypes.bool.isRequired,
        tag: PropTypes.string.isRequired,
    };

    constructor() {
        super();
        this.handleResize = debounce(this.handleResize, 300);
    }

    componentDidMount() {
        this.props.isDesktop && this.startParallax();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isDesktop && nextProps.isDesktop !== this.props.isDesktop) {
            this.startParallax();
        }

        if (!nextProps.isDesktop && nextProps.isDesktop !== this.props.isDesktop) {
            this.stopParallax();
        }
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    startParallax() {
        // Get initial position to cache important attributes
        // then apply initial styling offset, add the
        // scroll listeners to update style, then check
        // the current position to set any initial styling
        this.cacheAttributes();
        this.applyStyle();
        this.addListeners();
        this.checkPosition();
    }

    stopParallax() {
        // reset any transform that have been applied
        // and remove scroll listeners
        this.resetStyles();
        this.removeListeners();
    }

    ticking = false;
    scrollY = 0;

    // Cache of attributes used to calculate an element's
    // position in the viewport and minimize reflow. see cacheAttributes()
    attributes = {
        top: 0,
        bottom: 0,
        elHeight: 0,
        offsetYMaxPx: 0,
        offsetYMinPx: 0,
        windowHeight: 0,
    };

    removeListeners() {
        const supportsPassive = true; // test for this
        window.removeEventListener('scroll', this.handleScroll, supportsPassive ? { passive: true } : false);
        window.removeEventListener('resize', this.handleResize, false);
    }

    addListeners() {
        const supportsPassive = true; // test for this
        window.addEventListener('scroll', this.handleScroll, supportsPassive ? { passive: true } : false);
        window.addEventListener('resize', this.handleResize, false);
    }

    handleScroll = () => {
        this.scrollY = window.scrollY;

        // only call if the last animation request has been completed
        if (this.ticking) console.log('OOOOOOOHHHMY!')
        if (!this.ticking) {
            this.ticking = true;
            window.requestAnimationFrame(this.checkPosition);
        }
    };

    handleResize = () => {
        this.cacheAttributes();
        this.applyStyle();
    };

    cacheAttributes = () => {
        const { offsetYMin, offsetYMax } = this.props;

        // NOTE: Many of these cause REFLOW so don't
        // do this on every frame, instead cache the
        // values to access later
        const el = this._wrapper;
        const rect = el.getBoundingClientRect();
        const html = document.documentElement;
        const windowHeight = window.innerHeight || html.clientHeight;
        const elHeight = el.offsetHeight;
        const scrollY = window.scrollY;

        // NOTE: offsetYMax and offsetYMin are percents
        // based of the height of the element. They must be
        // calculated as px to correctly determine whether
        // the element is in the viewport.
        const h100 = elHeight / 100;
        const offsetYMaxPx = offsetYMax * h100;
        const offsetYMinPx = offsetYMin * h100; // negative value
        // console.log(elHeight);

        // must add the current scroll position when the element
        // is checked so that we get it's absolute position
        // relative to the document and not the viewport
        // then add the min/max offsets calculated above
        const top = rect.top + scrollY + offsetYMinPx;
        const bottom = rect.bottom + scrollY + offsetYMaxPx;

        // Total distance the element will move from when
        // the top enters the view to the bottom leaving
        // Must account for elements height + offsets
        const totalDist = windowHeight + (elHeight + Math.abs(offsetYMinPx) + offsetYMaxPx);

        this.attributes = {
            top,
            bottom,
            elHeight,
            offsetYMaxPx,
            offsetYMinPx,
            totalDist,
            windowHeight,
        };
    };

    checkPosition = () => {
        const { windowHeight } = this.attributes;
        const top = this.attributes.top - this.scrollY;
        const bottom = this.attributes.bottom - this.scrollY;

        const topInView     = top    >= 0 && top    <= windowHeight;
        const bottomInView  = bottom >= 0 && bottom <= windowHeight;

        const covering = top <= windowHeight && bottom >= 0;

        const isInView = topInView || bottomInView || covering;

        // debugging stuff
        this.props.debug && this._wrapper.classList.remove('in-view');
        this.props.debug && console.log('top', topInView, 'bottom', bottomInView, 'covering', covering);

        if (isInView) {
            this.applyStyle();
        }

        // reset ticking so more animations can be called
        this.ticking = false;
    };

    applyStyle() {
        const top = this.attributes.top - this.scrollY;
        const { 
            windowHeight,
            elHeight,
            offsetYMaxPx,
            offsetYMinPx,
            totalDist,
        } = this.attributes;

        // Percent the element has moved based on current and total
        // distance to move clamped to keep within range 0-100%
        const percentMoved = clamp((top * -1 + windowHeight) / totalDist * 100, 0, 100);
        // console.log('percent', percentMoved);

        // Scale percentMoved to min/max percent determined by offset props
        const { offsetYMin, offsetYMax, slowerScrollRate } = this.props;

        // sets parallax to faster or slower than the rate of scroll
        let y;
        if (slowerScrollRate) {
            y = scaleBetween(percentMoved, offsetYMin, offsetYMax, 0, 100);

        } else {
            // flipped max/min
            y = scaleBetween(percentMoved, offsetYMax, offsetYMin, 0, 100);
        }

        // Apply styles
        const el = this._el;
        el.style.cssText =
           `will-change:transform;
            position:relative;
            transform:translate3d(0, ${y}%, 0)`;

        // debugging class
        this.props.debug && this._wrapper.classList.add('in-view');
    }

    resetStyles = () => {
        // Resets any styles that may be left over when
        // resizing from desktop to mobile apply styles
        const el = this._el;
        el.style.cssText =
           `will-change:none;
            position:relative;
            transform:translate3d(0, 0, 0)`;
        // debugging class
        this.props.debug && this._wrapper.classList.remove('in-view');
    };

    // refs
    mapRefWrapper = ref => {
        this._wrapper = ref;
    };

    mapRefEl = ref => {
        this._el = ref;
    };

    getDebugElementStyle(top) {
        const {
            offsetYMax,
            offsetYMin,
        } = this.props;

        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: top ? 'rgba(0, 255, 0, 0.5)' : 'rgba(0, 255, 255, 0.5)',
            transform: `translateY(${top ? offsetYMax : offsetYMin}%)`,
        };
    }

    render() {
        const {
            children,
            className,
            debug,
            offsetYMax,
            offsetYMin,
            tag,
        } = this.props;

        const Tag = tag;
        const rootClass = 'parallax-el-wrapper' + ` ${className}` + ` ${debug}`;

        return (
            <Tag
                className={rootClass}
                ref={this.mapRefWrapper}
            >
                <div
                    className="parallax-el"
                    ref={this.mapRefEl}
                >
                    {children}
                </div>

                {debug && <div className="debug-top-position" style={this.getDebugElementStyle(true)} />}
                {debug && <div className="debug-bottom-position" style={this.getDebugElementStyle(false)} />}
            </Tag>
        );
    }
}
