'use strict'

var benchmark = require('benchmark')
var suite = new benchmark.Suite()
var fs = require('fs')
var myData = fs.readFileSync('./package.json')
var Parse = require('./')
var safe = require('json-parse-safe')
var max = 100

suite.add('Parse class', function parseBench () {
  var parsed = new Parse(myData)
  if (parsed.err) {
    return
  }

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    var count = 0
    var keys = Object.keys(parsed.value)
    for (var k = 0; k < keys.length; k++) {
      count++
    }
  }
})

suite.add('Parse wrapped', function parseBench () {
  var parsed = Parse(myData)
  if (parsed.err) {
    return
  }

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    var count = 0
    var keys = Object.keys(parsed.value)
    for (var k = 0; k < keys.length; k++) {
      count++
    }
  }
})

suite.add('json-parse-safe', function parseBench () {
  var parsed = safe(myData)
  if (parsed.error) {
    return
  }

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    var count = 0
    var keys = Object.keys(parsed.value)
    for (var k = 0; k < keys.length; k++) {
      count++
    }
  }
})

suite.add('try catch here', function tryCatchBench () {
  var data = null
  try {
    data = JSON.parse(myData)
  } catch (err) {
    return
  }

  // add a loop to simulate some activity here
  for (var i = 0; i < max; i++) {
    var count = 0
    var keys = Object.keys(data)
    for (var k = 0; k < keys.length; k++) {
      count++
    }
  }
})

suite.on('complete', function print () {
  for (var i = 0; i < this.length; i++) {
    console.log(this[i].toString())
  }

  console.log('Fastest is', this.filter('fastest').map('name')[0])
})

suite.run()
