export class View {
    constructor({ width, height, scrollContainer }) {
        this.scrollContainer = scrollContainer;
        this.setSize(width, height);
    }

    setSize = (width, height) => {
        this.width = width;
        this.height = height;
        return this;
    };

    size() {
        return {
            width: this.width,
            height: this.height,
        };
    }
}
