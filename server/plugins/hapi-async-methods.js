/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-03 01:16:47
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 23:25:20
*/
import HapiAsyncMethods from 'hapi-async-methods';
import config from '../config';

export default {
	plugin: {
		register: HapiAsyncMethods,
		options: {
			name: 'methodsAsync',
			methods: config.methods
		}
	},
	callback: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: hapi-async-methods...');
		}
		server.log(['info'], 'Installed plugin: hapi-async-methods');
	},
	require: ['good', 'hapi-jwt-token', 'hapi-authorization']
};
