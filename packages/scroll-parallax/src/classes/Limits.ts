export type LimitOptions = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startMultiplierX?: number;
  endMultiplierX?: number;
  startMultiplierY?: number;
  endMultiplierY?: number;
};

export class Limits {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  totalX: number;
  totalY: number;
  startMultiplierX: number;
  endMultiplierX: number;
  startMultiplierY: number;
  endMultiplierY: number;

  constructor(properties: LimitOptions) {
    this.startX = properties.startX;
    this.startY = properties.startY;
    this.endX = properties.endX;
    this.endY = properties.endY;
    // Used to calculate the progress of the element
    this.totalX = this.endX - this.startX;
    this.totalY = this.endY - this.startY;

    // Used to scale translate effects
    this.startMultiplierX = properties.startMultiplierX || 1;
    this.endMultiplierX = properties.endMultiplierX || 1;
    this.startMultiplierY = properties.startMultiplierY || 1;
    this.endMultiplierY = properties.endMultiplierY || 1;
  }
}
