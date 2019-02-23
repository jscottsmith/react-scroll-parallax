import { Element } from 'classes/Element';

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
});
