import { ParallaxController } from 'react-scroll-parallax';

const addEventListener = window.addEventListener;
const removeEventListener = window.removeEventListener;

describe('Expect the ParallaxController', () => {

    afterEach(() => {
        window.addEventListener = addEventListener;
        window.removeEventListener = removeEventListener;
    });

    it('to return an instance on init', () => {
        const instance = ParallaxController.init();
        expect(instance).toBeInstanceOf(ParallaxController);
    });

    it('to return an existing instance from the window on init', () => {
        window.ParallaxController = 'foo';
        const instance = ParallaxController.init();
        expect(instance).toBe('foo');
        window.ParallaxController = undefined;
    });

    it('to throw on init if there\'s no window');

    it('to add listeners when init', () => {
        window.addEventListener = jest.fn();
        const instance = ParallaxController.init();

        expect(window.addEventListener.mock.calls[1]).toEqual(
            expect.arrayContaining(['scroll', expect.any(Function), false])
        );
        expect(window.addEventListener.mock.calls[2]).toEqual(
            expect.arrayContaining(['resize', expect.any(Function), false])
        );
    });

    it('to remove listeners when destroyed', () => {
        window.removeEventListener = jest.fn();
        const instance = ParallaxController.init();

        instance.destroy();
        expect(window.removeEventListener.mock.calls[0]).toEqual(
            expect.arrayContaining(['scroll', expect.any(Function), false])
        );
        expect(window.removeEventListener.mock.calls[1]).toEqual(
            expect.arrayContaining(['resize', expect.any(Function), false])
        );
        expect(window.ParallaxController).toBe(null);
    });
});