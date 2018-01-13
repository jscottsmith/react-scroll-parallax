import { offsetMin, offsetMax } from 'utils/propValidation';

describe('offsetMin prop validation', () => {
    it('returns null when provided a valid value', () => {
        expect(offsetMin({ offsetXMin: -100 }, 'offsetXMin', 'foo')).toBe(null);
        expect(offsetMin({ offsetXMin: '-10321px' }, 'offsetXMin', 'foo')).toBe(
            null
        );
        expect(offsetMin({ offsetXMin: '-10%' }, 'offsetXMin', 'foo')).toBe(
            null
        );
    });

    it('throws when provided a invalid value type', () => {
        const error = new Error(
            '[offsetXMin] in foo must be a string with with "%"" or "px" units or number.'
        );
        expect(offsetMin({ offsetXMin: false }, 'offsetXMin', 'foo')).toEqual(
            error
        );
        expect(offsetMin({ offsetXMin: {} }, 'offsetXMin', 'foo')).toEqual(
            error
        );
        expect(offsetMin({ offsetXMin: null }, 'offsetXMin', 'foo')).toEqual(
            error
        );
        expect(
            offsetMin({ offsetXMin: undefined }, 'offsetXMin', 'foo')
        ).toEqual(error);
        expect(offsetMin({ offsetXMin: [] }, 'offsetXMin', 'foo')).toEqual(
            error
        );
    });

    it('throws when provided a invalid value', () => {
        const error = new Error(
            '[offsetXMin] in foo is greater than zero. [offsetXMin] must be less than or equal to zero.'
        );
        expect(offsetMin({ offsetXMin: 100 }, 'offsetXMin', 'foo')).toEqual(
            error
        );
        expect(offsetMin({ offsetXMin: 1 }, 'offsetXMin', 'foo')).toEqual(
            error
        );
        expect(offsetMin({ offsetXMin: 0.0009 }, 'offsetXMin', 'foo')).toEqual(
            error
        );
        expect(offsetMin({ offsetXMin: '100px' }, 'offsetXMin', 'foo')).toEqual(
            error
        );
        expect(offsetMin({ offsetXMin: '99%' }, 'offsetXMin', 'foo')).toEqual(
            error
        );
    });
});

describe('offsetMax prop validation', () => {
    it('returns null when provided a valid value', () => {
        expect(offsetMax({ offsetXMax: 100 }, 'offsetXMax', 'foo')).toBe(null);
        expect(offsetMax({ offsetXMax: '10321px' }, 'offsetXMax', 'foo')).toBe(
            null
        );
        expect(offsetMax({ offsetXMax: '10%' }, 'offsetXMax', 'foo')).toBe(
            null
        );
    });

    it('throws when provided a invalid value type', () => {
        const error = new Error(
            '[offsetXMax] in foo must be a string with with "%"" or "px" units or number.'
        );
        expect(offsetMax({ offsetXMax: false }, 'offsetXMax', 'foo')).toEqual(
            error
        );
        expect(offsetMax({ offsetXMax: {} }, 'offsetXMax', 'foo')).toEqual(
            error
        );
        expect(offsetMax({ offsetXMax: null }, 'offsetXMax', 'foo')).toEqual(
            error
        );
        expect(
            offsetMax({ offsetXMax: undefined }, 'offsetXMax', 'foo')
        ).toEqual(error);
        expect(offsetMax({ offsetXMax: [] }, 'offsetXMax', 'foo')).toEqual(
            error
        );
    });

    it('throws when provided a invalid value', () => {
        const error = new Error(
            '[offsetXMax] in foo is less than zero. [offsetXMax] must be greater than or equal to zero.'
        );
        expect(offsetMax({ offsetXMax: -100 }, 'offsetXMax', 'foo')).toEqual(
            error
        );
        expect(offsetMax({ offsetXMax: -1 }, 'offsetXMax', 'foo')).toEqual(
            error
        );
        expect(offsetMax({ offsetXMax: -0.0009 }, 'offsetXMax', 'foo')).toEqual(
            error
        );
        expect(
            offsetMax({ offsetXMax: '-100px' }, 'offsetXMax', 'foo')
        ).toEqual(error);
        expect(offsetMax({ offsetXMax: '-99%' }, 'offsetXMax', 'foo')).toEqual(
            error
        );
    });
});
