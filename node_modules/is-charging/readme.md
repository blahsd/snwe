# is-charging

> Find out if a computer is charging


## Install

```
$ npm install --save is-charging
```


## Usage

```js
const isCharging = require('is-charging');

isCharging().then(result => {
	console.log(result);
	//=> true
});
```


## API

### isCharging()

Returns a promise that resolves in to a `Boolean`.


## Related

* [is-charging-cli](https://github.com/gillstrom/is-charging-cli) - CLI for this module
* [battery-level](https://github.com/gillstrom/battery-level) - Get current battery level
* [browser-battery](https://github.com/gillstrom/browser-battery) - Get and watch battery information in a browser


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
