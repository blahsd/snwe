# to-decimal [![Build Status](https://travis-ci.org/gillstrom/to-decimal.svg?branch=master)](https://travis-ci.org/gillstrom/to-decimal)

> Convert percent to decimal


## Install

```
$ npm install --save to-decimal
```


## Usage

```js
var toDecimal = require('to-decimal');

toDecimal(65);
//=> 0.65

toDecimal(1234.50, {digits: 1});
//=> 12.3
```


### toDecimal(value, options)

Returns a `number`.

#### value

*Required*  
Type: `number`

Value to convert.

#### options

Type: `object`

Options to pass.

##### options.digits

Type: `number`

Number of digits after the decimal point.


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
