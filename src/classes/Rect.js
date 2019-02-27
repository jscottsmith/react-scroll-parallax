class Rect {
    constructor(el, view, scroll) {
        let rect = el.getBoundingClientRect();

        // rect is based on viewport -- must adjust for relative scroll container
        if (view.scrollContainer) {
            const scrollRect = view.scrollContainer.getBoundingClientRect();
            rect = {
                top: rect.top - scrollRect.top,
                right: rect.right - scrollRect.left,
                bottom: rect.bottom - scrollRect.top,
                left: rect.left - scrollRect.left,
            };
        }

        this.height = el.offsetHeight;
        this.width = el.offsetWidth;
        this.left = rect.left + scroll.x;
        this.right = rect.right + scroll.x;
        this.top = rect.top + scroll.y;
        this.bottom = rect.bottom + scroll.y;
        this.originTotalDistY = view.height + this.height;
        this.originTotalDistX = view.width + this.width;
    }
}

export default Rect;
