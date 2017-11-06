import parseUnit from './parseUnit';

export default function parseOffsetUnits(props) {
	const { x, y } = props;
	return {
		x: x && x.map(f => parseUnit(f)),
		y: y && y.map(f => parseUnit(f)),
	};
}
