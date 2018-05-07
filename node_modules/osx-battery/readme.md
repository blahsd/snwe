# osx-battery

> Get information about your Battery


## Install

```
$ npm install --save osx-battery
```


## Usage

```js
const osxBattery = require('osx-battery');

osxBattery().then(res => {
	console.log(res);
	/*
	{ 
		adapterInfo: 0,
		amperage: -1178,
		avgTimeToEmpty: 380,
		avgTimeToFull: 65535,
		batteryInstalled: true,
		batteryInvalidWakeSeconds: 30,
		batterySerialNumber: 'C01447304DPF9CRA8',
		bootPathUpdated: 1431448419,
		cellVoltage: [ 4098, 4105, 4104, 0 ],
		currentCapacity: 7468,
		cycleCount: 39,
		...
	}
	*/
});
```


## Related

* [battery-level](https://github.com/gillstrom/battery-level) - Get current battery level


## License

MIT © [Andreas Gillström](http://github.com/gillstrom)
