export class Scroll {
    constructor(...args) {
        this.setScroll(...args);
    }

    setScroll(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
}
