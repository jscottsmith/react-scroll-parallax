import React, { Component } from 'react';
import { parseOffsetUnits } from '../utils';
import PropTypes from 'prop-types';

class Bounds extends Component {
    static propTypes = {
        x: PropTypes.array,
        y: PropTypes.array,
        scale: PropTypes.array,
        children: PropTypes.node.isRequired,
        refCallbacks: PropTypes.array.isRequired,
        updateAttributeCache: PropTypes.func.isRequired,
    };

    static contextTypes = {
        resizeController: PropTypes.object, // not required because this could be rendered on the server.
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

    mapAllRefs = ref => {
        // NOTE: add our local ref callback along with all refCallbacks provided in props

        const callbacks = [...this.props.refCallbacks, this.mapRefElement];
        callbacks.forEach(f => f(ref));
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

        // NOTE: Temporary border added to debug
        const border = '1px dotted tomato';

        let height = 0;
        let width = 0;

        let mt = 0;
        let mb = 0;
        let ml = 0;
        let mr = 0;
        let pt = 0;
        let pb = 0;
        let pl = 0;
        let pr = 0;

        const hasScale = scale;
        const hasYPercent = y[0].unit === '%';
        const hasXPercent = x[0].unit === '%';

        // NOTE: Only need the height/width if we are using percent
        // as a unit, or scale as an effect. Also only want to get
        // this on the initial mount when no styles have been applied.
        // let boundingRect;
        if (hasYPercent || hasXPercent || hasScale) {
            const computedStyle = getComputedStyle(this.el);

            height = this.el.clientHeight; // height with padding
            width = this.el.clientWidth; // width with padding

            height -=
                parseFloat(computedStyle.paddingTop) +
                parseFloat(computedStyle.paddingBottom);
            width -=
                parseFloat(computedStyle.paddingLeft) +
                parseFloat(computedStyle.paddingRight);
        }

        if (y) {
            const y0 = y[0].value;
            const y1 = y[1].value;

            // transform percent to px
            const value0 = hasYPercent ? y0 / 100 * height : y0;
            const value1 = hasYPercent ? y1 / 100 * height : y1;

            const yMin = Math.min(value0, value1);
            const yMax = Math.max(value0, value1);

            mt = mt + yMin;
            mb = mb - yMax;
            pt = pt + yMin * -1;
            pb = pb + yMax;
        }

        if (x) {
            const x0 = x[0].value;
            const x1 = x[1].value;

            // transform percent to px
            const value0 = hasXPercent ? x0 / 100 * width : x0;
            const value1 = hasXPercent ? x1 / 100 * width : x1;

            const xMin = Math.min(value0, value1);
            const xMax = Math.max(value0, value1);

            ml = ml + xMin;
            mr = mr - xMax;
            pl = pl + xMin * -1;
            pr = pr + xMax;
        }

        if (scale) {
            const scaleMax = Math.max(scale[0], scale[1]);
            const halfDeltaX = (width * scaleMax - width) / 2;
            const halfDeltaY = (height * scaleMax - height) / 2;

            mt = mt - halfDeltaY;
            mb = mb - halfDeltaY;
            ml = ml - halfDeltaX;
            mr = mr - halfDeltaX;
            pt = mt * -1;
            pb = mb * -1;
            pl = ml * -1;
            pr = mr * -1;
        }

        const boundsStyle = {
            marginTop: mt,
            marginBottom: mb,
            marginLeft: ml,
            marginRight: mr,
            paddingTop: pt,
            paddingBottom: pb,
            paddingLeft: pl,
            paddingRight: pr,
            border,
        };

        this.setState(
            () => ({
                boundsStyle,
            }),
            // NOTE: Since ViewportProgress caches the initial
            // bounds on mount it needs to be updated once the
            // bounds style is updated with the correct size
            // that accounts for offsets.
            this.props.updateAttributeCache
        );
    }

    render() {
        const { refCallbacks, children } = this.props;
        const { boundsStyle } = this.state;

        return (
            <div
                className="parallax-bounds"
                style={boundsStyle}
                ref={this.mapAllRefs}
            >
                {children}
            </div>
        );
    }
}

export default Bounds;
