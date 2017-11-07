import { testForPassiveResize } from '../utils/index';
import Subscribers from './Subscribers';

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

class ResizeController extends Subscribers {
    constructor() {
        super();
        this._addListeners();
    }

    static init() {
        return new ResizeController();
    }

    state = {
        width: 0,
    };

    _handleResize = () => {
        const width = window.innerWidth;

        this.setState({
            width,
        });
    };

    _addListeners() {
        window.addEventListener('resize', this._handleResize, false);
    }

    _removeListeners() {
        window.removeEventListener('resize', this._handleResize, false);
    }

    destroy() {
        this._removeListeners();
    }
}

export default ResizeController;
