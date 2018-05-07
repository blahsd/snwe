'use strict';

module.exports = function (val, opts) {
	if (typeof val !== 'number') {
		throw new Error('Expected a number');
	}

	if (opts && (Number(opts.digits) || Number(opts.digits) === 0)) {
		return parseFloat((val / 100).toFixed(opts.digits));
	}

	return val / 100;
};
