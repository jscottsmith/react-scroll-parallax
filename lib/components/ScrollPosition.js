'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactScrollParallax = require('react-scroll-parallax');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This component serves to connect via context
// to the ScrollController which provides the current
// scroll state that is then passed as a param
// of the child render callback.

// NOTE: Since the scroll state should only be updated when
// the element is in view, this component must be provided
// an isInView prop

var ScrollPosition = function (_Component) {
    _inherits(ScrollPosition, _Component);

    function ScrollPosition() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ScrollPosition);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScrollPosition.__proto__ || Object.getPrototypeOf(ScrollPosition)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            scrollY: 0 // value for server so no required props throw
        }, _this.updateScroll = function (_ref2) {
            var scrollY = _ref2.scrollY;
            var isInView = _this.props.isInView;

            // only updates the scrollY when the element is in view

            if (isInView) {
                _this.setState(function () {
                    return {
                        scrollY: scrollY
                    };
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ScrollPosition, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var scrollController = this.context.scrollController;

            // Make sure this is server safe

            var hasWindow = typeof window !== 'undefined';

            // Make sure the provided context is an instance of the controller
            var hasController = scrollController instanceof _reactScrollParallax.ScrollController;

            // if this has the window and no controller throw an error
            if (hasWindow && !hasController) {
                throw new Error("No scrollController exist in context. Must wrap your application's <Parallax> components in a <ScrollProvider />.");
            }

            // Subscribe to scroll updates by passing
            // a handler to setState of current scroll
            if (hasWindow) {
                scrollController.subscribe(this.updateScroll);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var scrollController = this.context.scrollController;

            // Unsubscribe to scroll updates by passing
            // the subscribed scroll handler

            scrollController.unsubscribe(this.updateScroll);
        }
    }, {
        key: 'render',
        value: function render() {
            var scrollY = this.state.scrollY;

            return this.props.children({ scrollY: scrollY });
        }
    }]);

    return ScrollPosition;
}(_react.Component);

ScrollPosition.contextTypes = {
    scrollController: _propTypes2.default.object // not required because this could be rendered on the server.
};
ScrollPosition.propTypes = {
    isInView: _propTypes2.default.bool.isRequired
};
exports.default = ScrollPosition;
module.exports = exports['default'];