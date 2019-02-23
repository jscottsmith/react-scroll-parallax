import { Scroll } from 'classes/Scroll';

describe('Expect the Scroll class', () => {
    it('to construct', () => {
        const scroll = new Scroll(10, 50);
        expect(scroll).toMatchObject({ x: 10, y: 50 });
    });

    it('to set scroll and return the instance', () => {
        const scroll = new Scroll(9, 8);
        const instance = scroll.setScroll(10, 12);
        expect(instance).toMatchObject({ x: 10, y: 12 });
        expect(instance).toBeInstanceOf(Scroll);
    });
});
