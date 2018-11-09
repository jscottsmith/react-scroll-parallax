'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propValidation = require('../utils/propValidation');

var _ParallaxController = require('../libs/ParallaxController');

var _ParallaxController2 = _interopRequireDefault(_ParallaxController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Parallax = function (_Component) {
    _inherits(Parallax, _Component);

    function Parallax() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Parallax);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Parallax.__proto__ || Object.getPrototypeOf(Parallax)).call.apply(_ref, [this].concat(args))), _this), _this.mapRefOuter = function (ref) {
            _this._outer = ref;
        }, _this.mapRefInner = function (ref) {
            _this._inner = ref;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Parallax, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Make sure the provided controller is an instance of the Parallax Controller
            var isInstance = this.controller instanceof _ParallaxController2.default;

            // Throw if neither context or global is available
            if (!this.controller && !isInstance) {
                throw new Error("Must wrap your application's <Parallax /> components in a <ParallaxProvider />.");
            }

            // Deprecation warning for <=1.0.0
            // If no context is available but the window global is then warn
            if (!this.context.parallaxController && window.ParallaxController) {
                console.log('Calling ParallaxController.init() has been deprecated in favor of using the <ParallaxProvider /> component. For usage details see: https://github.com/jscottsmith/react-scroll-parallax/tree/v1.1.0#usage');
            }

            // create a new parallax element and save the reference
            this.element = this.controller.createElement({
                elInner: this._inner,
                elOuter: this._outer,
                props: {
                    disabled: this.props.disabled,
                    offsetXMax: this.props.offsetXMax,
                    offsetXMin: this.props.offsetXMin,
                    offsetYMax: this.props.offsetYMax,
                    offsetYMin: this.props.offsetYMin,
                    slowerScrollRate: this.props.slowerScrollRate
                }
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // updates the elements props when relevant parallax props change
            if (this.props.disabled !== nextProps.disabled || this.props.offsetXMax !== nextProps.offsetXMax || this.props.offsetXMin !== nextProps.offsetXMin || this.props.offsetYMax !== nextProps.offsetYMax || this.props.offsetYMin !== nextProps.offsetYMin || this.props.slowerScrollRate !== nextProps.slowerScrollRate) {
                this.controller.updateElement(this.element, {
                    props: {
                        disabled: nextProps.disabled,
                        offsetXMax: nextProps.offsetXMax,
                        offsetXMin: nextProps.offsetXMin,
                        offsetYMax: nextProps.offsetYMax,
                        offsetYMin: nextProps.offsetYMin,
                        slowerScrollRate: nextProps.slowerScrollRate
                    }
                });
            }
            // resets element styles when disabled
            if (this.props.disabled !== nextProps.disabled && nextProps.disabled) {
                this.controller.resetElementStyles(this.element);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.controller.removeElement(this.element);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                Tag = _props.tag,
                styleOuter = _props.styleOuter,
                styleInner = _props.styleInner;


            var rootClass = 'parallax-outer' + (className ? ' ' + className : '');

            return _react2.default.createElement(
                Tag,
                {
                    className: rootClass,
                    ref: this.mapRefOuter,
                    style: styleOuter
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'parallax-inner',
                        ref: this.mapRefInner,
                        style: styleInner
                    },
                    children
                )
            );
        }
    }, {
        key: 'controller',
        get: function get() {
            // Legacy versions may use the global, not context
            return this.context.parallaxController || window.ParallaxController;
        }

        // refs

    }]);

    return Parallax;
}(_react.Component);

Parallax.defaultProps = {
    disabled: false,
    offsetYMax: 0,
    offsetYMin: 0,
    offsetXMax: 0,
    offsetXMin: 0,
    slowerScrollRate: false, // determines whether scroll rate is faster or slower than standard scroll
    tag: 'div'
};
Parallax.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool.isRequired,
    offsetXMax: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    offsetXMin: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    offsetYMax: _propValidation.offsetMax,
    offsetYMin: _propValidation.offsetMin,
    slowerScrollRate: _propTypes2.default.bool.isRequired,
    styleOuter: _propTypes2.default.object,
    styleInner: _propTypes2.default.object,
    tag: _propTypes2.default.string.isRequired
};
Parallax.contextTypes = {
    parallaxController: _propTypes2.default.object // not required because this could be rendered on the server.
};
exports.default = Parallax;
module.exports = exports['default'];