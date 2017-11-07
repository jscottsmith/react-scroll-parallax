import parseUnit from 'utils/parseUnit.js';

test('Parses a value and returns an object with the value and unit', () => {
    expect(parseUnit('3450px')).toMatchObject({ unit: 'px', value: 3450 });
    expect(parseUnit('1000')).toMatchObject({ unit: 'px', value: 1000 });
    expect(parseUnit(980)).toMatchObject({ unit: 'px', value: 980 });
    expect(parseUnit('86%')).toMatchObject({ unit: '%', value: 86 });
    expect(parseUnit('1283fubar')).toMatchObject({
        unit: 'fubar',
        value: 1283,
    });
});
