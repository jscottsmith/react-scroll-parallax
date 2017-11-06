import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clamp from '../utils/clamp';

// With Viewport Progress passes the progress prop
// to wrapped components with a value ranging from
// 0–1. 0 if the elements bounds has not entered
// the beginning of the scroll area, 1 if the
// element has left.

class ViewportProgress extends Component {
    static defaultProps = {
        range: [0, 1],
    };

    static propTypes = {
        isInView: PropTypes.bool.isRequired,
        range: PropTypes.array.isRequired,
        scrollY: PropTypes.number.isRequired,
    };

    constructor(props) {
        super();
        this.state = {
            progress: props.range[0],
            resizeKey: null, // a key to trigger a state change when the window resizes
        };
    }

    componentDidMount() {
        this.setAttributeCache();
        this.setProgress();
        this.addListeners();
    }

    componentWillReceiveProps(nextProps) {
        // if the scroll has changed, and the
        // element is in view start updating state
        // console.log(nextProps.scrollY);
        if (nextProps.isInView && nextProps.scrollY !== this.props.scrollY) {
            this.setProgress();
        }
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

    updateAttributeCache = () => {
        this.setAttributeCache();
    };

    handleResize = () => {
        const resizeKey = `resize-${window.innerWidth}`;

        this.setState(
            () => ({
                resizeKey,
            }),
            this.setAttributeCache // update cached attributes
        );
    };

    mapRef = ref => {
        this.el = ref;
    };

    setAttributeCache() {
        // This caches properties that cause layout thrash

        // Accessing the el withBounds() HOC
        const el = this.el;

        const _rect = el.getBoundingClientRect();
        const elHeight = el.offsetHeight;
        const elWidth = el.offsetWidth;
        const scrollY = window.pageYOffset;
        const html = document.documentElement;
        const windowHeight = window.innerHeight || html.clientHeight;
        const totalDist = windowHeight + elHeight;

        // add current scroll state
        const rect = {
            top: _rect.top + scrollY,
            bottom: _rect.bottom + scrollY,
            left: _rect.left,
            right: _rect.right,
        };

        this.cache = {
            rect,
            elHeight,
            elWidth,
            scrollY,
            windowHeight,
            totalDist,
        };

        // console.log('<ViewportProgress> cache updated');
    }

    setProgress() {
        const currentScroll = window.pageYOffset;
        const top = this.cache.rect.top - currentScroll; // this was the cached value so subtract the current scroll
        const { totalDist, windowHeight } = this.cache;

        // Percent the element has moved based on current and total distance to move
        let progress = 1 - (windowHeight - top) / totalDist;

        // NOTE: Clamping
        // Why? Because the isInView prop may be *slightly*
        // off since Intersection Observer to be pixel-perfect
        // accurate regardless.

        progress = clamp(progress, 0, 1);

        this.setState(() => ({
            progress,
        }));
    }

    render() {
        const { progress } = this.state;
        const { mapRef } = this;

        return this.props.children({ progress, mapRef });
    }
}

export default ViewportProgress;
