import { View } from './View';
import { Element } from './Element';
import {
  ScrollAxis,
  type CreateElementOptions,
  type ParallaxControllerOptions,
  type ParallaxElementConfig,
  type ValidScrollAxis,
  type ViewElement,
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
  disabled: boolean;
  elements: Element[];
  scrollAxis: ValidScrollAxis;
  viewEl: ViewElement;
  // scroll: Scroll;
  view: View;
  _hasScrollContainer: boolean;
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
    disabled = false,
  }: ParallaxControllerOptions) {
    this.disabled = disabled;
    this.scrollAxis = scrollAxis;
    this.elements = [];

    this._hasScrollContainer = !!scrollContainer;
    this.viewEl = scrollContainer ?? window;

    this.view = new View({
      width: 0,
      height: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContainer: this._hasScrollContainer ? scrollContainer : undefined,
    });

    if (this.disabled) return;

    this._addListeners();
    this._addResizeObserver();
    this._setViewSize();
  }

  _addListeners = () => {
    window.addEventListener('resize', this.update, false);
    window.addEventListener('blur', this.update, false);
    window.addEventListener('focus', this.update, false);
    window.addEventListener('load', this.update, false);
  };

  _removeListeners = () => {
    window.removeEventListener('resize', this.update, false);
    window.removeEventListener('blur', this.update, false);
    window.removeEventListener('focus', this.update, false);
    window.removeEventListener('load', this.update, false);
    this._resizeObserver?.disconnect();
  };

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

  /**
   * Update element positions.
   * Determines if the element is in view based on the cached
   * attributes, if so set the elements parallax styles.
   */
  _updateAllElements = () => {
    if (this.elements) {
      this.elements.forEach((element) => {
        element.updateElement(this.view);
      });
    }
  };

  /**
   * Gets the params to set in the View from the scroll container or the window
   */
  _getViewParams = (): {
    width: number;
    height: number;
    scrollHeight: number;
    scrollWidth: number;
  } => {
    if (this._hasScrollContainer && this.viewEl instanceof HTMLElement) {
      const width = this.viewEl.offsetWidth;
      const height = this.viewEl.offsetHeight;
      const scrollHeight = this.viewEl.scrollHeight;
      const scrollWidth = this.viewEl.scrollWidth;
      return this.view.setSize({
        width,
        height,
        scrollHeight,
        scrollWidth,
      });
    }

    const html = document.documentElement;
    const width = window.innerWidth || html.clientWidth;
    const height = window.innerHeight || html.clientHeight;
    const scrollHeight = html.scrollHeight;
    const scrollWidth = html.scrollWidth;

    return { width, height, scrollHeight, scrollWidth };
  };

  /**
   * Cache the view attributes
   */
  _setViewSize = () => {
    return this.view.setSize(this._getViewParams());
  };

  /**
   * Checks if any of the cached attributes of the view have changed.
   * @returns boolean
   */
  _checkIfViewHasChanged = () => {
    return this.view.hasChanged(this._getViewParams());
  };

  /**
   * -------------------------------------------------------
   * Public methods
   * -------------------------------------------------------
   */

  /**
   * Returns all the parallax elements in the controller
   */
  getElements = (): Element[] => {
    return this.elements;
  };

  /**
   * Creates and returns new parallax element with provided options to be managed by the controller.
   */
  createElement = (options: CreateElementOptions): Element => {
    const newElement = new Element({
      ...options,
      view: this.view,
      scrollAxis: this.scrollAxis,
      disabledParallaxController: this.disabled,
    });
    this.elements = this.elements
      ? [...this.elements, newElement]
      : [newElement];

    if (this._checkIfViewHasChanged()) {
      this.update();
    }
    return newElement;
  };

  /**
   * Remove an element by id
   */
  removeElementById = (id: number) => {
    if (!this.elements) return;
    this.elements = this.elements.filter((el) => el.id !== id);
  };

  /**
   * Updates an existing parallax element object with new options.
   */
  updateElementPropsById = (id: number, props: ParallaxElementConfig): void => {
    if (this.elements) {
      this.elements = this.elements.map((el) => {
        if (el.id === id) {
          return el.updateProps(props);
        }
        return el;
      });
    }

    this.update();
  };

  /**
   * Updates all cached attributes on parallax elements.
   */
  update = () => {
    this._setViewSize();
    this._updateAllElements();
  };

  /**
   * Updates the scroll container of the parallax controller
   */
  updateScrollContainer = (el: HTMLElement) => {
    this._removeListeners();

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
    this._addListeners();
    this._updateAllElements();
  };

  disable() {
    this.disabled = true;
    // remove listeners
    this._removeListeners();
    // reset all styles
    if (this.elements) {
      this.elements.forEach((element) => element.disable());
    }
  }

  enable() {
    this.disabled = false;
    if (this.elements) {
      this.elements.forEach((element) => element.enable());
    }
    // add back listeners
    this._addListeners();
    this._addResizeObserver();
    this._setViewSize();
  }

  /** Alias for {@link disable} — matches historical `parallax-controller` API. */
  disableParallaxController = () => {
    this.disable();
  };

  /** Alias for {@link enable} — matches historical `parallax-controller` API. */
  enableParallaxController = () => {
    this.enable();
  };

  resetElementStyles = (element: Element) => {
    element.resetStyles();
  };

  /**
   * Removes all listeners and resets all styles on managed elements.
   */
  destroy = () => {
    this._removeListeners();
    if (this.elements) {
      this.elements.forEach((element) => element.destroy());
    }
    // @ts-expect-error
    this.elements = undefined;
  };
}
