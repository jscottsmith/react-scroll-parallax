import {
    createId,
    addOffsets,
    addAttributesHorizontal,
    addAttributesVertical,
    isElementInView,
    percentMoved,
    setParallaxStyles,
} from '../utils/index';
import { VERTICAL } from '../constants';

export class Element {
    constructor(options) {
        this.elInner = options.elInner;
        this.elOuter = options.elOuter;
        this.props = options.props;
        this.scrollAxis = options.scrollAxis;
        this.id = createId();
        this.offsets = addOffsets(this.props);
        this.attributes = null;
        this.isInView = null;
    }

    updateProps(props) {
        this.props = props;
        this.offsets = addOffsets(props);
        return this;
    }

    setCachedAttributes = (view, scroll) => {
        if (this.scrollAxis === VERTICAL) {
            this.attributes = addAttributesVertical(
                this.elOuter,
                this.offsets,
                view.height,
                scroll.y
            );
        } else {
            this.attributes = addAttributesHorizontal(
                this.elOuter,
                this.offsets,
                view.width,
                scroll.x
            );
        }
    };

    updatePosition(view, scroll) {
        if (this.scrollAxis === VERTICAL) {
            this.isInView = isElementInView(
                this.attributes.top,
                this.attributes.bottom,
                view.height,
                scroll.y
            );

            if (!this.isInView) return;
            const percent = percentMoved(
                this.attributes.originTop,
                this.attributes.originTotalDist,
                view.height,
                scroll.y
            );
            setParallaxStyles(this.elInner, this.offsets, percent);
        } else {
            this.isInView = isElementInView(
                this.attributes.left,
                this.attributes.right,
                view.width,
                scroll.x
            );
            if (!this.isInView) return;
            const percent = percentMoved(
                this.attributes.originLeft,
                this.attributes.originTotalDist,
                view.width,
                scroll.x
            );
            setParallaxStyles(this.elInner, this.offsets, percent);
        }
    }
}
