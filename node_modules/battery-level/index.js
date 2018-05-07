'use strict';
const execa = require('execa');
const linuxBattery = require('linux-battery');
const osxBattery = require('osx-battery');
const toDecimal = require('to-decimal');

const linux = () => linuxBattery().then(res => toDecimal(parseFloat(res[0].percentage.slice(0, res[0].percentage.length))));
const osx = () => osxBattery().then(res => parseFloat((res.currentCapacity / res.maxCapacity).toFixed(2)));

const win = () => execa.stdout('WMIC', ['Path', 'Win32_Battery', 'Get', 'EstimatedChargeRemaining']).then(stdout => {
	if (!stdout) {
		return Promise.reject(new Error('No battery could be found'));
	}

	stdout = parseFloat(stdout.trim().split('\n')[1]);
	return toDecimal(stdout > 100 ? 100 : stdout);
});

if (process.platform === 'darwin') {
	module.exports = osx;
} else if (process.platform === 'linux') {
	module.exports = linux;
} else {
	module.exports = win;
}
