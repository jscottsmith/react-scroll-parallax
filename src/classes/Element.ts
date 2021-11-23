import { VERTICAL } from '../constants';
import { Bounds } from './Bounds';
import { Rect } from './Rect';
import { ParallaxStartEndOffsets, ValidScrollAxis } from '../types';
import { getOffsets } from '../helpers/getOffsets';
import { isElementInView } from '../helpers/isElementInView';
import { percentMoved } from '../helpers/percentMoved';
import { setParallaxStyles } from '../helpers/elementStyles';
import { createId } from '../utils/createId';
import {
  CreateElementOptions,
  ParallaxElementProperties,
} from './ParallaxController';
import { View } from './View';
import { Scroll } from './Scroll';

type ElementConstructorOptions = CreateElementOptions & {
  scrollAxis: ValidScrollAxis;
};

export class Element {
  elInner?: HTMLElement;
  elOuter?: HTMLElement;
  props: ParallaxElementProperties;
  scrollAxis: ValidScrollAxis;
  id: number;
  offsets: ParallaxStartEndOffsets;
  isInView: boolean | null;
  percent: number;
  rect?: Rect;
  bounds?: Bounds;
  updatePosition: (view: View, scroll: Scroll) => Element;

  constructor(options: ElementConstructorOptions) {
    this.elInner = options.elInner;
    this.elOuter = options.elOuter;
    this.props = options.props;
    this.scrollAxis = options.scrollAxis;
    this.id = createId();
    this.offsets = getOffsets(this.props);
    this.isInView = null;
    this.percent = 0;

    this.updatePosition =
      options.scrollAxis === VERTICAL
        ? this._updatePositionVertical
        : this._updatePositionHorizontal;
  }

  updateProps(nextProps: ParallaxElementProperties) {
    this.props = { ...this.props, ...nextProps };
    this.offsets = getOffsets(nextProps);
    return this;
  }

  setCachedAttributes(view: View, scroll: Scroll): Element {
    if (!this.elOuter) return this;

    this.rect = new Rect(this.elOuter, view, scroll);
    this.bounds = new Bounds(this.rect, this.offsets, view);
    return this;
  }

  _updatePositionHorizontal(view: View, scroll: Scroll): Element {
    if (!this.bounds || !this.rect || !this.elInner) return this;

    this.isInView = isElementInView(
      this.bounds.left,
      this.bounds.right,
      view.width,
      scroll.x
    );

    if (!this.isInView) return this;

    this.percent = percentMoved(
      this.rect.left,
      this.rect.originTotalDistX,
      view.width,
      scroll.x
    );

    setParallaxStyles(this.elInner, this.offsets, this.percent);

    return this;
  }

  _updatePositionVertical(view: View, scroll: Scroll): Element {
    if (!this.bounds || !this.rect || !this.elInner) return this;

    this.isInView = isElementInView(
      this.bounds.top,
      this.bounds.bottom,
      view.height,
      scroll.y
    );

    if (!this.isInView) return this;

    this.percent = percentMoved(
      this.rect.top,
      this.rect.originTotalDistY,
      view.height,
      scroll.y
    );

    setParallaxStyles(this.elInner, this.offsets, this.percent);

    return this;
  }
}
