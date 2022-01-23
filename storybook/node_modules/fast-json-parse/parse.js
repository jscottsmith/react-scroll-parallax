'use strict'

function Parse (data) {
  if (!(this instanceof Parse)) {
    return new Parse(data)
  }
  this.err = null
  this.value = null
  try {
    this.value = JSON.parse(data)
  } catch (err) {
    this.err = err
  }
}

module.exports = Parse
