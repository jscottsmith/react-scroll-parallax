import ParallaxController from 'classes/ParallaxController';
import { Element } from 'classes/Element';
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
            elInner: elInner,
            elOuter: document.createElement('div'),
            cache: {
                height: 0,
                width: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                totalDistY: 768,
                totalDistX: 1024,
                originTop: 0,
                originBottom: 0,
                originLeft: 0,
                originRight: 0,
                originTotalDistY: 768,
                originTotalDistX: 1024,
            },
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
        expect(element).toEqual(expectedElement);
        controller.destroy();
    });

    it('to create an element and return it', () => {
        const controller = ParallaxController.init({ scrollAxis: VERTICAL });
        const element = controller.createElement(options);
        expect(element.id).toEqual(2);
        controller.updateElementPropsById(element.id, {
            y0: 0,
            y1: 0,
            x1: 10,
            x0: -10,
        });
        const elInner = document.createElement('div');
        elInner.style.transform = 'translate3d(10%, 0%, 0)';

        const expectedElement = {
            id: 2,
            isInView: true,
            scrollAxis: 'vertical',
            elInner: elInner,
            elOuter: document.createElement('div'),
            cache: {
                height: 0,
                width: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                totalDistY: 768,
                totalDistX: 1024,
                originTop: 0,
                originBottom: 0,
                originLeft: 0,
                originRight: 0,
                originTotalDistY: 768,
                originTotalDistX: 1024,
            },
            offsets: {
                x1: { unit: '%', value: 10 },
                x0: { unit: '%', value: -10 },
                xUnit: '%',
                y1: { unit: '%', value: 0 },
                y0: { unit: '%', value: 0 },
                yUnit: '%',
            },
            props: {
                disabled: false,
                y0: 0,
                y1: 0,
                x1: 10,
                x0: -10,
            },
        };
        expect(element).toEqual(expectedElement);
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
            expect.arrayContaining(['scroll', expect.any(Function), false])
        );
        expect(window.removeEventListener.mock.calls[2]).toEqual(
            expect.arrayContaining(['resize', expect.any(Function), false])
        );
    });
});
