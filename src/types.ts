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
    unit: string;
};
