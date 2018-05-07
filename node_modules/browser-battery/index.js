'use strict';
module.exports = function () {
	if (!navigator || !navigator.getBattery) {
		return Promise.reject(new Error('Browser not supported'));
	}

	return navigator.getBattery();
};
