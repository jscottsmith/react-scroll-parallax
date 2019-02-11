export function View(...args) {
    const view = {
        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        },
        size() {
            return {
                width: this.width,
                height: this.height,
            };
        },
    };

    return view.setSize(...args);
}
