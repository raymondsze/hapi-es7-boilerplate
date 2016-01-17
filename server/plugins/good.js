/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:11:02
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 23:25:21
*/

// This plugin is used to enable logging for request, response, log, error
import Good from 'good';
import config from '../config';

export default {
	plugin: {
		register: Good,
		options: config.logger
	},
	callback: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: good...');
		}
		server.log(['info'], 'Installed plugin: good');
	}
};
