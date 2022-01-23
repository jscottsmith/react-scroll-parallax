export class View {
  scrollContainer: HTMLElement | undefined;
  width: number;
  height: number;
  scrollHeight: number;
  scrollWidth: number;

  constructor({
    width,
    height,
    scrollHeight,
    scrollWidth,
    scrollContainer,
  }: {
    width: number;
    height: number;
    scrollHeight: number;
    scrollWidth: number;
    scrollContainer?: HTMLElement;
  }) {
    this.scrollContainer = scrollContainer;
    this.width = width;
    this.height = height;
    this.scrollHeight = scrollHeight;
    this.scrollWidth = scrollWidth;
  }

  setSize({
    width,
    height,
    scrollHeight,
    scrollWidth,
  }: {
    width: number;
    height: number;
    scrollHeight: number;
    scrollWidth: number;
  }) {
    this.width = width;
    this.height = height;
    this.scrollHeight = scrollHeight;
    this.scrollWidth = scrollWidth;
    return this;
  }
}
