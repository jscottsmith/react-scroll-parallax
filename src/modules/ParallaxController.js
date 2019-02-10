import {
    addAttributes,
    isElementInView,
    testForPassiveScroll,
    setParallaxStyles,
    percentMoved,
    resetStyles,
    addOffsets,
} from '../utils/index';

/**
 * -------------------------------------------------------
 * Parallax Controller
 * -------------------------------------------------------
 *
 * The global controller for setting up window scroll/resize
 * listeners, managing and caching parallax element positions,
 * determining which elements are inside the viewport based on
 * scroll position, and then updating parallax element styles
 * based on min/max offsets and current scroll position.
 *
 */
function ParallaxController() {
    // All parallax elements to be updated
    let elements = [];

    // Tracks current scroll y distance
    let scrollY = 0;

    // Window inner height
    let windowHeight = 0;

    // ID to increment for elements
    let id = 0;

    // Ticking
    let ticking = false;

    // Passive support
    const supportsPassive = testForPassiveScroll();

    function _addListeners() {
        window.addEventListener(
            'scroll',
            _handleScroll,
            supportsPassive ? { passive: true } : false
        );
        window.addEventListener('resize', _handleResize, false);
    }

    function _removeListeners() {
        window.removeEventListener(
            'scroll',
            _handleScroll,
            supportsPassive ? { passive: true } : false
        );
        window.removeEventListener('resize', _handleResize, false);
    }

    _addListeners();
    _setWindowHeight();

    /**
     * Window scroll handler. Sets the 'scrollY'
     * and then calls '_updateAllElements()'.
     */
    function _handleScroll() {
        // reference to prev scroll y
        // const prevScrollY = scrollY;

        // Save current scroll
        scrollY = window.pageYOffset; // Supports IE 9 and up.

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
        _setWindowHeight();
        _updateElementAttributes();
        _updateAllElements();
    }

    /**
     * Creates a unique id to distinguish parallax elements.
     * @return {Number}
     */
    function _createID() {
        ++id;
        return id;
    }

    /**
     * Update element positions.
     * Determines if the element is in view based on the cached
     * attributes, if so set the elements parallax styles.
     */
    function _updateAllElements() {
        elements.forEach(element => {
            _updateElementPosition(element);

            // reset ticking so more animations can be called
            ticking = false;
        });
    }

    /**
     * Update element positions.
     * Determines if the element is in view based on the cached
     * attributes, if so set the elements parallax styles.
     */
    function _updateElementPosition(element) {
        if (element.props.disabled) return;

        // check if the element is in view then
        const isInView = isElementInView(element, windowHeight, scrollY);

        // set styles if it is
        if (isInView) {
            const percent = percentMoved(element, windowHeight, scrollY);
            setParallaxStyles(element, percent);
        }
    }

    /**
     * Update element attributes.
     * Sets up the elements offsets based on the props passed from
     * the component then caches the elements current position and
     * other important attributes.
     */
    function _updateElementAttributes() {
        elements = elements.map(element =>
            element.props.disabled
                ? element
                : addAttributes(addOffsets(element), windowHeight)
        );
    }

    /**
     * Remove parallax styles from all elements.
     */
    function _removeParallaxStyles() {
        elements.forEach(element => resetStyles(element));
    }

    /**
     * Cache the window height.
     */
    function _setWindowHeight() {
        const html = document.documentElement;
        windowHeight = window.innerHeight || html.clientHeight;
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
        const newElement = addAttributes(
            addOffsets({
                id: _createID(),
                ...options,
            }),
            windowHeight
        );
        elements = [...elements, newElement];

        _updateElementPosition(newElement);

        return newElement;
    };

    /**
     * Creates a new parallax element object with new id
     * and options to store in the 'elements' array.
     * @param {object} element
     */
    this.removeElement = function(element) {
        elements = elements.filter(el => el.id !== element.id);
    };

    /**
     * Updates an existing parallax element object with new options.
     * @param {object} element
     * @param {object} options
     */
    this.updateElement = function(element, options) {
        elements = elements.map(el => {
            // create element with new options and replaces the old
            if (el.id === element.id) {
                // update props
                return addAttributes(
                    addOffsets({
                        ...el,
                        props: options.props,
                    }),
                    windowHeight
                );
            }
            return el;
        });

        // call update to set attributes and positions based on the new options
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
     * Updates all parallax element attributes and postitions.
     */
    this.update = function() {
        _setWindowHeight();
        _updateAllElements();
    };

    /**
     * Removes listeners, reset all styles then nullifies the global ParallaxController.
     */
    this.destroy = function() {
        _removeListeners();
        _removeParallaxStyles();
    };
}

/**
 * Static method to instantiate the ParallaxController.
 * Returns a new or existing instance of the ParallaxController.
 * @returns {Object} ParallaxController
 */
ParallaxController.init = function() {
    const hasWindow = typeof window !== 'undefined';

    if (!hasWindow) {
        throw new Error(
            'Looks like ParallaxController.init() was called on the server. This method must be called on the client.'
        );
    }

    const controller = new ParallaxController();

    return controller;
};

export default ParallaxController;
