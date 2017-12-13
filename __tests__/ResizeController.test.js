import ResizeController from 'controllers/ResizeController.js';

describe('Expect ResizeController', () => {
    it('to init a new instance', () => {
        const resizeController = ResizeController.init();
        expect(resizeController).toBeInstanceOf(ResizeController);
    });

    it('to have an initial width state', () => {
        const resizeController = ResizeController.init();
        expect(resizeController.state).toEqual({
            width: 0,
        });
    });

    it('to add a resize event listener on init', () => {
        const spy = jest.spyOn(ResizeController.prototype, '_addListeners');
        const resizeController = ResizeController.init();
        expect(spy).toHaveBeenCalled();
    });

    it('to set state on resize', () => {
        const spy = jest.spyOn(ResizeController.prototype, 'setState');
        const resizeController = ResizeController.init();
        resizeController._handleResize();
        expect(spy).toHaveBeenCalledWith({ width: 1024 });
    });

    it('to remove a resize event listener on destroy', () => {
        const spy = jest.spyOn(ResizeController.prototype, '_removeListeners');
        const resizeController = ResizeController.init();
        resizeController.destroy();
        expect(spy).toHaveBeenCalled();
    });
});
