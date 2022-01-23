# fast-json-parse

[![Build Status](https://travis-ci.org/mcollina/fast-json-parse.svg)](https://travis-ci.org/mcollina/fast-json-parse)

It is equivalent to [json-parse-safe](http://npm.im/json-parse-safe),
but it set both the `err` and `value` property to null.

The reason why this is fast is that `try/catch` inhibits the functions
in which you use them to be optimized. This assumption holds true up to
Node 6, from Node 7 and forward this module is not useful anymore.

## Install

```
npm i fast-json-parse --save
```

## Usage

You can use it as a function or via a contructor, as you prefer.

### function

```js
'use strict'

var parse = require('fast-json-parse')
var fs = require('fs')

var result = parse(fs.readFileSync('./package.json'))

if (result.err) {
  console.log('unable to parse json', result.err.message)
} else {
  console.log('json parsed successfully', result.value)
}
```

### constructor

```js
'use strict'

var Parse = require('fast-json-parse')
var fs = require('fs')

var result = new Parse(fs.readFileSync('./package.json'))

if (result.err) {
  console.log('unable to parse json', result.err.message)
} else {
  console.log('json parsed successfully', result.value)
}
```

## Acknowledgements

fast-json-parse is sponsored by [nearForm](http://nearform.com).

## License

MIT
