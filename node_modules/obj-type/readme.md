# obj-type [![Build Status](https://travis-ci.org/gillstrom/obj-type.svg?branch=master)](https://travis-ci.org/gillstrom/obj-type)

> Returns any kind of object's type.

*Regexp, array, etc. are objects in JavaScript.*
	

## Install

```
$ npm install --save obj-type
```


## Usage

```js
var objType = require('obj-type');

objType({foo: 'bar'});
//=> 'object'

objType(/foo/);
//=> 'regexp'

objType(['foo', 'bar']);
//=> 'array'

objType(new Date());
//=> 'date'

objType(null);
//=> 'null'
```


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
