/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:09:59
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 04:20:02
*/
module.exports = {
	plugin: {
		register: require('hapi-async-routes'),
		options: {
			routes: require('../config').routes
		}
	},
	require: ['good', 'hapi-jwt-token', 'hapi-authorization', 'hapi-async-methods']
};
