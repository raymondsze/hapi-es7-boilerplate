/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:09:59
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 03:31:20
*/

module.exports = {
	plugin: {
		register: require('hapi-authorization'),
		options: {
			roles: ['ADMIN, USER, GUEST'],
			hierarchy: true,
			roleHierarchy: ['ADMIN', 'USER', 'GUEST']
		}
	},
	require: ['good', 'hapi-auth-jwt2']
};
