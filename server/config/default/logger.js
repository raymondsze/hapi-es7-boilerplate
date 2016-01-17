/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-31 18:35:52
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 20:07:13
*/
import GoodWinstonReporter from 'good-winston-reporter';
import Winston from 'winston';
export default {
	// This parameter is used to report the operation status for every opsInterval mini-seconds
	// opsInterval: 1000,
	reporters: [{
		reporter: GoodWinstonReporter,
		events: {
			log: '*',
			request: '*',
			response: '*',
			error: '*'
		},
		config: {
			logger: Winston
		}
	}]
};
