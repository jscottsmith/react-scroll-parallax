import React, { Component } from 'react';
import { parseOffsetUnits, createBoundsStyle } from '../utils';
import PropTypes from 'prop-types';

class Bounds extends Component {
    static propTypes = {
        x: PropTypes.array.isRequired,
        y: PropTypes.array.isRequired,
        scale: PropTypes.array.isRequired,
        children: PropTypes.node.isRequired,
        refCallbacks: PropTypes.array.isRequired,
        updateAttributeCache: PropTypes.func.isRequired,
    };

    static contextTypes = {
        resizeController: PropTypes.object, // not required because this could be rendered on the server.
    };

    state = {
        boundsStyle: {},
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
        // NOTE: add our local ref callback along
        // with all refCallbacks provided in props

        const callbacks = [...this.props.refCallbacks, this.mapRefElement];
        callbacks.forEach(f => f(ref));
    };

    setBoundsStyle() {
        const { x, y } = this.offsets;
        const { scale } = this.props;
        const { el } = this;

        const boundsStyle = createBoundsStyle(x, y, scale, el);

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
