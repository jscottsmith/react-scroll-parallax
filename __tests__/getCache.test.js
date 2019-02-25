import getCache from 'helpers/getCache.js';
import getOffsets from 'helpers/getOffsets.js';
import { View } from 'classes/View';
import { Scroll } from 'classes/Scroll';
import { createElementMock } from './testUtils/createElementMock';

const cacheParams1 = {
    element: createElementMock(
        { offsetWidth: 400, offsetHeight: 400 },
        {
            getBoundingClientRect: () => ({
                top: 500,
                left: 200,
                bottom: 700,
                right: 900,
            }),
        }
    ),
    offsets: getOffsets({ y0: 0, y1: 0, x1: 0, x0: 0 }),
    view: new View({ width: 1024, height: 769 }),
    scroll: new Scroll(0, 0),
};

describe.each([
    [
        cacheParams1,
        0,
        100,
        {
            originBottom: 800,
            originLeft: 200,
            originRight: 900,
            originTop: 600,
        },
    ],
    [
        cacheParams1,
        150,
        100,
        {
            originBottom: 800,
            originLeft: 350,
            originRight: 1050,
            originTop: 600,
        },
    ],
    [
        cacheParams1,
        10090,
        0,
        {
            originBottom: 700,
            originLeft: 10290,
            originRight: 10990,
            originTop: 500,
        },
    ],
])('getCache()', (params, x, y, expected) => {
    test(`returns expected cached properties for element origin adjusted for scroll position`, () => {
        params.scroll.setScroll(x, y);
        expect(getCache(params)).toEqual(expect.objectContaining(expected));
    });
});

const cacheParams2 = {
    element: createElementMock(
        { offsetWidth: 400, offsetHeight: 400 },
        {
            getBoundingClientRect: () => ({
                top: 500,
                left: 200,
                bottom: 700,
                right: 900,
            }),
        }
    ),
    offsets: getOffsets({ y0: 0, y1: 0, x1: 0, x0: 0 }),
    view: new View({
        width: 1024,
        height: 769,
        scrollContainer: createElementMock(
            { offsetWidth: 800, offsetHeight: 600 },
            {
                getBoundingClientRect: () => ({
                    top: 24,
                    left: 50,
                    // not used
                    // bottom: 624,
                    // right: 850,
                }),
            }
        ),
    }),
    scroll: new Scroll(0, 0),
};

describe.each([
    [
        cacheParams2,
        0,
        100,
        {
            originBottom: 776,
            originLeft: 150,
            originRight: 850,
            originTop: 576,
        },
    ],
    [
        cacheParams2,
        150,
        100,
        {
            originBottom: 776,
            originLeft: 300,
            originRight: 1000,
            originTop: 576,
        },
    ],
    [
        cacheParams2,
        10090,
        0,
        {
            originBottom: 676,
            originLeft: 10240,
            originRight: 10940,
            originTop: 476,
        },
    ],
])('getCache()', (params, x, y, expected) => {
    test(`returns expected cached properties for element origin adjusted for scroll position in a scroll container`, () => {
        params.scroll.setScroll(x, y);
        expect(getCache(params)).toEqual(expect.objectContaining(expected));
    });
});

const cacheParams3 = {
    element: createElementMock(
        { offsetWidth: 400, offsetHeight: 400 },
        {
            getBoundingClientRect: () => ({
                top: 500,
                left: 200,
                bottom: 700,
                right: 900,
            }),
        }
    ),
    offsets: getOffsets({ y0: 0, y1: 0, x1: 0, x0: 0 }),
    view: new View({ width: 1024, height: 769 }),
    scroll: new Scroll(0, 0),
};

describe.each([
    [
        cacheParams3,
        400,
        300,
        {
            originTotalDistX: 800,
            originTotalDistY: 700,
        },
    ],
    [
        cacheParams3,
        600,
        800,
        {
            originTotalDistX: 1000,
            originTotalDistY: 1200,
        },
    ],
    [
        cacheParams3,
        1024,
        1268,
        {
            originTotalDistX: 1424,
            originTotalDistY: 1668,
        },
    ],
])('getCache()', (params, width, height, expected) => {
    test(`returns expected cached properties for element origin total x/y dist to travel adjusted for view size`, () => {
        params.view.setSize(width, height);
        expect(getCache(params)).toEqual(expect.objectContaining(expected));
    });
});

// @TODO: see if these properties are necessary to cache.
const cacheParams4 = {
    element: createElementMock(
        { offsetWidth: 345, offsetHeight: 567 },
        {
            getBoundingClientRect: () => ({
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }),
        }
    ),
    offsets: getOffsets({ y0: 0, y1: 0, x1: 0, x0: 0 }),
    view: new View({ width: 1024, height: 769 }),
    scroll: new Scroll(0, 0),
};

test(`returns expected cached properties for element offset width/height`, () => {
    expect(getCache(cacheParams4)).toEqual(
        expect.objectContaining({
            width: 345,
            height: 567,
        })
    );
});

const cacheParams5 = {
    element: createElementMock(
        { offsetWidth: 400, offsetHeight: 400 },
        {
            getBoundingClientRect: () => ({
                top: 500,
                left: 200,
                bottom: 700,
                right: 900,
            }),
        }
    ),
    offsets: getOffsets({ y0: 100, y1: -100, x1: -100, x0: 100 }),
    view: new View({ width: 1024, height: 769 }),
    scroll: new Scroll(0, 0),
};

describe.each([
    [
        cacheParams5,
        400,
        300,
        {
            top: 800,
            bottom: 1000,
            left: 600,
            right: 1300,
            totalDistX: 2224,
            totalDistY: 1969,
        },
    ],
    [
        cacheParams5,
        600,
        800,
        {
            top: 1300,
            bottom: 1500,
            left: 800,
            right: 1500,
            totalDistX: 2224,
            totalDistY: 1969,
        },
    ],
    [
        cacheParams5,
        1024,
        1268,
        {
            top: 1768,
            bottom: 1968,
            left: 1224,
            right: 1924,
            totalDistX: 2224,
            totalDistY: 1969,
        },
    ],
])('getCache()', (params, x, y, expected) => {
    test(`returns expected cached properties rect bounds based on offsets and current scroll`, () => {
        params.scroll.setScroll(x, y);
        expect(getCache(params)).toEqual(expect.objectContaining(expected));
    });
});
