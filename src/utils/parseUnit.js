export function parseUnit(str, out) {
    if (!out) {
        out = { value: 0, unit: '' };
    }

    str = String(str);

    const value = parseFloat(str, 10);

    out.value = value;
    out.unit = str.match(/[\d.\-\+]*\s*(.*)/)[1] || '';

    return out;
}
