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
        this.subscriptions.forEach(f => f(this.state));
    };

    _updateSingleSubscriber = f => {
        f(this.state);
    };

    setState(nextState) {
        this.state = Object.assign({}, this.state, nextState);
        this._updateSubscribers();
    }

    subscribe(f) {
        this.subscriptions.push(f);
        this._updateSingleSubscriber(f);
    }

    unsubscribe(f) {
        this.subscriptions = this.subscriptions.filter(x => f !== x);
    }
}

export default Subscribers;
