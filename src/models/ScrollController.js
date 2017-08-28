import { testForPassiveScroll } from '../utils/index';

/**
 * -------------------------------------------------------
 * Scroll Controller
 * -------------------------------------------------------
 *
 * The scroll controller for setting up window
 * scroll event and storing the scroll position
 *
 */

class ScrollController {
    constructor() {
        this._addListeners();
    }

    static init() {
        return new ScrollController();
    }

    // Tracks current scroll y distance
    state = {
        scrollY: 0,
    };

    // Subscriptions to the controller
    subscriptions = [];

    // Passive support test
    supportsPassive = testForPassiveScroll();

    // Window scroll handler. Sets the 'scrollY'
    _handleScroll = () => {
        // Save current scroll
        const scrollY = window.pageYOffset; // Supports IE 9 and up.

        this.state = {
            scrollY,
        };

        // update subscribers
        // window.requestAnimationFrame(this._updateSubscribers);
        this._updateSubscribers();
    };

    _updateSubscribers = () => {
        this.subscriptions.forEach(f => f(this.state));
    };

    _addListeners() {
        window.addEventListener(
            'scroll',
            this._handleScroll,
            this.supportsPassive ? { passive: true } : false
        );
    }

    _removeListeners() {
        window.removeEventListener(
            'scroll',
            this._handleScroll,
            this.supportsPassive ? { passive: true } : false
        );
    }

    destroy() {
        this._removeListeners();
    }

    subscribe(f) {
        this.subscriptions.push(f);
    }

    unsubscribe(f) {
        this.subscriptions = this.subscriptions.filter(x => f !== x);
    }
}

export default ScrollController;
