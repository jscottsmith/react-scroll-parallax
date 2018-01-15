import ParallaxController from 'libs/ParallaxController';

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

    it("to throw on init if there's no window");

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

    it('to create an element and return it', () => {
        const instance = ParallaxController.init();
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
        const element = instance.createElement(options);

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

    it('to update the controller when creating an element', () => {
        window.removeEventListener = jest.fn();
        window.ParallaxController = ParallaxController.init();
        window.ParallaxController.update = jest.fn();

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

        window.ParallaxController.createElement(options);
        expect(window.ParallaxController.update).toBeCalled();
        window.ParallaxController.destroy();
    });

    it('to update the controller when updating an element', () => {
        window.removeEventListener = jest.fn();
        window.ParallaxController = ParallaxController.init();
        window.ParallaxController.update = jest.fn();

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

        const element = window.ParallaxController.createElement(options);
        window.ParallaxController.updateElement(element, {
            prop: { disabled: false },
        });
        expect(window.ParallaxController.update).toBeCalled();
        window.ParallaxController.destroy();
    });

    it('to create an element then update the controller', () => {
        window.removeEventListener = jest.fn();
        window.ParallaxController = ParallaxController.init();
        window.ParallaxController.update = jest.fn();

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

        window.ParallaxController.createElement(options);

        expect(window.ParallaxController.update).toBeCalled();
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
