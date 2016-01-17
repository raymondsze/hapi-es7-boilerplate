/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 02:53:52
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 19:22:24
*/
import _ from 'lodash';
import defaultConfig from './default';
import prodConfig from './env_prod';
import uatConfig from './env_uat';
import qaConfig from './env_qa';
import devConfig from './env_dev';

let config = {};
/* eslint-disable no-process-env */
switch (process.env.NODE_ENV || 'dev') {
case 'prod':
	config = _.merge({}, defaultConfig, prodConfig);
	break;
case 'uat':
	config = _.merge({}, defaultConfig, uatConfig);
	break;
case 'qa':
	config = _.merge({}, defaultConfig, qaConfig);
	break;
case 'dev':
default:
	config = _.merge({}, defaultConfig, devConfig);
	break;
}
/* eslint-enable no-process-env */
export default config;
