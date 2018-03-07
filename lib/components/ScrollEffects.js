'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultVal = {
    value: 0,
    unit: 'px'
};

var defaultValNoUnit = {
    value: 1,
    unit: ''
};

var ScrollEffects = function (_Component) {
    _inherits(ScrollEffects, _Component);

    function ScrollEffects() {
        _classCallCheck(this, ScrollEffects);

        return _possibleConstructorReturn(this, (ScrollEffects.__proto__ || Object.getPrototypeOf(ScrollEffects)).apply(this, arguments));
    }

    _createClass(ScrollEffects, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.parseOffsetUnits();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.y !== prevProps.y || this.props.x !== prevProps.x || this.props.scale !== prevProps.scale) {
                this.parseOffsetUnits();
            }
        }
    }, {
        key: 'parseOffsetUnits',
        value: function parseOffsetUnits() {
            this.offsets = (0, _utils.parseOffsetUnits)(this.props);
        }
    }, {
        key: 'scaleValues',
        value: function scaleValues() {
            var _props = this.props,
                progress = _props.progress,
                opacity = _props.opacity,
                scale = _props.scale;
            var _offsets = this.offsets,
                x = _offsets.x,
                y = _offsets.y;

            // Only scale a value if one exists

            var hasX = typeof x !== 'undefined';
            var hasY = typeof y !== 'undefined';
            var hasScale = typeof scale !== 'undefined';
            var hasOpacity = typeof opacity !== 'undefined';

            var values = {
                x: defaultVal,
                y: defaultVal,
                scale: defaultValNoUnit,
                opacity: defaultValNoUnit
            };

            if (hasX) {
                values.x = {
                    value: (0, _utils.scaleBetween)(progress, x[0].value, x[1].value, 0, 1),
                    unit: x[0].unit
                };
            }
            if (hasY) {
                values.y = {
                    value: (0, _utils.scaleBetween)(progress, y[0].value, y[1].value, 0, 1),
                    unit: y[0].unit
                };
            }
            if (hasScale) {
                values.scale = {
                    value: (0, _utils.scaleBetween)(progress, scale[0], scale[1], 0, 1),
                    unit: null
                };
            }
            if (hasOpacity) {
                values.opacity = {
                    value: (0, _utils.scaleBetween)(progress, opacity[0], opacity[1], 0, 1),
                    unit: null
                };
            }

            return values;
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var _scaleValues = this.scaleValues(),
                x = _scaleValues.x,
                y = _scaleValues.y,
                opacity = _scaleValues.opacity,
                scale = _scaleValues.scale;

            var translateTransform = 'translate3d(' + x.value + x.unit + ', ' + y.value + y.unit + ', 0)';
            var scaleTransform = 'scale(' + scale.value + ')';

            return {
                opacity: opacity.value,
                transform: translateTransform + ' ' + scaleTransform
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var style = this.getStyles();

            return this.props.children({ style: style });
        }
    }]);

    return ScrollEffects;
}(_react.Component);

ScrollEffects.propTypes = {
    progress: _propTypes2.default.number.isRequired,
    x: _propTypes2.default.array,
    y: _propTypes2.default.array,
    scale: _propTypes2.default.array,
    opacity: _propTypes2.default.array,
    children: _propTypes2.default.func.isRequired
};
exports.default = ScrollEffects;
module.exports = exports['default'];