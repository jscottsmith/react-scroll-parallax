import parseValueAndUnit from 'utils/parseValueAndUnit';

test('Parse a string to get the value and unit in either pixels or percent', () => {
    expect(parseValueAndUnit('5px'))
        .toEqual({ unit: 'px', value: 5 });
    expect(parseValueAndUnit('52%'))
        .toEqual({ unit: '%', value: 52 });
    expect(parseValueAndUnit(13.333))
        .toEqual({ unit: null, value: 13.333 });
    expect(parseValueAndUnit('75.8%'))
        .toEqual({ unit: '%', value: 75 });
    expect(parseValueAndUnit('23.1px'))
        .toEqual({ unit: 'px', value: 23 });
    expect(() => parseValueAndUnit(false))
        .toThrow();
});
