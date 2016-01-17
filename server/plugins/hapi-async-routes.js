/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:09:59
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-18 01:23:24
*/
import HapiAsyncRoutes from 'hapi-async-routes';
import config from '../config';

export default {
	plugin: {
		register: HapiAsyncRoutes,
		options: {
			routes: config.routes
		}
	},
	callback: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: hapi-async-routes...');
		}
		server.log(['info'], 'Installed plugin: hapi-async-routes');
	},
	require: ['good', 'hapi-jwt-token', 'hapi-authorization', 'hapi-async-methods']
};
