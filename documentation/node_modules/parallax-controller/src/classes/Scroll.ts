export class Scroll {
  x: number;
  y: number;
  dx: number;
  dy: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
  }

  setScroll(x: number, y: number) {
    this.dx = x - this.x;
    this.dy = y - this.y;
    this.x = x;
    this.y = y;
    return this;
  }
}
