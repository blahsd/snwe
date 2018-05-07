'use strict';
const execa = require('execa');
const linuxBattery = require('linux-battery');
const osxBattery = require('osx-battery');

const linux = () => linuxBattery().then(res => res[0].state === 'charging');
const osx = () => osxBattery().then(res => res.externalConnected);

const win = () => execa.stdout('WMIC', ['Path', 'Win32_Battery', 'Get', 'BatteryStatus']).then(stdout => {
	if (!stdout) {
		return Promise.reject(new Error('No battery could be found'));
	}

	return stdout.includes('2');
});

if (process.platform === 'darwin') {
	module.exports = osx;
} else if (process.platform === 'linux') {
	module.exports = linux;
} else {
	module.exports = win;
}
