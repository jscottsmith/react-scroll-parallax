"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactObserved = require("react-observed");

var _reactObserved2 = _interopRequireDefault(_reactObserved);

var _propValidation = require("../utils/propValidation");

var _index = require("./index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Parallax = function (_Component) {
    _inherits(Parallax, _Component);

    function Parallax() {
        _classCallCheck(this, Parallax);

        return _possibleConstructorReturn(this, (Parallax.__proto__ || Object.getPrototypeOf(Parallax)).apply(this, arguments));
    }

    _createClass(Parallax, [{
        key: "getWrapperClass",
        value: function getWrapperClass(isInView) {
            var className = this.props.className;

            var cx = "parallax-wrapper";
            cx = isInView ? cx + " is-in-view" : cx;
            cx = className ? cx + " " + className : cx;

            return cx;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            // NOTE: Each component in this tree provides a render
            // callback with necessary params to provide as props
            // for the child component
            //
            // It's not as bad as it looks. ;)
            //
            // <Observed> => ({ isInView, mapRef })
            // ↓
            // <ScrollPosition> => ({ scrollY })
            // ↓
            // <ViewportProgress> => ({ progress, mapRef, updateAttributeCache })
            // ↓
            // <ScrollEffects> => ({ style })
            // ↓
            // markup

            var _props = this.props,
                children = _props.children,
                x = _props.x,
                y = _props.y,
                scale = _props.scale,
                opacity = _props.opacity,
                observerOptions = _props.observerOptions,
                elementStyle = _props.elementStyle;

            // if child is a function, call it with updateAttributeCache

            var isFunc = children instanceof Function;

            // prettier-ignore
            return _react2.default.createElement(
                _reactObserved2.default,
                { initialViewState: true, options: observerOptions },
                function (_ref) {
                    var isInView = _ref.isInView,
                        observedRef = _ref.mapRef;
                    return _react2.default.createElement(
                        _index.ScrollPosition,
                        { isInView: isInView },
                        function (_ref2) {
                            var scrollY = _ref2.scrollY;
                            return _react2.default.createElement(
                                _index.ViewportProgress,
                                { isInView: isInView, scrollY: scrollY },
                                function (_ref3) {
                                    var progress = _ref3.progress,
                                        updateAttributeCache = _ref3.updateAttributeCache,
                                        viewportRef = _ref3.mapRef;
                                    return _react2.default.createElement(
                                        _index.ScrollEffects,
                                        { progress: progress, x: x, y: y, scale: scale, opacity: opacity },
                                        function (_ref4) {
                                            var style = _ref4.style;
                                            return _react2.default.createElement(
                                                "div",
                                                { className: _this2.getWrapperClass(isInView) },
                                                _react2.default.createElement(
                                                    _index.Bounds,
                                                    {
                                                        refCallbacks: [observedRef, viewportRef],
                                                        updateAttributeCache: updateAttributeCache,
                                                        scale: scale,
                                                        x: x,
                                                        y: y
                                                    },
                                                    _react2.default.createElement(
                                                        "div",
                                                        _defineProperty({ style: style, className: "parallax-element" }, "style", elementStyle),
                                                        isFunc ? children({ updateAttributeCache: updateAttributeCache, progress: progress, isInView: isInView }) : children
                                                    )
                                                )
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
            // prettier-ignore
        }
    }]);

    return Parallax;
}(_react.Component);

Parallax.defaultProps = {
    x: [0, 0],
    y: [0, 0],
    scale: [1, 1],
    opacity: [1, 1]
};
Parallax.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.element.isRequired, _propTypes2.default.func.isRequired]),
    className: _propTypes2.default.string,
    x: _propValidation.validateOffsets,
    y: _propValidation.validateOffsets,
    scale: _propValidation.validateScale,
    opacity: _propValidation.validateOpacity,
    observerOptions: _propTypes2.default.object,
    elementStyle: _propTypes2.default.object
    // @TODO: these should also be available:
    // rotation
    // tag/element name?
};
exports.default = Parallax;
module.exports = exports["default"];