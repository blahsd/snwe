# keyboardevents-areequal

[![Travis Build Status](https://img.shields.io/travis/parro-it/keyboardevents-areequal/master.svg)](http://travis-ci.org/parro-it/keyboardevents-areequal)
[![NPM downloads](https://img.shields.io/npm/dt/keyboardevents-areequal.svg)](https://npmjs.org/package/keyboardevents-areequal)

> Check if two keyboardevents objects are equals.

This module is part of an ongoing effort to make [electron-localshortcut](https://github.com/parro-it/electron-localshortcut) less error prone, using keyboard DOM listener instead of 'globalShortcut' method to trigger shortcuts handlers.

## Usage

This example check if various KeyboardEvent objects represents the same event:

```js
const areEqual = require('keyboardevents-areequal');

console.log(areEqual({ctrlKey: true, code: 'f'}, {ctrlKey: true, code: 'f'}));
// true

console.log(areEqual({code: 'f'}, {ctrlKey: true, code: 'f'}));
// false
```


## API

## Install

With [npm](https://npmjs.org/) installed, run

```bash
npm install --save keyboardevents-areequal
```

## See Also

- [`noffle/common-readme`](https://github.com/noffle/common-readme)

## License

MIT

