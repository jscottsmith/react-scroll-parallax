import { View } from './View';
import type { RootMarginShape } from '../types';

export class Rect {
  height: number;
  width: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  offsetTop: number;
  offsetLeft: number;
  offsetBottom: number;
  offsetRight: number;

  constructor(options: {
    el: HTMLElement;
    view: View;
    rootMargin?: RootMarginShape;
  }) {
    let rect = options.el.getBoundingClientRect();

    // rect is based on viewport -- must adjust for relative scroll container
    if (options.view.scrollContainer) {
      const scrollRect = options.view.scrollContainer.getBoundingClientRect();
      rect = {
        ...rect,
        top: rect.top - scrollRect.top,
        right: rect.right - scrollRect.left,
        bottom: rect.bottom - scrollRect.top,
        left: rect.left - scrollRect.left,
      };
    }
    this.height = options.el.offsetHeight;
    this.width = options.el.offsetWidth;
    this.offsetTop = options.el.offsetTop;
    this.offsetLeft = options.el.offsetLeft;
    this.offsetBottom = options.el.offsetHeight + this.offsetTop;
    this.offsetRight = options.el.offsetWidth + this.offsetLeft;
    this.left = rect.left;
    this.right = rect.right;
    this.top = rect.top;
    this.bottom = rect.bottom;

    if (options.rootMargin) {
      this._setRectWithRootMargin(options.rootMargin);
    }
  }

  /**
   * Apply root margin to all properties
   */
  _setRectWithRootMargin(rootMargin: RootMarginShape) {
    let totalRootY = rootMargin.top + rootMargin.bottom;
    let totalRootX = rootMargin.left + rootMargin.right;
    this.top -= rootMargin.top;
    this.right += rootMargin.right;
    this.bottom += rootMargin.bottom;
    this.left -= rootMargin.left;
    this.height += totalRootY;
    this.width += totalRootX;
  }
}
