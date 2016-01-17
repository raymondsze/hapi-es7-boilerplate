/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:13:36
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 23:30:15
*/
// This plugin is used to enabled token authentication for user
import HapiAuthJWT2 from 'hapi-auth-jwt2';
import config from '../config';

export default {
	plugin: {
		register: HapiAuthJWT2
	},
	callback: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: hapi-auth-jwt2...');
		}
		server.auth.strategy('jwt', 'jwt', true, config.auth);
		server.log(['info'], 'Installed plugin: hapi-auth-jwt2');
	},
	require: ['good']
};
