import clamp from 'utils/clamp.js';

const max = 100;
const min = 10;

test('Clamps a value within a range', () => {
    expect(clamp(50, min, max)).toBe(50);

    expect(clamp(110, min, max)).toBe(max);

    expect(clamp(0, min, max)).toBe(min);
});
