export default class BoundsStyle {
    bounds = {
        mt: 0,
        mb: 0,
        ml: 0,
        mr: 0
    };

    get boundsStyle() {
        return {
            marginTop: this.bounds.mt,
            marginBottom: this.bounds.mb,
            marginLeft: this.bounds.ml,
            marginRight: this.bounds.mr,
            paddingTop: this.bounds.mt * -1,
            paddingBottom: this.bounds.mb * -1,
            paddingLeft: this.bounds.ml * -1,
            paddingRight: this.bounds.mr * -1
        };
    }

    transformBoundsScale(scale, w, h) {
        const newBounds = Object.assign({}, this.bounds);

        const scaleMax = Math.max(scale[0], scale[1]);
        const halfDeltaX = (w * scaleMax - w) / 2;
        const halfDeltaY = (h * scaleMax - h) / 2;

        newBounds.mt = newBounds.mt - halfDeltaY;
        newBounds.mb = newBounds.mb - halfDeltaY;
        newBounds.ml = newBounds.ml - halfDeltaX;
        newBounds.mr = newBounds.mr - halfDeltaX;

        this.bounds = newBounds;

        return this;
    }

    transformBoundsY(y, h) {
        const newBounds = Object.assign({}, this.bounds);

        const hasYPercent = y[0].unit === '%';

        const y0 = y[0].value;
        const y1 = y[1].value;

        // transform percent to px
        const value0 = hasYPercent ? y0 / 100 * h : y0;
        const value1 = hasYPercent ? y1 / 100 * h : y1;

        const yMin = Math.min(value0, value1);
        const yMax = Math.max(value0, value1);

        newBounds.mt = newBounds.mt + yMin;
        newBounds.mb = newBounds.mb - yMax;

        this.bounds = newBounds;

        return this;
    }

    transformBoundsX(x, w) {
        const newBounds = Object.assign({}, this.bounds);

        const hasXPercent = x[0].unit === '%';

        const x0 = x[0].value;
        const x1 = x[1].value;

        // transform percent to px
        const value0 = hasXPercent ? x0 / 100 * w : x0;
        const value1 = hasXPercent ? x1 / 100 * w : x1;

        const xMin = Math.min(value0, value1);
        const xMax = Math.max(value0, value1);

        newBounds.ml = newBounds.ml + xMin;
        newBounds.mr = newBounds.mr - xMax;

        this.bounds = newBounds;

        return this;
    }
}
