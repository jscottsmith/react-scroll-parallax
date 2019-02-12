import { parseValueAndUnit } from './index';

/**
 * Takes a parallax element and parses the offset props to get the value
 * and unit. Sets these values as offset object accessible on the element.
 * @param {object} element
 */
export default function addOffsets(props) {
    const { y0: y0Prop, y1: y1Prop, x1: x1Prop, x0: x0Prop } = props;

    const y0 = parseValueAndUnit(y0Prop);
    const y1 = parseValueAndUnit(y1Prop);
    const x0 = parseValueAndUnit(x0Prop);
    const x1 = parseValueAndUnit(x1Prop);

    if (x0.unit !== x1.unit || y0.unit !== y1.unit) {
        throw new Error(
            'Must provide matching units for the min and max offset values of each axis.'
        );
    }

    const xUnit = x0.unit || '%';
    const yUnit = y0.unit || '%';

    return {
        xUnit,
        yUnit,
        y0,
        y1,
        x0,
        x1,
    };
}
