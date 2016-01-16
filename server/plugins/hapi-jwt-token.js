/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:09:59
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 02:39:01
*/

module.exports = {
	plugin: {
		register: require('hapi-jwt-token'),
		options: {
			key: require('../config').auth.key,
			signOptions: require('../config').auth.signOptions,
			verifyOptions: require('../config').auth.verifyOptions
		}
	},
	callback: function (server) {
		server.decorate('server', 'cookieOptions', require('../config').auth.cookieOptions);
		server.decorate('request', 'cookieOptions', require('../config').auth.cookieOptions);
	},
	require: ['good', 'hapi-auth-jwt2']
};
