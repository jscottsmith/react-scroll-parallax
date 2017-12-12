import { testForPassiveScroll } from '../utils/index';

/**
 * -------------------------------------------------------
 * Subscribers
 * -------------------------------------------------------
 *
 * Base class for controlling subscriptions
 * Manages Subscribers and updates them when state changes.
 *
 */

class Subscribers {
    // Subscriptions to the controller
    subscriptions = [];

    state = {};

    _updateSubscribers = () => {
        this.subscriptions.forEach(cb => cb(this.state));
    };

    _updateSingleSubscriber = cb => {
        cb(this.state);
    };

    setState(nextState) {
        this.state = Object.assign({}, this.state, nextState);
        this._updateSubscribers();
    }

    subscribe(cb) {
        this.subscriptions.push(cb);
        this._updateSingleSubscriber(cb);
    }

    unsubscribe(cb) {
        this.subscriptions = this.subscriptions.filter(x => cb !== x);
    }
}

export default Subscribers;
