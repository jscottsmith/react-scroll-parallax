import { Element } from './classes/Element';
import { ParallaxControllerOptions } from './classes/ParallaxController';

export type ParallaxStartEndOffsets = {
  xUnit: ValidUnits;
  yUnit: ValidUnits;
  y0: OffsetShape;
  y1: OffsetShape;
  x0: OffsetShape;
  x1: OffsetShape;
};

export enum Units {
  'px' = 'px',
  '%' = '%',
}

export type ValidUnits = keyof typeof Units;

export type OffsetShape = {
  value: number;
  unit: ValidUnits;
};

type ParallaxElementProperties = {
  disabled: boolean;
  x0: string | number;
  x1: string | number;
  y0: string | number;
  y1: string | number;
};

export interface ParallaxControllerType {
  init(options: ParallaxControllerOptions): ParallaxControllerType;
  getElements(): Element[];
  update(): void;
  destroy(): void;
  createElement(options: {
    elInner: HTMLElement;
    elOuter: HTMLElement;
    props: ParallaxElementProperties;
  }): Element;
  resetElementStyles(id: number): void;
  removeElementById(id: number): void;
  updateElementPropsById(id: number, props: ParallaxElementProperties): void;
  updateScrollContainer(el: HTMLElement): void;
}
