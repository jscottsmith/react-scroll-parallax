'use strict'

var test = require('tap').test
var Parse = require('./')

function successTests (value) {
  test('parse successfully with the function', function (t) {
    t.plan(2)
    var result = Parse(value)
    t.error(result.err)
    t.deepEqual(result.value, JSON.parse(value))
  })

  test('parse successfully with the constructor', function (t) {
    t.plan(2)
    var result = new Parse(value)
    t.error(result.err)
    t.deepEqual(result.value, JSON.parse(value))
  })
}

function failureTests (value) {
  var expectedErr
  try {
    JSON.parse(value)
  } catch (err) {
    expectedErr = err
  }

  test('parse unsuccessfully with the function', function (t) {
    t.plan(2)
    var result = Parse(value)
    t.notOk(result.value, 'no value')
    t.equal(result.err.message, expectedErr.message)
  })

  test('parse successfully with the constructor', function (t) {
    t.plan(2)
    var result = new Parse(value)
    t.notOk(result.value, 'no value')
    t.equal(result.err.message, expectedErr.message)
  })
}

successTests('{ "object": 32 }')
failureTests('{ "object": 32')
