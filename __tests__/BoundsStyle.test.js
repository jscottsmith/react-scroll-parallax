import BoundsStyle from 'utils/BoundsStyle.js';

describe('Expect a BoundsStyle class', () => {
    it('to have a bounds property', () => {
        const test = new BoundsStyle();

        expect(test.bounds).toMatchObject({
            mt: 0,
            mb: 0,
            ml: 0,
            mr: 0,
        });
    });

    it('to have getter for a boundsStyle object', () => {
        const test = new BoundsStyle();

        expect(test.boundsStyle).toMatchObject({
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: -0,
            paddingBottom: -0,
            paddingLeft: -0,
            paddingRight: -0,
        });
    });

    it('to return the instance after each transform', () => {
        const v1 = [{ value: 0, unit: 'px' }, { value: 0, unit: 'px' }];
        const v2 = 0;
        const v3 = 0;
        const test1 = new BoundsStyle().transformBoundsY(v1, v2);
        const test2 = new BoundsStyle().transformBoundsX(v1, v2);
        const test3 = new BoundsStyle().transformBoundsScale(v1, v2, v3);

        expect(test1).toBeInstanceOf(BoundsStyle);
        expect(test2).toBeInstanceOf(BoundsStyle);
        expect(test3).toBeInstanceOf(BoundsStyle);
    });

    it('to transforms bounds based on y offsets', () => {
        const y1 = [{ value: -100, unit: 'px' }, { value: 100, unit: 'px' }];
        const y2 = [{ value: -100, unit: '%' }, { value: 100, unit: '%' }];
        const height = 200;

        const test1 = new BoundsStyle().transformBoundsY(y1, height);
        const test2 = new BoundsStyle().transformBoundsY(y2, height);

        expect(test1.boundsStyle).toMatchObject({
            marginTop: -100,
            marginBottom: -100,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 100,
            paddingBottom: 100,
            paddingLeft: -0,
            paddingRight: -0,
        });

        expect(test2.boundsStyle).toMatchObject({
            marginTop: -200,
            marginBottom: -200,
            marginLeft: 0,
            marginRight: 0,
            paddingTop: 200,
            paddingBottom: 200,
            paddingLeft: -0,
            paddingRight: -0,
        });
    });

    it('to transforms bounds based on x offsets', () => {
        const x1 = [{ value: -100, unit: 'px' }, { value: 100, unit: 'px' }];
        const x2 = [{ value: -100, unit: '%' }, { value: 100, unit: '%' }];
        const height = 200;

        const test1 = new BoundsStyle().transformBoundsX(x1, height);
        const test2 = new BoundsStyle().transformBoundsX(x2, height);

        expect(test1.boundsStyle).toMatchObject({
            marginTop: 0,
            marginBottom: 0,
            marginLeft: -100,
            marginRight: -100,
            paddingTop: -0,
            paddingBottom: -0,
            paddingLeft: 100,
            paddingRight: 100,
        });

        expect(test2.boundsStyle).toMatchObject({
            marginTop: 0,
            marginBottom: 0,
            marginLeft: -200,
            marginRight: -200,
            paddingTop: -0,
            paddingBottom: -0,
            paddingLeft: 200,
            paddingRight: 200,
        });
    });
});
