import { resetStyles } from '../helpers/elementStyles';
import { View } from './View';
import { Scroll } from './Scroll';
import { Element } from './Element';
import { VERTICAL } from '../constants';
import { testForPassiveScroll } from '../utils/testForPassiveScroll';
import { ValidScrollAxis } from '../types';

export type ViewElement = HTMLElement | Window;

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

export type ParallaxControllerOptions = {
  scrollAxis?: ValidScrollAxis;
  scrollContainer?: HTMLElement;
};

export type ParallaxElementProperties = {
  disabled?: boolean;
  translateX: string[] | number[];
  translateY: string[] | number[];
};

export type CreateElementOptions = {
  elInner?: HTMLElement;
  elOuter?: HTMLElement;
  props: ParallaxElementProperties;
};

export class ParallaxController {
  elements: Element[];
  scrollAxis: ValidScrollAxis;
  viewEl: ViewElement;
  scroll: Scroll;
  view: View;
  _hasScrollContainer: boolean;
  _ticking: boolean;
  _supportsPassive: boolean;

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
    scrollAxis = VERTICAL,
    scrollContainer,
  }: ParallaxControllerOptions) {
    this.scrollAxis = scrollAxis;
    // All parallax elements to be updated
    this.elements = [];

    this._hasScrollContainer = !!scrollContainer;
    this.viewEl = scrollContainer ?? window;

    // Scroll and View
    const x = this._hasScrollContainer
      ? // @ts-expect-error
        this.viewEl.scrollLeft
      : window.pageXOffset;
    const y = this._hasScrollContainer
      ? // @ts-expect-error
        this.viewEl.scrollTop
      : window.pageYOffset;

    this.scroll = new Scroll(x, y);
    this.view = new View({
      width: 0,
      height: 0,
      scrollContainer: this._hasScrollContainer ? scrollContainer : undefined,
    });

    // Ticking
    this._ticking = false;

    // Passive support
    this._supportsPassive = testForPassiveScroll();

    // Bind methods to class
    this._bindAllMethods();
    this._addListeners(this.viewEl);
    this._setViewSize();
  }

  private _bindAllMethods() {
    [
      '_addListeners',
      '_removeListeners',
      '_handleScroll',
      '_handleResize',
      '_updateAllElements',
      '_updateElementPosition',
      '_setViewSize',
      'getElements',
      'createElement',
      'removeElementById',
      'updateElementPropsById',
      'resetElementStyles',
      'update',
      'updateScrollContainer',
      'destroy',
    ].forEach((method: string) => {
      // @ts-expect-error
      this[method] = this[method].bind(this);
    });
  }

  private _addListeners(el: ViewElement) {
    el.addEventListener(
      'scroll',
      this._handleScroll,
      this._supportsPassive ? { passive: true } : false
    );
    window.addEventListener('resize', this._handleResize, false);
  }

  private _removeListeners(el: ViewElement) {
    el.removeEventListener('scroll', this._handleScroll, false);
    window.removeEventListener('resize', this._handleResize, false);
  }

  /**
   * Window scroll handler sets scroll position
   * and then calls '_updateAllElements()'.
   */
  private _handleScroll() {
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
  private _handleResize() {
    this._setViewSize();
    this._updateAllElements({ updateCache: true });
  }

  /**
   * Update element positions.
   * Determines if the element is in view based on the cached
   * attributes, if so set the elements parallax styles.
   */
  private _updateAllElements({ updateCache }: { updateCache?: boolean } = {}) {
    if (this.elements) {
      this.elements.forEach((element) => {
        this._updateElementPosition(element);
        if (updateCache) {
          element.setCachedAttributes(this.view, this.scroll);
        }
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
  private _updateElementPosition(element: Element) {
    if (element.props.disabled) return;
    element.updatePosition(this.view, this.scroll);
  }

  /**
   * Cache the window width/height.
   */
  private _setViewSize() {
    if (this._hasScrollContainer) {
      // @ts-ignore
      const width = this.viewEl.offsetWidth;
      // @ts-ignore
      const height = this.viewEl.offsetHeight;
      return this.view.setSize(width, height);
    }

    const html = document.documentElement;
    const width = window.innerWidth || html.clientWidth;
    const height = window.innerHeight || html.clientHeight;

    return this.view.setSize(width, height);
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
  getElements(): Element[] {
    return this.elements;
  }

  /**
   * Creates a new parallax element object with new id
   * and options to store in the 'elements' array.
   * @param {object} options
   * @return {object} element
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
   * @param {object} element
   */
  removeElementById(id: number) {
    if (!this.elements) return;
    this.elements = this.elements.filter((el) => el.id !== id);
  }

  /**
   * Updates an existing parallax element object with new options.
   * @param {object} element
   * @param {object} options
   */
  updateElementPropsById(id: number, props: ParallaxElementProperties): void {
    if (this.elements) {
      this.elements = this.elements.map((el) => {
        if (el.id === id) {
          return el.updateProps(props);
        }
        return el;
      });
    }

    this.update();
  }

  /**
   * Remove element styles.
   * @param {object} element
   */
  resetElementStyles(element: Element) {
    resetStyles(element);
  }

  /**
   * Updates all parallax element attributes and positions.
   */
  update() {
    this._setViewSize();
    this._updateAllElements({ updateCache: true });
  }

  updateScrollContainer(el: HTMLElement) {
    // remove existing listeners with current el first
    this._removeListeners(this.viewEl);

    this.viewEl = el;
    this._hasScrollContainer = !!el;
    this.view = new View({ width: 0, height: 0, scrollContainer: el });
    this._setViewSize();
    this._addListeners(this.viewEl);
    this._updateAllElements({ updateCache: true });
  }

  /**
   * Removes listeners, reset all styles then nullifies the global ParallaxController.
   */
  destroy() {
    this._removeListeners(this.viewEl);
    if (this.elements) {
      this.elements.forEach((element) => resetStyles(element));
    }
    // @ts-expect-error
    this.elements = undefined;
  }
}
