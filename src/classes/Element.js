import { createId } from '../utils/index';
import {
    getOffsets,
    isElementInView,
    percentMoved,
    setParallaxStyles,
} from '../helpers/index';
import { VERTICAL } from '../constants';
import Bounds from './Bounds';
import Rect from './Rect';

export class Element {
    constructor(options) {
        this.elInner = options.elInner;
        this.elOuter = options.elOuter;
        this.props = options.props;
        this.scrollAxis = options.scrollAxis;
        this.id = createId();
        this.offsets = getOffsets(this.props);
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
        this.rect = new Rect(this.elOuter, view, scroll);
        this.bounds = new Bounds(this.rect, this.offsets, view);
        return this;
    }

    _updatePositionHorizontal(view, scroll) {
        this.isInView = isElementInView(
            this.bounds.left,
            this.bounds.right,
            view.width,
            scroll.x
        );

        if (!this.isInView) return this;

        this.percent = percentMoved(
            this.rect.left,
            this.rect.originTotalDistX,
            view.width,
            scroll.x
        );

        setParallaxStyles(this.elInner, this.offsets, this.percent);

        return this;
    }

    _updatePositionVertical(view, scroll) {
        this.isInView = isElementInView(
            this.bounds.top,
            this.bounds.bottom,
            view.height,
            scroll.y
        );

        if (!this.isInView) return this;

        this.percent = percentMoved(
            this.rect.top,
            this.rect.originTotalDistY,
            view.height,
            scroll.y
        );

        setParallaxStyles(this.elInner, this.offsets, this.percent);

        return this;
    }
}
