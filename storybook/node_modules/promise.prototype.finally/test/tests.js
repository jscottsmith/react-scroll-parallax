'use strict';

var assertArray = function (t, value, length, assertType) {
	t.ok(Array.isArray(value), 'value is an array');
	t.equal(value.length, length, 'length is ' + length);
	if (typeof assertType === 'function') {
		for (var i = 0; i < value.length; i += 1) {
			assertType(value[i]);
		}
	}
};

module.exports = function (promiseFinally, t) {
	if (typeof Promise !== 'function') {
		return t.skip('No global Promise detected');
	}

	t.test('non-Promises', function (st) {
		var sentinel = {};
		var onFulfill = function () {};
		var onReject = function () {};
		var results = promiseFinally(
			{ then: function () { return [sentinel].concat(Array.prototype.slice.call(arguments)); } },
			onFulfill,
			onReject
		);
		st.equal(results[0], sentinel, 'a receiver with a custom `then` has its return value returned immediately');
		st.equal(typeof results[1], 'function', 'a receiver with a custom `then` gets the right arguments');
		st.equal(typeof results[2], 'function', 'a receiver with a custom `then` gets the right arguments');
		st.end();
	});

	t.test('onFinally arguments', function (st) {
		st.plan(4);

		promiseFinally(Promise.resolve(42), function () {
			st.equal(arguments.length, 0, 'resolved promise passes no arguments to onFinally');
		}).then(st.pass, st.fail);

		promiseFinally(Promise.reject(NaN), function () {
			st.equal(arguments.length, 0, 'rejected promise passes no arguments to onFinally');
		}).then(st.fail, st.pass);
	});

	t.test('onFinally fulfillment', function (st) {
		st.plan(6);

		promiseFinally(Promise.resolve(42), function () { return Promise.resolve(Infinity); }).then(function (x) {
			st.equal(x, 42, 'resolved promise onFinally resolution does not affect promise resolution value');
		})['catch'](st.fail);

		promiseFinally(Promise.resolve(42), function () { return Promise.reject(-Infinity); })['catch'](function (x) {
			st.equal(x, -Infinity, 'resolved promise onFinally returning a rejected Promise rejects with the new rejection value');
		})['catch'](st.fail);

		promiseFinally(Promise.resolve(42), function () { throw Function; })['catch'](function (e) {
			st.equal(e, Function, 'resolved promise onFinally throwing rejects with the thrown rejection value');
		})['catch'](st.fail);

		promiseFinally(Promise.reject(42), function () { return Promise.resolve(Infinity); })['catch'](function (e) {
			st.equal(e, 42, 'rejected promise onFinally resolution does not affect promise rejection value');
		})['catch'](st.fail);

		promiseFinally(Promise.reject(42), function () { return Promise.reject(-Infinity); })['catch'](function (x) {
			st.equal(x, -Infinity, 'rejected promise onFinally returning a rejected Promise rejects with the new rejection value');
		})['catch'](st.fail);

		promiseFinally(Promise.reject(42), function () { throw Function; })['catch'](function (e) {
			st.equal(e, Function, 'rejected promise onFinally throwing rejects with the thrown rejection value');
		})['catch'](st.fail);
	});

	var Subclass = (function () {
		try {
			// eslint-disable-next-line no-new-func
			return Function('class Subclass extends Promise { constructor(...args) { super(...args); this.thenArgs = []; } then(...args) { Subclass.thenArgs.push({ promise: this, args: args }); this.thenArgs.push({ promise: this, args: args }); return super.then(...args); } } Subclass.thenArgs = []; return Subclass;')();
		} catch (e) { /**/ }

		return false;
	}());
	t.test('inheritance', { skip: !Subclass }, function (st) {
		st.test('preserves correct subclass when chained', function (s2t) {
			var promise = promiseFinally(Subclass.resolve());
			s2t.ok(promise instanceof Subclass, 'promise is instanceof Subclass');
			s2t.equal(promise.constructor, Subclass, 'promise.constructor is Subclass');

			s2t.end();
		});

		st.test('preserves correct subclass when rejected', function (s2t) {
			var promise = promiseFinally(Subclass.resolve(), function () {
				throw new Error('OMG');
			});
			s2t.ok(promise instanceof Subclass, 'promise is instanceof Subclass');
			s2t.equal(promise.constructor, Subclass, 'promise.constructor is Subclass');

			promise['catch'](function () {}); // avoid unhandled rejection warning

			s2t.end();
		});

		st.test('preserves correct subclass when someone returns a thenable', function (s2t) {
			var promise = promiseFinally(Subclass.resolve(), function () {
				return Promise.resolve(1);
			});
			s2t.ok(promise instanceof Subclass, 'promise is instanceof Subclass');
			s2t.equal(promise.constructor, Subclass, 'promise.constructor is Subclass');

			s2t.end();
		});

		st.test('invokes the subclass’ then', function (s2t) {
			Subclass.thenArgs.length = 0;

			var original = Subclass.resolve();
			promiseFinally(original, function () {});

			assertArray(s2t, original.thenArgs, 1);
			assertArray(s2t, Subclass.thenArgs, 1);

			s2t.end();
		});

		st.test('passes the original onFinally when not a function', function (s2t) {
			Subclass.thenArgs.length = 0;

			var original = Subclass.resolve();
			var sentinel = {};
			promiseFinally(original, sentinel);

			assertArray(s2t, original.thenArgs, 1, function (x) { s2t.ok(Array.isArray(x.args)); });
			assertArray(s2t, Subclass.thenArgs, 1, function (x) { s2t.ok(Array.isArray(x.args)); });

			assertArray(s2t, original.thenArgs[0].args, 2, function (x) { s2t.equal(x, sentinel); });

			s2t.end();
		});

		st.test('when onFinally is a function, passes thenFinally/catchFinally', function (s2t) {
			Subclass.thenArgs.length = 0;

			var sentinel = {};
			var original = Subclass.resolve(sentinel);
			var onFinallyArgs = [];
			var onFinally = function onFinallyHandler() {
				onFinallyArgs.push(Array.prototype.slice.call(arguments));
				return 42;
			};
			var promise = promiseFinally(original, onFinally);

			assertArray(s2t, original.thenArgs, 1, function (x) { s2t.ok(Array.isArray(x.args)); });
			assertArray(s2t, Subclass.thenArgs, 1, function (x) { s2t.ok(Array.isArray(x.args)); });

			var thenArgs = original.thenArgs[0];
			assertArray(s2t, thenArgs.args, 2, function (x) { s2t.equal(typeof x, 'function'); });

			s2t.deepEqual(onFinallyArgs, [], 'onFinally not yet called');

			s2t.test('thenFinally works as expected', function (s3t) {
				onFinallyArgs.length = 0;

				s3t.plan(6);

				assertArray(s3t, Subclass.thenArgs, 1);

				promise.then(function (x) {
					s3t.equal(x, sentinel, 'original resolution value provided');
					s3t.deepEqual(onFinallyArgs, [[]], 'onFinally called once with no args');
					assertArray(s3t, Subclass.thenArgs, 9);
					s3t.end();
				})['catch'](s3t.fail);
			});

			s2t.test('catchFinally works as expected', function (s3t) {
				onFinallyArgs.length = 0;

				s3t.plan(17);
				var thrown = { toString: function () { return 'thrown object'; } };
				var onFinallyRejects = function onFinallyThrower() {
					onFinally.apply(undefined, arguments);
					throw thrown;
				};
				Subclass.thenArgs.length = 0;

				var rejectedPromise = promiseFinally(original, onFinallyRejects);

				assertArray(s3t, Subclass.thenArgs, 1);

				var rejectedPromiseCatch = function (e) {
					s3t.equal(e, thrown, 'original rejection value provided');
					s3t.deepEqual(onFinallyArgs, [[]], 'onFinally called once with no args');

					assertArray(s3t, Subclass.thenArgs, 3);
					/*
					 * 1) initial call with thenFinally/catchFinally
					 * 2) rejectedPromise.then call
					 * 3) rejectedPromise.then -> onFinally call
					 */
					assertArray(s3t, Subclass.thenArgs[0].args, 2, function (x) { s3t.equal(typeof x, 'function'); });

					assertArray(s3t, Subclass.thenArgs[1].args, 2);
					s3t.deepEqual(Subclass.thenArgs[1].args, [s3t.fail, rejectedPromiseCatch], 'rejectedPromise.then call args');

					assertArray(s3t, Subclass.thenArgs[2].args, 2);
					s3t.equal(Subclass.thenArgs[2].args[0], undefined, 'final .then call gets no onFulfill');
					s3t.equal(typeof Subclass.thenArgs[2].args[1], 'function', 'final .then call gets an onReject');

					s3t.end();
				};

				rejectedPromise.then(s3t.fail, rejectedPromiseCatch)['catch'](s3t.fail);
			});

			s2t.end();
		});

		st.test('observable then calls', { todo: true }, function (s2t) {
			var mp1Value = {};
			var mp1 = Subclass.resolve(mp1Value);
			var mp2 = Subclass.resolve(42);
			var mp3 = Subclass.reject(mp1Value);
			var mp4 = Subclass.reject(42);
			mp3['catch'](function () {}); // avoid unhandled rejection warning
			mp4['catch'](function () {}); // avoid unhandled rejection warning

			s2t.test('resolved observable then calls', { todo: true }, function (s3t) {
				var orig = Subclass.thenArgs.length;
				s3t.plan(6);
				return promiseFinally(mp1, function () { return mp2; }).then(function () {
					assertArray(s3t, Subclass.thenArgs, orig + 5);

					var mp2Calls = Subclass.thenArgs.filter(function (c) { return c.promise === mp2; });
					assertArray(s3t, mp2Calls, 1);
					s3t.equal(mp2Calls[0].args[1], undefined, '`reject` is undefined');
					s3t.equal(mp2Calls[0].args[0](), mp1Value, '`resolve` produces `mp1Value`');
				});
			});

			s2t.test('rejected observable then calls', { todo: true }, function (s3t) {
				var orig = Subclass.thenArgs.length;
				s3t.plan(7);
				return promiseFinally(mp3, function () { return mp4; }).then(s3t.fail, function () {
					assertArray(s3t, Subclass.thenArgs, orig + 5);

					var mp4Calls = Subclass.thenArgs.filter(function (c) { return c.promise === mp4; });
					assertArray(s3t, mp4Calls, 1);
					s3t.equal(mp4Calls[0].args[1], undefined, '`reject` is undefined');
					var thrown = false;
					try {
						mp4Calls[0].args[0]();
					} catch (error) {
						thrown = true;
						s3t.equal(error, mp1Value, 'rejects to `mp1Value`');
					}
					s3t.ok(thrown, 'threw an error');
				});
			});
		});
	});

	return t.comment('tests completed');
};
