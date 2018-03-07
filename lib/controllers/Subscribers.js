'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../utils/index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * -------------------------------------------------------
 * Subscribers
 * -------------------------------------------------------
 *
 * Base class for controlling subscriptions
 * Manages Subscribers and updates them when state changes.
 *
 */

var Subscribers = function () {
    function Subscribers() {
        var _this = this;

        _classCallCheck(this, Subscribers);

        this.subscriptions = [];
        this.state = {};

        this._updateSubscribers = function () {
            _this.subscriptions.forEach(function (cb) {
                return cb(_this.state);
            });
        };

        this._updateSingleSubscriber = function (cb) {
            cb(_this.state);
        };
    }
    // Subscriptions to the controller


    _createClass(Subscribers, [{
        key: 'setState',
        value: function setState(nextState) {
            this.state = Object.assign({}, this.state, nextState);
            this._updateSubscribers();
        }
    }, {
        key: 'subscribe',
        value: function subscribe(cb) {
            this.subscriptions.push(cb);
            this._updateSingleSubscriber(cb);
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe(cb) {
            this.subscriptions = this.subscriptions.filter(function (x) {
                return cb !== x;
            });
        }
    }]);

    return Subscribers;
}();

exports.default = Subscribers;
module.exports = exports['default'];