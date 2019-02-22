import { testForPassiveScroll, resetStyles } from '../utils/index';

import { View } from './View';
import { Scroll } from './Scroll';
import { Element } from './Element';
import { VERTICAL } from '../constants';

/**
 * -------------------------------------------------------
 * Parallax Controller
 * -------------------------------------------------------
 *
 * The global controller for setting up window scroll/resize
 * listeners, managing and caching parallax element positions,
 * determining which elements are inside the viewport based on
 * scroll position, and then updating parallax element styles
 * based on x/y offsets and current scroll position.
 *
 */
function ParallaxController({ scrollAxis = VERTICAL, scrollContainer }) {
    // All parallax elements to be updated
    let elements = [];

    const hasScrollContainer = !!scrollContainer;
    const viewEl = scrollContainer || window;

    // Scroll and View
    const x = hasScrollContainer ? viewEl.scrollLeft : window.pageXOffset;
    const y = hasScrollContainer ? viewEl.scrollTop : window.pageYOffset;
    const scroll = new Scroll(x, y);
    const view = new View({ width: 0, height: 0, scrollContainer });

    // Ticking
    let ticking = false;

    // Passive support
    const supportsPassive = testForPassiveScroll();

    function _addListeners() {
        viewEl.addEventListener(
            'scroll',
            _handleScroll,
            supportsPassive ? { passive: true } : false
        );
        window.addEventListener('resize', _handleResize, false);
    }

    function _removeListeners() {
        viewEl.removeEventListener(
            'scroll',
            _handleScroll,
            supportsPassive ? { passive: true } : false
        );
        window.removeEventListener('resize', _handleResize, false);
    }

    _addListeners();
    _setViewSize();

    /**
     * Window scroll handler sets scroll position
     * and then calls '_updateAllElements()'.
     */
    function _handleScroll() {
        // Save current scroll
        // Supports IE 9 and up.
        const x = hasScrollContainer ? viewEl.scrollLeft : window.pageXOffset;
        const y = hasScrollContainer ? viewEl.scrollTop : window.pageYOffset;
        scroll.setScroll(x, y);

        // Only called if the last animation request has been
        // completed and there are parallax elements to update
        if (!ticking && elements.length > 0) {
            ticking = true;
            window.requestAnimationFrame(_updateAllElements);
        }
    }

    /**
     * Window resize handler. Sets the new window inner height
     * then updates parallax element attributes and positions.
     */
    function _handleResize() {
        _setViewSize();
        _updateAllElements({ updateCache: true });
    }

    /**
     * Update element positions.
     * Determines if the element is in view based on the cached
     * attributes, if so set the elements parallax styles.
     */
    function _updateAllElements({ updateCache } = {}) {
        elements.forEach(element => {
            _updateElementPosition(element);
            if (updateCache) {
                element.setCachedAttributes(view, scroll);
            }
        });
        // reset ticking so more animations can be called
        ticking = false;
    }

    /**
     * Update element positions.
     * Determines if the element is in view based on the cached
     * attributes, if so set the elements parallax styles.
     */
    function _updateElementPosition(element) {
        if (element.props.disabled) return;
        element.updatePosition(view, scroll);
    }

    /**
     * Cache the window height.
     */
    function _setViewSize() {
        if (hasScrollContainer) {
            const width = viewEl.offsetWidth;
            const height = viewEl.offsetHeight;
            return view.setSize(width, height);
        }

        const html = document.documentElement;
        const width = window.innerWidth || html.clientWidth;
        const height = window.innerHeight || html.clientHeight;

        return view.setSize(width, height);
    }

    /**
     * -------------------------------------------------------
     * Public methods
     * -------------------------------------------------------
     */

    /**
     * Gets the parallax elements in the controller
     * @return {array} parallax elements
     */
    this.getElements = function() {
        return elements;
    };

    /**
     * Creates a new parallax element object with new id
     * and options to store in the 'elements' array.
     * @param {object} options
     * @return {object} element
     */
    this.createElement = function(options) {
        const newElement = new Element({ ...options, scrollAxis });
        newElement.setCachedAttributes(view, scroll);
        elements = [...elements, newElement];
        _updateElementPosition(newElement);
        return newElement;
    };

    /**
     * Remove an element by id
     * @param {object} element
     */
    this.removeElementById = function(id) {
        if (!elements) return;
        elements = elements.filter(el => el.id !== id);
    };

    /**
     * Updates an existing parallax element object with new options.
     * @param {object} element
     * @param {object} options
     */
    this.updateElementPropsById = function(id, props) {
        elements = elements.map(el => {
            if (el.id === id) {
                return el.updateProps(props);
            }
            return el;
        });

        this.update();
    };

    /**
     * Remove element styles.
     * @param {object} element
     */
    this.resetElementStyles = function(element) {
        resetStyles(element);
    };

    /**
     * Updates all parallax element attributes and positions.
     */
    this.update = function() {
        _setViewSize();
        _updateAllElements();
    };

    /**
     * Removes listeners, reset all styles then nullifies the global ParallaxController.
     */
    this.destroy = function() {
        _removeListeners();
        elements.forEach(element => resetStyles(element));
        elements = undefined;
    };
}

/**
 * Static method to instantiate the ParallaxController.
 * @returns {Object} ParallaxController
 */
ParallaxController.init = function(options) {
    const hasWindow = typeof window !== 'undefined';

    if (!hasWindow) {
        throw new Error(
            'Looks like ParallaxController.init() was called on the server. This method must be called on the client.'
        );
    }

    return new ParallaxController(options);
};

export default ParallaxController;
