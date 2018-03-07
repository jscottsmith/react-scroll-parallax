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
 * Resize Controller
 * -------------------------------------------------------
 *
 * The resize controller for setting up window
 * resize event and updating subscribers when the
 * window size has changed.
 *
 */

var ResizeController = function (_Subscribers) {
    _inherits(ResizeController, _Subscribers);

    function ResizeController() {
        _classCallCheck(this, ResizeController);

        var _this = _possibleConstructorReturn(this, (ResizeController.__proto__ || Object.getPrototypeOf(ResizeController)).call(this));

        _this.state = {
            width: 0
        };

        _this._handleResize = function () {
            var width = window.innerWidth;

            _this.setState({
                width: width
            });
        };

        _this._addListeners();
        return _this;
    }

    _createClass(ResizeController, [{
        key: '_addListeners',
        value: function _addListeners() {
            window.addEventListener('resize', this._handleResize, false);
        }
    }, {
        key: '_removeListeners',
        value: function _removeListeners() {
            window.removeEventListener('resize', this._handleResize, false);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this._removeListeners();
        }
    }], [{
        key: 'init',
        value: function init() {
            return new ResizeController();
        }
    }]);

    return ResizeController;
}(_Subscribers3.default);

exports.default = ResizeController;
module.exports = exports['default'];