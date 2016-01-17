/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:09:59
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 23:25:17
*/
import HapiJWTToken from 'hapi-jwt-token';
import config from '../config';

export default {
	plugin: {
		register: HapiJWTToken,
		options: {
			key: config.auth.key,
			signOptions: config.auth.signOptions,
			verifyOptions: config.auth.verifyOptions
		}
	},
	callback: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: hapi-jwt-token...');
		}
		server.decorate('server', 'cookieOptions', config.auth.cookieOptions);
		server.decorate('request', 'cookieOptions', config.auth.cookieOptions);
		server.log(['info'], 'Installed plugin: hapi-jwt-token');
	},
	require: ['good', 'hapi-auth-jwt2']
};
