export class View {
  scrollContainer: HTMLElement | undefined;
  width: number;
  height: number;

  constructor({
    width,
    height,
    scrollContainer,
  }: {
    width: number;
    height: number;
    scrollContainer?: HTMLElement;
  }) {
    this.scrollContainer = scrollContainer;
    this.width = width;
    this.height = height;
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    return this;
  }
}
