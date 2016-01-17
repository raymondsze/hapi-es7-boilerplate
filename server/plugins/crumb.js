/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:11:02
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-18 00:13:44
*/

// This plugin is used to enable csrf
import Crumb from 'crumb';
import config from '../config';

export default {
	plugin: {
		register: Crumb,
		options: config.csrf
	},
	disabled: true,
	callback: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: crumb...');
		}
		server.log(['info'], 'Installed plugin: crumb');
	}
};
