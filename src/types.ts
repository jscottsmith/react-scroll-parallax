export type ParallaxStartEndOffsets = {
  xUnit: ValidUnits;
  yUnit: ValidUnits;
  translateX: OffsetShape[];
  translateY: OffsetShape[];
};

export enum Units {
  'px' = 'px',
  '%' = '%',
}

export enum ScrollAxis {
  'vertical' = 'vertical',
  'horizontal' = 'horizontal',
}

export type ValidScrollAxis = keyof typeof ScrollAxis;

export type ValidUnits = keyof typeof Units;

export type OffsetShape = {
  value: number;
  unit: ValidUnits;
};
