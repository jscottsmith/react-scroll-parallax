'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clamp = require('../utils/clamp');

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Viewport Progress passes the progress prop
// to wrapped components with a default value ranging
// from 0–1. 0 if the elements bounds has not entered
// the beginning of the scroll area, 1 if the
// element has left.

var ViewportProgress = function (_Component) {
    _inherits(ViewportProgress, _Component);

    function ViewportProgress(props) {
        _classCallCheck(this, ViewportProgress);

        var _this = _possibleConstructorReturn(this, (ViewportProgress.__proto__ || Object.getPrototypeOf(ViewportProgress)).call(this));

        _this.updateAttributeCache = function () {
            _this.setAttributeCache();
        };

        _this.mapRef = function (ref) {
            _this.el = ref;
        };

        _this.state = {
            progress: props.range[0]
        };
        return _this;
    }

    _createClass(ViewportProgress, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.checkForRef();

            // subscribe to resize changes with handler to update cache
            var resizeController = this.context.resizeController;

            resizeController.subscribe(this.updateAttributeCache);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // if the scroll has changed, and the
            // element is in view start updating state
            // console.log(nextProps.scrollY);
            if (nextProps.isInView && nextProps.scrollY !== this.props.scrollY) {
                this.setProgress();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var resizeController = this.context.resizeController;

            // Unsubscribe to resize updates by passing the subscribed handler

            resizeController.unsubscribe(this.updateAttributeCache);
        }
    }, {
        key: 'checkForRef',
        value: function checkForRef() {
            if (!this.el) {
                // @TODO: probably should clarify the error or provide a link to docs.
                throw new Error("Must provide a ref of the element to track progress. Use the ({ mapRef }) from the render callback as the handler for the element's ref prop.");
            }
        }
    }, {
        key: 'setAttributeCache',
        value: function setAttributeCache() {
            // This caches properties that cause layout thrash

            var el = this.el;

            var _rect = el.getBoundingClientRect();
            var elHeight = el.offsetHeight;
            var elWidth = el.offsetWidth;
            var scrollY = window.pageYOffset;
            var html = document.documentElement;
            var windowHeight = window.innerHeight || html.clientHeight;
            var totalDist = windowHeight + elHeight;

            // add current scroll state
            var rect = {
                top: _rect.top + scrollY,
                bottom: _rect.bottom + scrollY,
                left: _rect.left,
                right: _rect.right
            };

            this.cache = {
                rect: rect,
                elHeight: elHeight,
                elWidth: elWidth,
                scrollY: scrollY,
                windowHeight: windowHeight,
                totalDist: totalDist
            };

            // always update progress when cache updates.
            this.setProgress();
        }
    }, {
        key: 'setProgress',
        value: function setProgress() {
            var currentScroll = window.pageYOffset;
            var top = this.cache.rect.top - currentScroll; // this was the cached value so subtract the current scroll
            var _cache = this.cache,
                totalDist = _cache.totalDist,
                windowHeight = _cache.windowHeight;
            var range = this.props.range;

            // Percent the element has moved based on current and total distance to move

            var progress = (windowHeight - top) / totalDist;

            // NOTE: Clamping because the isInView prop may be *slightly*
            // off since Intersection Observer is not expected to be
            // pixel-perfect accurate. Regardless, we should never
            // exceed the given range.

            progress = (0, _clamp2.default)(progress, range[0], range[1]);

            this.setState(function () {
                return {
                    progress: progress
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var progress = this.state.progress;
            var mapRef = this.mapRef,
                updateAttributeCache = this.updateAttributeCache;


            return this.props.children({ progress: progress, mapRef: mapRef, updateAttributeCache: updateAttributeCache });
        }
    }]);

    return ViewportProgress;
}(_react.Component);

ViewportProgress.defaultProps = {
    range: [0, 1]
};
ViewportProgress.contextTypes = {
    resizeController: _propTypes2.default.object // not required because this could be rendered on the server.
};
ViewportProgress.propTypes = {
    isInView: _propTypes2.default.bool.isRequired,
    range: _propTypes2.default.array.isRequired,
    scrollY: _propTypes2.default.number.isRequired
};
exports.default = ViewportProgress;
module.exports = exports['default'];