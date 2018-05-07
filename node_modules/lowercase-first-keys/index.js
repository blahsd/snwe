'use strict';
module.exports = function (x) {
	if (typeof x !== 'object') {
		throw new TypeError('Expected an object');
	}

	var ret = {};
	var keys = Object.keys(x);

	for (var i = 0; i < keys.length; i++) {
		ret[keys[i].charAt(0).toLowerCase() + keys[i].slice(1)] = x[keys[i]];
	}

	return ret;
};
