# lowercase-first-keys [![Build Status](https://travis-ci.org/gillstrom/lowercase-first-keys.svg?branch=master)](https://travis-ci.org/gillstrom/lowercase-first-keys)

> Lowercase the first letter of the keys in an object


## Install

```
$ npm install --save lowercase-first-keys
```


## Usage

```js
const lowercaseFirstKeys = require('lowercase-first-keys');

lowercaseFirstKeys({FooBar: 'bar'});
//=> {fooBar: 'baz'}
```


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
