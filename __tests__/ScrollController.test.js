import ScrollController from 'controllers/ScrollController.js';

describe('Expect ScrollController', () => {
    it('to init a new instance', () => {
        const scrollController = ScrollController.init();
        expect(scrollController).toBeInstanceOf(ScrollController);
    });

    it('to have an initial scroll state', () => {
        const scrollController = ScrollController.init();
        expect(scrollController.state).toEqual({
            scrollY: 0,
        });
    });

    it('to test for passive scroll', () => {
        const scrollController = ScrollController.init();
        expect(scrollController).toHaveProperty('supportsPassive');
    });

    it('to get passive listener options', () => {
        const scrollController = ScrollController.init();
        scrollController.supportsPassive = true;
        let options = scrollController.listenerOptions;
        expect(options).toEqual({ passive: true });

        scrollController.supportsPassive = false;
        options = scrollController.listenerOptions;
        expect(options).toEqual(false);
    });

    it('to add a scroll event listener on init', () => {
        const spy = jest.spyOn(ScrollController.prototype, '_addListeners');
        const scrollController = ScrollController.init();
        expect(spy).toHaveBeenCalled();
    });

    it('to set state on scroll', () => {
        const spy = jest.spyOn(ScrollController.prototype, 'setState');
        const scrollController = ScrollController.init();
        scrollController._handleScroll();
        expect(spy).toHaveBeenCalledWith({ scrollY: 0 });
    });

    it('to remove a scroll event listener on destroy', () => {
        const spy = jest.spyOn(ScrollController.prototype, '_removeListeners');
        const scrollController = ScrollController.init();
        scrollController.destroy();
        expect(spy).toHaveBeenCalled();
    });
});
