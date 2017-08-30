import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clamp from '../utils/clamp';

// With Viewport Progress passes the progress prop
// to wrapped components with a value ranging from
// 0–1. 0 if the element has not entered the beggining
// of the scroll area, 1 if the element has left.

export default function withViewportProgress(WrappedComponent, range = [0, 1]) {
    return class ViewportProgress extends PureComponent {
        static propTypes = {
            scrollY: PropTypes.number.isRequired,
        };

        state = {
            progress: range[0],
            window: false,
        };

        componentDidMount() {
            this.setAttributeCache();
            this.addListeners();
        }

        componentWillUnmount() {}

        componentWillReceiveProps(nextProps) {
            // if the scroll has changed, and the
            // element is in view start updating state
            // console.log(nextProps.scrollY);
            if (
                nextProps.isInView &&
                nextProps.scrollY !== this.props.scrollY
            ) {
                this.setProgress();
            }
        }

        addListeners() {
            window.addEventListener('resize', this.setAttributeCache, false);
        }

        removeListeners() {
            window.removeEventListener('resize', this.setAttributeCache, false);
        }

        setAttributeCache = () => {
            // cache layout thrashers
            // @TODO: update on resize

            // Accesing the ref of the wrapped component
            const el = this.wrapped.innerRef;

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
        };

        setProgress() {
            const currentScroll = window.pageYOffset;
            const top = this.cache.rect.top - currentScroll; // this was the cached value so subtract the current scroll
            const { totalDist, windowHeight } = this.cache;

            // Percent the element has moved based on current and total distance to move
            const movedValue = 1 - (windowHeight - top) / totalDist;

            // clamp
            // Why? I think because the isInView prop is *slightly*
            // off since the observer is from 0.1 - 1.0. Shouldn't
            // expect the Intersection Observer to be pixel-perfect
            // accurate regardless.
            const progress = clamp(movedValue, 0, 1);
            // console.log(progress);

            this.setState(() => ({
                progress,
            }));
        }

        mapRef = ref => {
            this.wrapped = ref;
        };

        render() {
            const { progress } = this.state;
            return (
                <WrappedComponent
                    progress={progress}
                    ref={this.mapRef}
                    {...this.props}
                />
            );
        }
    };
}
