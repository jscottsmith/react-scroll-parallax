import ParallaxController from 'libs/ParallaxController';

const addEventListener = window.addEventListener;
const removeEventListener = window.removeEventListener;

const options = {
    elInner: document.createElement('div'),
    elOuter: document.createElement('div'),
    props: {
        disabled: false,
        offsetXMax: 0,
        offsetXMin: 0,
        offsetYMax: 0,
        offsetYMin: 0,
        slowerScrollRate: false,
    },
};

describe('Expect the ParallaxController', () => {
    afterEach(() => {
        window.addEventListener = addEventListener;
        window.removeEventListener = removeEventListener;
    });

    it('to return an instance on init', () => {
        const controller = ParallaxController.init();
        expect(controller).toBeInstanceOf(ParallaxController);
    });

    it('to copy the instance to a legacy global on init', () => {
        const controller = ParallaxController.init();
        expect(window.ParallaxController).toBeInstanceOf(ParallaxController);
    });

    it("to throw on init if there's no window");

    it('to add listeners when init', () => {
        window.addEventListener = jest.fn();
        const controller = ParallaxController.init();
        expect(window.addEventListener.mock.calls[0]).toEqual(
            expect.arrayContaining(['test', null, expect.any(Object)])
        );
        expect(window.addEventListener.mock.calls[1]).toEqual(
            expect.arrayContaining(['scroll', expect.any(Function), false])
        );
        expect(window.addEventListener.mock.calls[2]).toEqual(
            expect.arrayContaining(['resize', expect.any(Function), false])
        );
    });

    it('to create an element and return it', () => {
        const controller = ParallaxController.init();
        const element = controller.createElement(options);

        const expectedElement = {
            attributes: {
                bottom: 0,
                elHeight: 0,
                elWidth: 0,
                top: 0,
                totalDist: 768,
                xMaxPx: 0,
                xMinPx: 0,
                yMaxPx: 0,
                yMinPx: 0,
            },
            elInner: document.createElement('div'),
            elOuter: document.createElement('div'),
            id: 1,
            offsets: {
                xMax: { unit: '%', value: 0 },
                xMin: { unit: '%', value: 0 },
                xUnit: '%',
                yMax: { unit: '%', value: 0 },
                yMin: { unit: '%', value: 0 },
                yUnit: '%',
            },
            props: {
                disabled: false,
                offsetXMax: 0,
                offsetXMin: 0,
                offsetYMax: 0,
                offsetYMin: 0,
                slowerScrollRate: false,
            },
        };
        expect(element).toEqual(expectedElement);
    });

    it('to add created elements into the controller', () => {
        const controller = ParallaxController.init();
        const element = controller.createElement(options);
        const elements = controller.getElements();

        expect(elements[0]).toEqual(element);
    });

    it('to remove elements from the controller', () => {
        const controller = ParallaxController.init();
        const element = controller.createElement(options);
        expect(controller.getElements()[0]).toEqual(element);

        controller.removeElement(element);
        expect(controller.getElements()).toEqual([]);
    });

    it("to throw if matching units aren't provided", () => {
        window.removeEventListener = jest.fn();
        const controller = ParallaxController.init();

        const incorrectOffsets = {
            elInner: document.createElement('div'),
            elOuter: document.createElement('div'),
            props: {
                disabled: false,
                offsetXMax: '100px',
                offsetXMin: '-10%',
                offsetYMax: '50px',
                offsetYMin: 100, // defaults to %
                slowerScrollRate: false,
            },
        };

        expect(() => controller.createElement(incorrectOffsets)).toThrowError(
            'Must provide matching units for the min and max offset values of each axis.'
        );

        controller.destroy();
    });

    it('to update the controller when creating an element', () => {
        window.removeEventListener = jest.fn();
        const controller = ParallaxController.init();
        controller.update = jest.fn();

        controller.createElement(options);
        expect(controller.update).toBeCalled();
        controller.destroy();
    });

    it('to update the controller when updating an element', () => {
        window.removeEventListener = jest.fn();
        const controller = ParallaxController.init();
        controller.update = jest.fn();

        const element = controller.createElement(options);
        controller.updateElement(element, {
            prop: { disabled: false },
        });
        expect(controller.update).toBeCalled();
        controller.destroy();
    });

    it('to create an element then update the controller', () => {
        window.removeEventListener = jest.fn();
        const controller = ParallaxController.init();
        controller.update = jest.fn();

        controller.createElement(options);

        expect(controller.update).toBeCalled();
    });

    it('to remove listeners when destroyed', () => {
        window.removeEventListener = jest.fn();
        const instance = ParallaxController.init();
        expect(window.removeEventListener.mock.calls[0]).toEqual(
            expect.arrayContaining(['test', null, expect.any(Object)])
        );

        instance.destroy();
        expect(window.removeEventListener.mock.calls[1]).toEqual(
            expect.arrayContaining(['scroll', expect.any(Function), false])
        );
        expect(window.removeEventListener.mock.calls[2]).toEqual(
            expect.arrayContaining(['resize', expect.any(Function), false])
        );
    });
});
