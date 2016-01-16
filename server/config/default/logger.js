/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-31 18:35:52
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 01:16:30
*/
module.exports = {
	// This parameter is used to report the operation status for every opsInterval mini-seconds
	// opsInterval: 1000,
	reporters: [{
		reporter: require('good-winston-reporter'),
		events: {
			log: '*',
			request: '*',
			response: '*',
			error: '*'
		},
		config: {
			logger: require('winston')
		}
	}]
};
