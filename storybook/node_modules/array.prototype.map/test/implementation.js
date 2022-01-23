var implementation = require('../implementation');
var callBind = require('call-bind');
var test = require('tape');
var runTests = require('./tests');

var hasStrictMode = require('has-strict-mode')();

test('as a function', function (t) {
	t.test('bad array/this value', function (st) {
		st['throws'](callBind(implementation, null, undefined, 'a'), TypeError, 'undefined is not an object');
		st['throws'](callBind(implementation, null, null, 'a'), TypeError, 'null is not an object');
		st.end();
	});

	t.test('receiver boxing', function (st) {
		st.plan(hasStrictMode ? 3 : 2);

		var context = 'x';

		implementation.call(
			'f',
			function () {
				st.equal(typeof this, 'object');
				st.equal(String.prototype.toString.call(this), context);
			},
			context
		);

		st.test('strict mode', { skip: !hasStrictMode }, function (sst) {
			sst.plan(2);

			implementation.call(
				'f',
				function () {
					'use strict';

					sst.equal(typeof this, 'string');
					sst.equal(this, context);
				},
				context
			);
			sst.end();
		});

		st.end();
	});

	runTests(callBind(implementation), t);

	t.end();
});
