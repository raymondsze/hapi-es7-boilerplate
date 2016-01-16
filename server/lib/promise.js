/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-14 02:09:37
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-14 02:14:42
*/

const _ = require('lodash');
const Promise = require('bluebird');

// To make Promise.coroutine act like co, grabbed from http://bluebirdjs.com/docs/api/promise.coroutine.addyieldhandler.html
function addYieldableObjects() {
	(() => {
		let promise = null;
		Promise.coroutine.addYieldHandler(function (v) {
			if (_.isUndefined(v) && promise) {
				return promise;
			}
			promise = null;
		});
		return function () {
			let def = Promise.defer();
			promise = def.promise;
			return def.callback;
		};
	})();

	Promise.coroutine.addYieldHandler(function (v) {
		if (_.isFunction(v)) {
			return Promise.fromCallback(function (cb) {
				v(cb);
			});
		}
	});

	Promise.coroutine.addYieldHandler(function (yieldedValue) {
		if (_.isArray(yieldedValue)) {
			return Promise.all(yieldedValue);
		}
	});
}
addYieldableObjects();

module.exports = Promise;
