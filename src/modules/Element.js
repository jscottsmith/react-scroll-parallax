import {
    createId,
    getOffsets,
    isElementInView,
    percentMoved,
    setParallaxStyles,
    getCache,
} from '../utils/index';
import { VERTICAL } from '../constants';

export class Element {
    constructor(options) {
        this.elInner = options.elInner;
        this.elOuter = options.elOuter;
        this.props = options.props;
        this.scrollAxis = options.scrollAxis;
        this.id = createId();
        this.offsets = getOffsets(this.props);
        this.cache = null;
        this.isInView = null;
    }

    updateProps(nextProps) {
        this.props = { ...this.props, ...nextProps };
        this.offsets = getOffsets(nextProps);
        return this;
    }

    setCachedAttributes(view, scroll) {
        this.cache = getCache({
            element: this.elOuter,
            offsets: this.offsets,
            view,
            scroll,
        });
        return this;
    }

    updatePosition(view, scroll) {
        if (this.scrollAxis === VERTICAL) {
            this.isInView = isElementInView(
                this.cache.top,
                this.cache.bottom,
                view.height,
                scroll.y
            );

            if (!this.isInView) return this;

            const percent = percentMoved(
                this.cache.originTop,
                this.cache.originTotalDistY,
                view.height,
                scroll.y
            );
            setParallaxStyles(this.elInner, this.offsets, percent);
        } else {
            this.isInView = isElementInView(
                this.cache.left,
                this.cache.right,
                view.width,
                scroll.x
            );

            if (!this.isInView) return this;

            const percent = percentMoved(
                this.cache.originLeft,
                this.cache.originTotalDistX,
                view.width,
                scroll.x
            );
            setParallaxStyles(this.elInner, this.offsets, percent);
        }

        return this;
    }
}
