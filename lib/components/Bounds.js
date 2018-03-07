'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bounds = function (_Component) {
    _inherits(Bounds, _Component);

    function Bounds() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Bounds);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bounds.__proto__ || Object.getPrototypeOf(Bounds)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            boundsStyle: {}
        }, _this.handleResize = function () {
            _this.setBoundsStyle();
        }, _this.mapRefElement = function (ref) {
            _this.el = ref;
        }, _this.mapAllRefs = function (ref) {
            // NOTE: add our local ref callback along
            // with all refCallbacks provided in props

            var callbacks = [].concat(_toConsumableArray(_this.props.refCallbacks), [_this.mapRefElement]);
            callbacks.forEach(function (f) {
                return f(ref);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Bounds, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.parseOffsetUnits();

            // subscribe to resize changes with handler to update bounds
            var resizeController = this.context.resizeController;

            resizeController.subscribe(this.handleResize);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.minHeight !== this.props.minHeight || this.props.y !== prevProps.y || this.props.x !== prevProps.x || this.props.scale !== prevProps.scale) {
                this.parseOffsetUnits();
                this.setBoundsStyle();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var resizeController = this.context.resizeController;

            // Unsubscribe to resize updates by passing the subscribed handler

            resizeController.unsubscribe(this.handleResize);
        }
    }, {
        key: 'parseOffsetUnits',
        value: function parseOffsetUnits() {
            this.offsets = (0, _utils.parseOffsetUnits)(this.props);
        }
    }, {
        key: 'setBoundsStyle',
        value: function setBoundsStyle() {
            var _offsets = this.offsets,
                x = _offsets.x,
                y = _offsets.y;
            var _props = this.props,
                scale = _props.scale,
                minHeight = _props.minHeight;
            var el = this.el;


            var boundsStyle = (0, _utils.createBoundsStyle)(x, y, scale, el, minHeight);

            this.setState(function () {
                return {
                    boundsStyle: boundsStyle
                };
            },
            // NOTE: Since ViewportProgress caches the initial
            // bounds on mount it needs to be updated once the
            // bounds style is updated with the correct size
            // that accounts for offsets.
            this.props.updateAttributeCache);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                refCallbacks = _props2.refCallbacks,
                children = _props2.children;
            var boundsStyle = this.state.boundsStyle;


            return _react2.default.createElement(
                'div',
                {
                    className: 'parallax-bounds',
                    style: boundsStyle,
                    ref: this.mapAllRefs
                },
                children
            );
        }
    }]);

    return Bounds;
}(_react.Component);

Bounds.propTypes = {
    x: _propTypes2.default.array.isRequired,
    y: _propTypes2.default.array.isRequired,
    scale: _propTypes2.default.array.isRequired,
    children: _propTypes2.default.node.isRequired,
    refCallbacks: _propTypes2.default.array.isRequired,
    updateAttributeCache: _propTypes2.default.func.isRequired
};
Bounds.contextTypes = {
    resizeController: _propTypes2.default.object // not required because this could be rendered on the server.
};
exports.default = Bounds;
module.exports = exports['default'];