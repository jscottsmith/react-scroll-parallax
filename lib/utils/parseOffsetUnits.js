'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = parseOffsetUnits;

var _parseUnit = require('./parseUnit');

var _parseUnit2 = _interopRequireDefault(_parseUnit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseOffsetUnits(props) {
	var x = props.x,
	    y = props.y;

	return {
		x: x && x.map(function (f) {
			return (0, _parseUnit2.default)(f);
		}),
		y: y && y.map(function (f) {
			return (0, _parseUnit2.default)(f);
		})
	};
}
module.exports = exports['default'];