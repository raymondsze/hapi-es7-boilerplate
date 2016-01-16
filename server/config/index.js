/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 02:53:52
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-03 02:59:20
*/
const _ = require('lodash');
const defaultConfig = require('./default');
/* eslint-disable no-process-env */
switch (process.env.NODE_ENV || 'dev') {
case 'prod':
	module.exports = _.merge({}, defaultConfig, require('./env_prod'));
	break;
case 'uat':
	module.exports = _.merge({}, defaultConfig, require('./env_uat'));
	break;
case 'qa':
	module.exports = _.merge({}, defaultConfig, require('./env_qa'));
	break;
case 'dev':
default:
	module.exports = _.merge({}, defaultConfig, require('./env_dev'));
	break;
}
/* eslint-enable no-process-env */
