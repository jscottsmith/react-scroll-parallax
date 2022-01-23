import { resetStyles } from '../helpers/elementStyles';
import { View } from './View';
import { Scroll } from './Scroll';
import { Element } from './Element';
import { testForPassiveScroll } from '../utils/testForPassiveScroll';
import {
  CreateElementOptions,
  ParallaxControllerOptions,
  ParallaxElementConfig,
  ScrollAxis,
  ValidScrollAxis,
  ViewElement,
} from '../types';

/**
 * -------------------------------------------------------
 * Parallax Controller
 * -------------------------------------------------------
 *
 * The global controller for setting up and managing a scroll view of elements.
 *
 */

export class ParallaxController {
  elements: Element[];
  scrollAxis: ValidScrollAxis;
  viewEl: ViewElement;
  scroll: Scroll;
  view: View;
  _hasScrollContainer: boolean;
  _ticking: boolean;
  _supportsPassive: boolean;
  _resizeObserver?: ResizeObserver;

  /**
   * Static method to instantiate the ParallaxController.
   * @returns {Class} ParallaxController
   */
  static init(options: ParallaxControllerOptions): ParallaxController {
    const hasWindow = typeof window !== 'undefined';

    if (!hasWindow) {
      throw new Error(
        'Looks like ParallaxController.init() was called on the server. This method must be called on the client.'
      );
    }

    return new ParallaxController(options);
  }

  constructor({
    scrollAxis = ScrollAxis.vertical,
    scrollContainer,
  }: ParallaxControllerOptions) {
    this.scrollAxis = scrollAxis;
    // All parallax elements to be updated
    this.elements = [];

    this._hasScrollContainer = !!scrollContainer;
    this.viewEl = scrollContainer ?? window;

    // Scroll and View
    const [x, y] = this._getScrollPosition();
    this.scroll = new Scroll(x, y);

    this.view = new View({
      width: 0,
      height: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContainer: this._hasScrollContainer ? scrollContainer : undefined,
    });

    // Ticking
    this._ticking = false;

    // Passive support
    this._supportsPassive = testForPassiveScroll();

    // Bind methods to class
    this._bindAllMethods();
    this._addListeners(this.viewEl);
    this._addResizeObserver();
    this._setViewSize();
  }

  _bindAllMethods() {
    [
      '_addListeners',
      '_removeListeners',
      '_getScrollPosition',
      '_handleScroll',
      '_handleUpdateCache',
      '_updateAllElements',
      '_updateElementPosition',
      '_setViewSize',
      '_addResizeObserver',
      'getElements',
      'createElement',
      'removeElementById',
      'resetElementStyles',
      'updateElementPropsById',
      'update',
      'updateScrollContainer',
      'destroy',
    ].forEach((method: string) => {
      // @ts-expect-error
      this[method] = this[method].bind(this);
    });
  }

  _addListeners(el: ViewElement) {
    el.addEventListener(
      'scroll',
      this._handleScroll,
      this._supportsPassive ? { passive: true } : false
    );
    window.addEventListener('resize', this._handleUpdateCache, false);
    window.addEventListener('blur', this._handleUpdateCache, false);
    window.addEventListener('focus', this._handleUpdateCache, false);
    window.addEventListener('load', this._handleUpdateCache, false);
  }

  _removeListeners(el: ViewElement) {
    el.removeEventListener('scroll', this._handleScroll, false);
    window.removeEventListener('resize', this._handleUpdateCache, false);
    window.removeEventListener('blur', this._handleUpdateCache, false);
    window.removeEventListener('focus', this._handleUpdateCache, false);
    window.removeEventListener('load', this._handleUpdateCache, false);
    this._resizeObserver?.disconnect();
  }

  _addResizeObserver() {
    try {
      const observedEl: HTMLElement = this._hasScrollContainer
        ? (this.viewEl as HTMLElement)
        : document.documentElement;
      this._resizeObserver = new ResizeObserver(() => this.update());
      this._resizeObserver.observe(observedEl);
    } catch (e) {
      console.warn(
        'Failed to create the resize observer in the ParallaxContoller'
      );
    }
  }

  _getScrollPosition() {
    // Save current scroll
    // Supports IE 9 and up.
    const nx = this._hasScrollContainer
      ? // @ts-expect-error
        this.viewEl.scrollLeft
      : window.pageXOffset;
    const ny = this._hasScrollContainer
      ? // @ts-expect-error
        this.viewEl.scrollTop
      : window.pageYOffset;

    return [nx, ny];
  }

  /**
   * Window scroll handler sets scroll position
   * and then calls '_updateAllElements()'.
   */
  _handleScroll() {
    const [nx, ny] = this._getScrollPosition();
    this.scroll.setScroll(nx, ny);

    // Only called if the last animation request has been
    // completed and there are parallax elements to update
    if (!this._ticking && this.elements.length > 0) {
      this._ticking = true;
      // @ts-ignore
      window.requestAnimationFrame(this._updateAllElements);
    }
  }

  /**
   * Window resize handler. Sets the new window inner height
   * then updates parallax element attributes and positions.
   */
  _handleUpdateCache() {
    this._setViewSize();
    this._updateAllElements({ updateCache: true });
  }

  /**
   * Update element positions.
   * Determines if the element is in view based on the cached
   * attributes, if so set the elements parallax styles.
   */
  _updateAllElements({ updateCache }: { updateCache?: boolean } = {}) {
    if (this.elements) {
      this.elements.forEach(element => {
        if (updateCache) {
          element.setCachedAttributes(this.view, this.scroll);
        }
        this._updateElementPosition(element);
      });
    }
    // reset ticking so more animations can be called
    this._ticking = false;
  }

  /**
   * Update element positions.
   * Determines if the element is in view based on the cached
   * attributes, if so set the elements parallax styles.
   */
  _updateElementPosition(element: Element) {
    if (element.props.disabled) return;
    element.updatePosition(this.scroll);
  }

  /**
   * Cache the window width/height.
   */
  _setViewSize() {
    if (this._hasScrollContainer) {
      // @ts-expect-error
      const width = this.viewEl.offsetWidth;
      // @ts-expect-error
      const height = this.viewEl.offsetHeight;
      // @ts-expect-error
      const scrollHeight = this.viewEl.scrollHeight;
      // @ts-expect-error
      const scrollWidth = this.viewEl.scrollWidth;
      return this.view.setSize({ width, height, scrollHeight, scrollWidth });
    }

    const html = document.documentElement;
    const width = window.innerWidth || html.clientWidth;
    const height = window.innerHeight || html.clientHeight;
    const scrollHeight = html.scrollHeight;
    const scrollWidth = html.scrollWidth;

    return this.view.setSize({ width, height, scrollHeight, scrollWidth });
  }

  /**
   * -------------------------------------------------------
   * Public methods
   * -------------------------------------------------------
   */

  /**
   * Returns all the parallax elements in the controller
   */
  getElements(): Element[] {
    return this.elements;
  }

  /**
   * Creates and returns new parallax element with provided options to be managed by the controller.
   */
  createElement(options: CreateElementOptions): Element {
    const newElement = new Element({ ...options, scrollAxis: this.scrollAxis });
    newElement.setCachedAttributes(this.view, this.scroll);
    this.elements = this.elements
      ? [...this.elements, newElement]
      : [newElement];
    this._updateElementPosition(newElement);
    return newElement;
  }

  /**
   * Remove an element by id
   */
  removeElementById(id: number) {
    if (!this.elements) return;
    this.elements = this.elements.filter(el => el.id !== id);
  }

  /**
   * Updates an existing parallax element object with new options.
   */
  updateElementPropsById(id: number, props: ParallaxElementConfig): void {
    if (this.elements) {
      this.elements = this.elements.map(el => {
        if (el.id === id) {
          return el.updateProps(props);
        }
        return el;
      });
    }

    this.update();
  }

  /**
   * Remove a target elements parallax styles
   */
  resetElementStyles(element: Element) {
    resetStyles(element);
  }

  /**
   * Updates all cached attributes on parallax elements.
   */
  update() {
    // Save the latest scroll position because window.scroll
    // may be called and the handle scroll event may not be called.
    const [nx, ny] = this._getScrollPosition();
    this.scroll.setScroll(nx, ny);

    this._setViewSize();
    this._updateAllElements({ updateCache: true });
  }
  /**
   * Updates the scroll container of the parallax controller
   */
  updateScrollContainer(el: HTMLElement) {
    // remove existing listeners with current el first
    this._removeListeners(this.viewEl);

    this.viewEl = el;
    this._hasScrollContainer = !!el;
    this.view = new View({
      width: 0,
      height: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContainer: el,
    });
    this._setViewSize();
    this._addListeners(this.viewEl);
    this._updateAllElements({ updateCache: true });
  }

  /**
   * Removes all listeners and resets all styles on managed elements.
   */
  destroy() {
    this._removeListeners(this.viewEl);
    if (this.elements) {
      this.elements.forEach(element => resetStyles(element));
    }
    // @ts-expect-error
    this.elements = undefined;
  }
}
