/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-03 01:16:47
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 04:19:53
*/

module.exports = {
	plugin: {
		register: require('hapi-async-methods'),
		options: {
			methods: require('../config').methods
		}
	},
	require: ['good', 'hapi-jwt-token', 'hapi-authorization']
};
