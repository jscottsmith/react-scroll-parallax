export type ViewSizeParams = {
  width: number;
  height: number;
  scrollHeight: number;
  scrollWidth: number;
};
export class View {
  scrollContainer: HTMLElement | undefined;
  width: number;
  height: number;
  scrollHeight: number;
  scrollWidth: number;

  constructor(config: {
    width: number;
    height: number;
    scrollHeight: number;
    scrollWidth: number;
    scrollContainer?: HTMLElement;
  }) {
    this.scrollContainer = config.scrollContainer;
    this.width = config.width;
    this.height = config.height;
    this.scrollHeight = config.scrollHeight;
    this.scrollWidth = config.scrollWidth;
  }

  hasChanged(params: ViewSizeParams) {
    if (
      params.width !== this.width ||
      params.height !== this.height ||
      params.scrollWidth !== this.scrollWidth ||
      params.scrollHeight !== this.scrollHeight
    ) {
      return true;
    }
    return false;
  }

  setSize(params: ViewSizeParams) {
    this.width = params.width;
    this.height = params.height;
    this.scrollHeight = params.scrollHeight;
    this.scrollWidth = params.scrollWidth;
    return this;
  }
}
