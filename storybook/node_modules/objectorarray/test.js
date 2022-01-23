var test = require('tape')
var objectorarray = require('./')

test('objectorarray', t => {
  t.plan(12)

  t.ok(objectorarray({}))
  t.ok(objectorarray([]))
  t.ok(objectorarray(Object.create({})))
  t.ok(objectorarray(Object.create(Object.prototype)))
  t.ok(objectorarray(Object.create(null)))
  t.ok(objectorarray(new Foo))
  function Foo (bar) {
    this.bar = bar
  }

  t.notOk(objectorarray())
  t.notOk(objectorarray(function () {}))
  t.notOk(objectorarray(1))
  t.notOk(objectorarray(/foo/))
  t.notOk(objectorarray(null))
  t.notOk(objectorarray(undefined))
})
