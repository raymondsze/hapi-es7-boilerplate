/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:09:59
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 23:25:16
*/
import HapiMongooseBluebird from 'hapi-mongoose-bluebird';
import config from '../config';

export default {
	plugin: {
		register: HapiMongooseBluebird,
		options: config.database.mongo
	},
	callback: function (server, error) {
		if (error) {
			server.log(['error'], 'Fail to install plugin: hapi-mongoose-bluebird...');
		}
		server.decorate('server', 'mongoose', server.plugins['hapi-mongoose-bluebird'].mongoose);
		server.decorate('server', 'models', server.plugins['hapi-mongoose-bluebird'].models);
		
		server.decorate('request', 'mongoose', server.plugins['hapi-mongoose-bluebird'].mongoose);
		server.decorate('request', 'models', server.plugins['hapi-mongoose-bluebird'].models);
		server.log(['info'], 'Installed plugin: hapi-mongoose-bluebird');
	},
	require: ['good']
};
