'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../utils/index');

var _Subscribers2 = require('./Subscribers');

var _Subscribers3 = _interopRequireDefault(_Subscribers2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * -------------------------------------------------------
 * Scroll Controller
 * -------------------------------------------------------
 *
 * The scroll controller for setting up window
 * scroll event and storing the scroll position
 *
 */

var ScrollController = function (_Subscribers) {
    _inherits(ScrollController, _Subscribers);

    function ScrollController() {
        _classCallCheck(this, ScrollController);

        var _this = _possibleConstructorReturn(this, (ScrollController.__proto__ || Object.getPrototypeOf(ScrollController)).call(this));

        _this.state = {
            scrollY: 0
        };
        _this.supportsPassive = (0, _index.testForPassiveScroll)();

        _this._handleScroll = function () {
            // Save current scroll
            var scrollY = window.pageYOffset; // Supports IE 9 and up.

            _this.setState({
                scrollY: scrollY
            });
        };

        _this._addListeners();
        return _this;
    }

    _createClass(ScrollController, [{
        key: '_addListeners',
        value: function _addListeners() {
            window.addEventListener('scroll', this._handleScroll, this.listenerOptions);
        }
    }, {
        key: '_removeListeners',
        value: function _removeListeners() {
            window.removeEventListener('scroll', this._handleScroll, this.listenerOptions);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this._removeListeners();
        }
    }, {
        key: 'listenerOptions',


        // Passive support test
        get: function get() {
            return this.supportsPassive ? { passive: true } : false;
        }

        // Window scroll handler. Sets the 'scrollY'

    }], [{
        key: 'init',
        value: function init() {
            return new ScrollController();
        }

        // Tracks current scroll y distance

    }]);

    return ScrollController;
}(_Subscribers3.default);

exports.default = ScrollController;
module.exports = exports['default'];