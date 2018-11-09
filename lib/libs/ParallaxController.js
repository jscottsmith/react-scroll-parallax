'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require('../utils/index');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
    var elements = [];

    // Tracks current scroll y distance
    var scrollY = 0;

    // Window inner height
    var windowHeight = 0;

    // ID to increment for elements
    var id = 0;

    // Ticking
    var ticking = false;

    // Scroll direction
    // let scrollDown = null;

    // Passive support
    var supportsPassive = (0, _index.testForPassiveScroll)();

    function _addListeners() {
        window.addEventListener('scroll', _handleScroll, supportsPassive ? { passive: true } : false);
        window.addEventListener('resize', _handleResize, false);
    }

    function _removeListeners() {
        window.removeEventListener('scroll', _handleScroll, supportsPassive ? { passive: true } : false);
        window.removeEventListener('resize', _handleResize, false);
    }

    _addListeners();

    /**
     * Window scroll handler. Sets the 'scrollY'
     * and then calls '_updateElementPositions()'.
     */
    function _handleScroll() {
        // reference to prev scroll y
        // const prevScrollY = scrollY;

        // Save current scroll
        scrollY = window.pageYOffset; // Supports IE 9 and up.

        // direction
        // scrollDown = scrollY > prevScrollY;

        // Only called if the last animation request has been
        // completed and there are parallax elements to update
        if (!ticking && elements.length > 0) {
            ticking = true;
            window.requestAnimationFrame(_updateElementPositions);
        }
    }

    /**
     * Window resize handler. Sets the new window inner height
     * then updates parallax element attributes and positions.
     */
    function _handleResize() {
        _setWindowHeight();
        _updateElementAttributes();
        _updateElementPositions();
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
    function _updateElementPositions() {
        elements.forEach(function (element) {
            if (element.props.disabled) return;

            // check if the element is in view then
            var isInView = (0, _index.isElementInView)(element, windowHeight, scrollY);

            // set styles if it is
            if (isInView) _setParallaxStyles(element);

            // reset ticking so more animations can be called
            ticking = false;
        });
    }

    /**
     * Update element attributes.
     * Sets up the elements offsets based on the props passed from
     * the component then caches the elements current position and
     * other important attributes.
     */
    function _updateElementAttributes() {
        elements.forEach(function (element) {
            if (element.props.disabled) return;

            _setupOffsets(element);

            _cacheAttributes(element);
        });
    }

    /**
     * Remove parallax styles from all elements.
     */
    function _removeParallaxStyles() {
        elements.forEach(function (element) {
            _resetStyles(element);
        });
    }

    /**
     * Cache the window height.
     */
    function _setWindowHeight() {
        var html = document.documentElement;
        windowHeight = window.innerHeight || html.clientHeight;
    }

    /**
     * Takes a parallax element and caches important values that
     * cause layout reflow and paints. Stores the values as an
     * attribute object accesible on the parallax element.
     * @param {object} element
     */
    function _cacheAttributes(element) {
        var _element$offsets = element.offsets,
            yMin = _element$offsets.yMin,
            yMax = _element$offsets.yMax,
            xMax = _element$offsets.xMax,
            xMin = _element$offsets.xMin;
        var slowerScrollRate = element.props.slowerScrollRate;

        // NOTE: Many of these cause layout and reflow so we're not
        // calculating them on every frame -- instead these values
        // are cached on the element to access later when determining
        // the element's position and offset.

        var el = element.elOuter;
        var rect = el.getBoundingClientRect();
        var elHeight = el.offsetHeight;
        var elWidth = el.offsetWidth;
        var scrollY = window.pageYOffset;

        // NOTE: offsetYMax and offsetYMin are percents
        // based of the height of the element. They must be
        // calculated as px to correctly determine whether
        // the element is in the viewport.
        var yPercent = yMax.unit === '%' || yMin.unit === '%';
        var xPercent = xMax.unit === '%' || xMin.unit === '%';

        // X offsets
        var yMinPx = yMin.value;
        var yMaxPx = yMax.value;

        if (yPercent) {
            var h100 = elHeight / 100;
            yMaxPx = yMax.value * h100;
            yMinPx = yMin.value * h100; // negative value
        }

        // Y offsets
        var xMinPx = xMax.value;
        var xMaxPx = xMin.value;

        if (xPercent) {
            var w100 = elWidth / 100;
            xMaxPx = xMax.value * w100;
            xMinPx = xMin.value * w100; // negative value
        }

        // NOTE: must add the current scroll position when the
        // element is checked so that we get its absolute position
        // relative to the document and not the viewport then
        // add the min/max offsets calculated above.
        var top = 0;
        var bottom = 0;

        if (slowerScrollRate) {
            top = rect.top + scrollY + yMinPx;
            bottom = rect.bottom + scrollY + yMaxPx;
        } else {
            top = rect.top + scrollY + yMinPx * -1;
            bottom = rect.bottom + scrollY + yMaxPx * -1;
        }

        // NOTE: Total distance the element will move from when
        // the top enters the view to the bottom leaving
        // accounting for elements height and max/min offsets.
        var totalDist = windowHeight + (elHeight + Math.abs(yMinPx) + yMaxPx);

        element.attributes = {
            top: top,
            bottom: bottom,
            elHeight: elHeight,
            elWidth: elWidth,
            yMaxPx: yMaxPx,
            yMinPx: yMinPx,
            xMaxPx: xMaxPx,
            xMinPx: xMinPx,
            totalDist: totalDist
        };
    }

    /**
     * Takes a parallax element and parses the offset props to get the value
     * and unit. Sets these values as offset object accessible on the element.
     * @param {object} element
     */
    function _setupOffsets(element) {
        var _element$props = element.props,
            offsetYMin = _element$props.offsetYMin,
            offsetYMax = _element$props.offsetYMax,
            offsetXMax = _element$props.offsetXMax,
            offsetXMin = _element$props.offsetXMin;


        var yMin = (0, _index.parseValueAndUnit)(offsetYMin);
        var yMax = (0, _index.parseValueAndUnit)(offsetYMax);
        var xMin = (0, _index.parseValueAndUnit)(offsetXMax);
        var xMax = (0, _index.parseValueAndUnit)(offsetXMin);

        if (xMin.unit !== xMax.unit || yMin.unit !== yMax.unit) {
            throw new Error('Must provide matching units for the min and max offset values of each axis.');
        }

        var xUnit = xMin.unit || '%';
        var yUnit = yMin.unit || '%';

        element.offsets = {
            xUnit: xUnit,
            yUnit: yUnit,
            yMin: yMin,
            yMax: yMax,
            xMin: xMin,
            xMax: xMax
        };
    }

    /**
     * Takes a parallax element and set the styles based on the
     * offsets and percent the element has moved though the viewport.
     * @param {object} element
     */
    function _setParallaxStyles(element) {
        var top = element.attributes.top - scrollY;
        var totalDist = element.attributes.totalDist;

        // Percent the element has moved based on current and total distance to move

        var percentMoved = (top * -1 + windowHeight) / totalDist * 100;

        // Scale percentMoved to min/max percent determined by offset props
        var slowerScrollRate = element.props.slowerScrollRate;

        // Get the parallax X and Y offsets

        var offsets = (0, _index.getParallaxOffsets)(element.offsets, percentMoved, slowerScrollRate);

        // Apply styles
        var el = element.elInner;

        // prettier-ignore
        el.style.transform = 'translate3d(' + offsets.x.value + offsets.x.unit + ', ' + offsets.y.value + offsets.y.unit + ', 0)';
    }

    /**
     * Takes a parallax element and removes parallax offset styles.
     * @param {object} element
     */
    function _resetStyles(element) {
        var el = element.elInner;
        el.style.transform = '';
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
    this.getElements = function () {
        return elements;
    };

    /**
     * Creates a new parallax element object with new id
     * and options to store in the 'elements' array.
     * @param {object} options
     * @return {object} element
     */
    this.createElement = function (options) {
        var id = _createID();
        var newElement = _extends({
            id: id
        }, options);

        var updatedElements = [].concat(_toConsumableArray(elements), [newElement]);
        elements = updatedElements;
        this.update();

        return newElement;
    };

    /**
     * Creates a new parallax element object with new id
     * and options to store in the 'elements' array.
     * @param {object} element
     */
    this.removeElement = function (element) {
        var updatedElements = elements.filter(function (el) {
            return el.id !== element.id;
        });
        elements = updatedElements;
    };

    /**
     * Updates an existing parallax element object with new options.
     * @param {object} element
     * @param {object} options
     */
    this.updateElement = function (element, options) {
        var updatedElements = elements.map(function (el) {
            // create element with new options and replaces the old
            if (el.id === element.id) {
                // update props
                el.props = options.props;
            }
            return el;
        });

        elements = updatedElements;

        // call update to set attributes and positions based on the new options
        this.update();
    };

    /**
     * Remove element styles.
     * @param {object} element
     */
    this.resetElementStyles = function (element) {
        _resetStyles(element);
    };

    /**
     * Updates all parallax element attributes and postitions.
     */
    this.update = function () {
        _setWindowHeight();
        _updateElementAttributes();
        _updateElementPositions();
    };

    /**
     * Removes listeners, reset all styles then nullifies the global ParallaxController.
     */
    this.destroy = function () {
        _removeListeners();
        _removeParallaxStyles();
        window.ParallaxController = null;
    };
}

/**
 * Static method to instantiate the ParallaxController.
 * Returns a new or existing instance of the ParallaxController.
 * @returns {Object} ParallaxController
 */
ParallaxController.init = function () {
    var hasWindow = typeof window !== 'undefined';

    if (!hasWindow) {
        throw new Error('Looks like ParallaxController.init() was called on the server. This method must be called on the client.');
    }

    var controller = new ParallaxController();

    // Keep global reference for legacy versions <= 1.1.0
    if (hasWindow && !window.ParallaxController) {
        window.ParallaxController = controller;
    }

    return controller;
};

exports.default = ParallaxController;
module.exports = exports['default'];