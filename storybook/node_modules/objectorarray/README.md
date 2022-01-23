# objectorarray
 [![npm version][1]][0] [![downloads][2]][0]

Is the value an object or an array but not null or RegExp?

## Install

```
  $ yarn add objectorarray
```

## Usage

```js
 import objectorarray from 'objectorarray'
```

### True

All of the following return true:

```js
  objectorarray({})
  objectorarray([])  
  objectorarray(Object.create({}))
  objectorarray(Object.create(Object.prototype))
  objectorarray(Object.create(null))
  objectorarray(new Foo)
```

### False

All of the following return false:

```js
  objectorarray()
  objectorarray(function () {})
  objectorarray(1)
  objectorarray(/foo/)
  objectorarray(undefined)
  objectorarray(null)
```

## License

MIT

[0]: https://npmjs.org/package/objectorarray
[1]: https://img.shields.io/npm/v/objectorarray.svg?style=flat-square
[2]: http://img.shields.io/npm/dm/objectorarray.svg?style=flat-square
