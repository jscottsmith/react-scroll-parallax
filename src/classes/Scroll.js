export function Scroll(...args) {
    const scroll = {
        setScroll(x, y) {
            this.x = x;
            this.y = y;
            return this;
        },
        position() {
            return {
                x: this.x,
                y: this.y,
            };
        },
    };

    return scroll.setScroll(...args);
}
