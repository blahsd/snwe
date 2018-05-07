'use strict';
var execFile = require('child_process').execFile;
var pify = require('pify');
var Promise = require('pinkie-promise');

module.exports = function () {
	return pify(execFile, Promise)('upower', ['-e']).then(function (stdout) {
		stdout = stdout.trim().split('\n').filter(function (el) {
			return /battery_[^]+$/.test(el);
		}).map(function (el) {
			return /battery_[^]+$/.exec(el)[0];
		});

		if (!stdout || !stdout.length) {
			return Promise.reject(new Error('No battery found'));
		}

		return stdout;
	});
};
