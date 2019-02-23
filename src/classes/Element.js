import { createId } from '../utils/index';
import {
    getOffsets,
    isElementInView,
    percentMoved,
    setParallaxStyles,
    getCache,
} from '../helpers/index';
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
        this.percent = 0;

        this.updatePosition =
            options.scrollAxis === VERTICAL
                ? this._updatePositionVertical
                : this._updatePositionHorizontal;
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

    _updatePositionHorizontal(view, scroll) {
        this.isInView = isElementInView(
            this.cache.left,
            this.cache.right,
            view.width,
            scroll.x
        );

        if (!this.isInView) return this;

        this.percent = percentMoved(
            this.cache.originLeft,
            this.cache.originTotalDistX,
            view.width,
            scroll.x
        );

        setParallaxStyles(this.elInner, this.offsets, this.percent);

        return this;
    }

    _updatePositionVertical(view, scroll) {
        this.isInView = isElementInView(
            this.cache.top,
            this.cache.bottom,
            view.height,
            scroll.y
        );

        if (!this.isInView) return this;

        this.percent = percentMoved(
            this.cache.originTop,
            this.cache.originTotalDistY,
            view.height,
            scroll.y
        );

        setParallaxStyles(this.elInner, this.offsets, this.percent);

        return this;
    }
}
