/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:13:36
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 04:13:54
*/
// This plugin is used to enabled token authentication for user
module.exports = {
	plugin: {
		register: require('hapi-auth-jwt2')
	},
	callback: function (server) {
		const config = require('../config').auth;
		server.auth.strategy('jwt', 'jwt', true, config);
	},
	require: ['good']
};
