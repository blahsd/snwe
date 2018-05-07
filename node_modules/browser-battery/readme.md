# browser-battery

> Get and watch battery information in a browser

*Currently working in Chrome, Firefox and Opera.*


## Install

```
$ npm install --save browser-battery
```


## Usage

```js
const browserBattery = require('browser-battery');

browserBattery().then(battery => {
	console.log(battery);
	/*
	{
		charging: false
		chargingTime: Infinity
		dischargingTime: 11160
		level: 0.6
		onchargingchange: null
		onchargingtimechange: null
		ondischargingtimechange: null
		onlevelchange: null
	}
	 */
});

// Use the event listeners
browserBattery().then(battery => {
	battery.onlevelchange = function () {
		console.log(battery.level);
		//=> 0.89
	};
});
```


## Related

* [battery-level](https://github.com/gillstrom/battery-level) - Get current battery level (OS X, Linux and Windows)


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
