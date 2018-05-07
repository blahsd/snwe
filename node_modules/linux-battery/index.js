'use strict';
var execFile = require('child_process').execFile;
var camelcaseKeys = require('camelcase-keys');
var linuxBatteries = require('linux-batteries');
var pify = require('pify');
var Promise = require('pinkie-promise');

module.exports = function () {
	var cmd = 'upower';

	if (process.platform !== 'linux') {
		return Promise.reject(new Error('Only Linux systems are supported'));
	}

	return linuxBatteries().then(function (batteries) {
		return Promise.all(batteries.map(function (battery) {
			var args = ['-i', '/org/freedesktop/UPower/devices/' + battery];
			var obj = {};

			return pify(execFile, Promise)(cmd, args).then(function (stdout) {
				stdout = stdout.trim().split('\n').forEach(function (el) {
					if (el.trim() === 'battery') {
						return;
					}

					el = el.split(/:\s+(?=[\w\d\'])/);
					obj[el[0].trim()] = el[1];
				});

				return camelcaseKeys(obj);
			});
		}));
	});
};
