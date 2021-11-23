export class Scroll {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setScroll(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }
}
