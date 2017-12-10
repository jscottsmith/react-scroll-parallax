import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clamp from '../utils/clamp';

// Viewport Progress passes the progress prop
// to wrapped components with a default value ranging
// from 0–1. 0 if the elements bounds has not entered
// the beginning of the scroll area, 1 if the
// element has left.

class ViewportProgress extends Component {
    static defaultProps = {
        range: [0, 1],
    };

    static contextTypes = {
        resizeController: PropTypes.object, // not required because this could be rendered on the server.
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
        };
    }

    componentDidMount() {
        this.checkForRef();

        // subscribe to resize changes with handler to update cache
        const { resizeController } = this.context;
        resizeController.subscribe(this.updateAttributeCache);
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
        const { resizeController } = this.context;

        // Unsubscribe to resize updates by passing the subscribed handler
        resizeController.unsubscribe(this.updateAttributeCache);
    }

    checkForRef() {
        if (!this.el) {
            // @TODO: probably should clarify the error or provide a link to docs.
            throw new Error(
                "Must provide a ref of the element to track progress. Use the ({ mapRef }) from the render callback as the handler for the element's ref prop."
            );
        }
    }

    updateAttributeCache = () => {
        this.setAttributeCache();
    };

    mapRef = ref => {
        this.el = ref;
    };

    setAttributeCache() {
        // This caches properties that cause layout thrash

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

        // always update progress when cache updates.
        this.setProgress();
    }

    setProgress() {
        const currentScroll = window.pageYOffset;
        const top = this.cache.rect.top - currentScroll; // this was the cached value so subtract the current scroll
        const { totalDist, windowHeight } = this.cache;
        const { range } = this.props;

        // Percent the element has moved based on current and total distance to move
        let progress = (windowHeight - top) / totalDist;

        // NOTE: Clamping because the isInView prop may be *slightly*
        // off since Intersection Observer is not expected to be
        // pixel-perfect accurate. Regardless, we should never
        // exceed the given range.

        progress = clamp(progress, range[0], range[1]);

        this.setState(() => ({
            progress,
        }));
    }

    render() {
        const { progress } = this.state;
        const { mapRef, updateAttributeCache } = this;

        return this.props.children({ progress, mapRef, updateAttributeCache });
    }
}

export default ViewportProgress;
