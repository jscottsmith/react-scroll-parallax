import { Element } from 'classes/Element';
import { View } from 'classes/View';
import { Scroll } from 'classes/Scroll';
import { createElementMock } from './testUtils/createElementMock';

const DEFAULT_OPTIONS = {
    elInner: document.createElement('div'),
    elOuter: document.createElement('div'),
    scrollAxis: 'vertical',
    props: { x0: 0, x1: 0, y0: 0, y1: 0 },
};

describe('Expect the Element class', () => {
    it('to construct', () => {
        const element = new Element(DEFAULT_OPTIONS);
        expect(element).toMatchObject(DEFAULT_OPTIONS);
    });

    it('to update props and return the instance', () => {
        const element = new Element(DEFAULT_OPTIONS);
        const updates = { disabled: true, x0: 100, x1: 100, y0: 0, y1: 0 };
        const instance = element.updateProps(updates);
        expect(instance.props).toMatchObject(updates);
        expect(instance).toBeInstanceOf(Element);
    });

    it('to set the correct updatePosition method', () => {
        const verticalElement = new Element(DEFAULT_OPTIONS);
        expect(verticalElement.updatePosition).toEqual(
            verticalElement._updatePositionVertical
        );
        const horizontalElement = new Element({
            ...DEFAULT_OPTIONS,
            scrollAxis: 'horizontal',
        });
        expect(horizontalElement.updatePosition).toEqual(
            horizontalElement._updatePositionHorizontal
        );
    });

    it('to set cache and return the instance', () => {
        const element = new Element(DEFAULT_OPTIONS);
        const view = new View({
            width: 100,
            height: 50,
            scrollContainer: createElementMock(),
        });
        const scroll = new Scroll(0, 40);
        const instance = element.setCachedAttributes(view, scroll);
        expect(instance).toBeInstanceOf(Element);
        expect(instance.cache).toMatchObject({
            bottom: 40,
            height: 0,
            left: 0,
            originBottom: 40,
            originLeft: 0,
            originRight: 0,
            originTop: 40,
            originTotalDistX: 100,
            originTotalDistY: 50,
            right: 0,
            top: 40,
            totalDistX: 100,
            totalDistY: 50,
            width: 0,
        });
    });

    it('to update position and return the instance', () => {
        const element = new Element(DEFAULT_OPTIONS);
        const view = new View({
            width: 100,
            height: 50,
            scrollContainer: createElementMock(),
        });
        const scroll = new Scroll(0, 0);
        element.setCachedAttributes(view, scroll);
        scroll.setScroll(0, 100);

        const instance = element.updatePosition(view, scroll);
        expect(instance).toBeInstanceOf(Element);
    });
});
