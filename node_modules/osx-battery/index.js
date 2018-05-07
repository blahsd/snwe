'use strict';
var execFile = require('child_process').execFile;
var plist = require('simple-plist');
var Promise = require('pinkie-promise');
var pify = require('pify');
var objType = require('obj-type');
var lowercaseFirstKeys = require('lowercase-first-keys');

module.exports = function () {
	if (process.platform !== 'darwin') {
		return Promise.reject(new Error('Only OS X systems are supported'));
	}

	var ret = {};
	var cmd = 'ioreg';
	var args = [
		'-n',
		'AppleSmartBattery',
		'-r',
		'-a'
	];

	return pify(execFile, Promise)(cmd, args)
		.then(plist.parse)
		.then(function (res) {
			if (!res) {
				return Promise.reject(new Error('This computer doesn\'t have a battery'));
			}

			ret = lowercaseFirstKeys(res[0]);

			Object.keys(ret).forEach(function (el) {
				if (objType(ret[el]) === 'object') {
					ret[el] = lowercaseFirstKeys(ret[el]);
				}
			});

			return ret;
		});
};
