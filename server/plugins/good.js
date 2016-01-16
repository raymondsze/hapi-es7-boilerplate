/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:11:02
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-07 01:22:38
*/

// This plugin is used to enable logging for request, response, log, error
module.exports = {
	plugin: {
		register: require('good'),
		options: require('../config').logger
	}
};
