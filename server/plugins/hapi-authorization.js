/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:09:59
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 23:09:31
*/

export default {
	plugin: {
		register: require('hapi-authorization'),
		options: {
			roles: ['ADMIN, USER, GUEST'],
			hierarchy: true,
			roleHierarchy: ['ADMIN', 'USER', 'GUEST']
		}
	},
	callback: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: hapi-authorization...');
		}
		server.log(['info'], 'Installed plugin: hapi-authorization');
	},
	require: ['good', 'hapi-auth-jwt2']
};
