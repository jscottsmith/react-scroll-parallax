'use strict';

var define = require('define-properties');
var RequireObjectCoercible = require('es-abstract/2021/RequireObjectCoercible');
var callBind = require('call-bind');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var bound = callBind.apply(getPolyfill());

var boundPadStart = function padStart(str, maxLength) {
	RequireObjectCoercible(str);
	var args = arguments.length > 2 ? [maxLength, arguments[2]] : [maxLength];
	return bound(str, args);
};

define(boundPadStart, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundPadStart;
