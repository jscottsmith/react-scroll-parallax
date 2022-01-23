'use strict';

var getSymbolDescription = require('get-symbol-description');

module.exports = function description() {
	return getSymbolDescription(this);
};
