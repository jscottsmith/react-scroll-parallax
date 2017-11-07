import parseOffsetUnits from 'utils/parseOffsetUnits.js';

test('Parses the x and y units as an array of values', () => {
    expect(
        parseOffsetUnits({
            x: [10, '-4px'],
            y: ['-75%', 10],
        })
    ).toMatchObject({
        x: [
            {
                unit: 'px',
                value: 10,
            },
            {
                unit: 'px',
                value: -4,
            },
        ],
        y: [
            {
                unit: '%',
                value: -75,
            },
            {
                unit: 'px',
                value: 10,
            },
        ],
    });

    expect(
        parseOffsetUnits({
            y: [0, 0],
        })
    ).toMatchObject({
        x: undefined,
        y: [
            {
                unit: 'px',
                value: 0,
            },
            {
                unit: 'px',
                value: 0,
            },
        ],
    });

    expect(parseOffsetUnits({})).toMatchObject({
        x: undefined,
        y: undefined,
    });
});
