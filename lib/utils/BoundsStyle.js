'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoundsStyle = function () {
        function BoundsStyle() {
                _classCallCheck(this, BoundsStyle);

                this.bounds = {
                        mt: 0,
                        mb: 0,
                        ml: 0,
                        mr: 0
                };
        }

        _createClass(BoundsStyle, [{
                key: 'transformBoundsScale',
                value: function transformBoundsScale(scale, w, h) {
                        var newBounds = Object.assign({}, this.bounds);

                        var scaleMax = Math.max(scale[0], scale[1]);
                        var halfDeltaX = (w * scaleMax - w) / 2;
                        var halfDeltaY = (h * scaleMax - h) / 2;

                        newBounds.mt = newBounds.mt - halfDeltaY;
                        newBounds.mb = newBounds.mb - halfDeltaY;
                        newBounds.ml = newBounds.ml - halfDeltaX;
                        newBounds.mr = newBounds.mr - halfDeltaX;

                        this.bounds = newBounds;

                        return this;
                }
        }, {
                key: 'transformBoundsY',
                value: function transformBoundsY(y, h) {
                        var newBounds = Object.assign({}, this.bounds);

                        var hasYPercent = y[0].unit === '%';

                        var y0 = y[0].value;
                        var y1 = y[1].value;

                        // transform percent to px
                        var value0 = hasYPercent ? y0 / 100 * h : y0;
                        var value1 = hasYPercent ? y1 / 100 * h : y1;

                        var yMin = Math.min(value0, value1);
                        var yMax = Math.max(value0, value1);

                        newBounds.mt = newBounds.mt + yMin;
                        newBounds.mb = newBounds.mb - yMax;

                        this.bounds = newBounds;

                        return this;
                }
        }, {
                key: 'transformBoundsX',
                value: function transformBoundsX(x, w) {
                        var newBounds = Object.assign({}, this.bounds);

                        var hasXPercent = x[0].unit === '%';

                        var x0 = x[0].value;
                        var x1 = x[1].value;

                        // transform percent to px
                        var value0 = hasXPercent ? x0 / 100 * w : x0;
                        var value1 = hasXPercent ? x1 / 100 * w : x1;

                        var xMin = Math.min(value0, value1);
                        var xMax = Math.max(value0, value1);

                        newBounds.ml = newBounds.ml + xMin;
                        newBounds.mr = newBounds.mr - xMax;

                        this.bounds = newBounds;

                        return this;
                }
        }, {
                key: 'boundsStyle',
                get: function get() {
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
        }]);

        return BoundsStyle;
}();

exports.default = BoundsStyle;
module.exports = exports['default'];