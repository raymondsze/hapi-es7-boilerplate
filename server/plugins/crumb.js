/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:11:02
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 03:33:55
*/

// This plugin is used to enable csrf
module.exports = {
	plugin: {
		register: require('crumb'),
		options: require('../config').csrf
	}
};
