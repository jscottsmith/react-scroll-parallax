import ParallaxController from '../src/classes/ParallaxController';
import { Element } from '../src/classes/Element';
import Rect from '../src/classes/Rect';
import Bounds from '../src/classes/Bounds';
import { VERTICAL } from '../src/constants';

const addEventListener = window.addEventListener;
const removeEventListener = window.removeEventListener;

const options = {
    elInner: document.createElement('div'),
    elOuter: document.createElement('div'),
    props: {
        disabled: false,
        x1: 0,
        x0: 0,
        y1: 0,
        y0: 0,
    },
};

describe('Expect the ParallaxController', () => {
    afterEach(() => {
        window.addEventListener = addEventListener;
        window.removeEventListener = removeEventListener;
    });

    it('to return an instance on init', () => {
        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        expect(controller).toBeInstanceOf(ParallaxController);
        controller.destroy();
    });

    it('to add listeners when init', () => {
        window.addEventListener = jest.fn();
        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        expect(window.addEventListener.mock.calls[0]).toEqual(
            expect.arrayContaining(['test', null, expect.any(Object)])
        );
        expect(window.addEventListener.mock.calls[1]).toEqual(
            expect.arrayContaining(['scroll', expect.any(Function), false])
        );
        expect(window.addEventListener.mock.calls[2]).toEqual(
            expect.arrayContaining(['resize', expect.any(Function), false])
        );
        controller.destroy();
    });

    it('to create an element and return it', () => {
        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        const element = controller.createElement(options);
        expect(element).toBeInstanceOf(Element);

        const elInner = document.createElement('div');
        elInner.style.transform = 'translate3d(0%, 0%, 0)';

        const expectedElement = {
            id: 1,
            isInView: true,
            scrollAxis: 'vertical',
            elInner,
            elOuter: document.createElement('div'),
            percent: 100,
            updatePosition: expect.any(Function),
            offsets: {
                x1: { unit: '%', value: 0 },
                x0: { unit: '%', value: 0 },
                xUnit: '%',
                y1: { unit: '%', value: 0 },
                y0: { unit: '%', value: 0 },
                yUnit: '%',
            },
            props: {
                disabled: false,
                x1: 0,
                x0: 0,
                y1: 0,
                y0: 0,
            },
        };
        expect(element).toMatchObject(expectedElement);
        expect(element.bounds).toBeInstanceOf(Bounds);
        expect(element.rect).toBeInstanceOf(Rect);

        controller.destroy();
    });

    it('to add created elements into the controller', () => {
        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        const element = controller.createElement(options);
        const elements = controller.getElements();

        expect(elements[0]).toEqual(element);
        controller.destroy();
    });

    it('to remove elements from the controller', () => {
        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        const element = controller.createElement(options);
        expect(controller.getElements()[0]).toEqual(element);

        controller.removeElementById(element.id);
        expect(controller.getElements()).toEqual([]);
        controller.destroy();
    });

    it("to throw if matching units aren't provided", () => {
        window.removeEventListener = jest.fn();
        const controller = ParallaxController.init({ scrollAxis: VERTICAL });

        const incorrectOffsets = {
            elInner: document.createElement('div'),
            elOuter: document.createElement('div'),
            props: {
                disabled: false,
                x1: '100px',
                x0: '-10%',
                y1: '50px',
                y0: 100, // defaults to %
            },
        };

        expect(() => controller.createElement(incorrectOffsets)).toThrowError(
            'Must provide matching units for the min and max offset values of each axis.'
        );

        controller.destroy();
    });

    it('to remove listeners when destroyed', () => {
        window.removeEventListener = jest.fn();
        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        expect(window.removeEventListener.mock.calls[0]).toEqual(
            expect.arrayContaining(['test', null, expect.any(Object)])
        );

        controller.destroy();
        expect(window.removeEventListener.mock.calls[1]).toEqual(
            expect.arrayContaining([
                'scroll',
                expect.any(Function),
                { passive: true },
            ])
        );
        expect(window.removeEventListener.mock.calls[2]).toEqual(
            expect.arrayContaining(['resize', expect.any(Function), false])
        );
    });
});
