/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:09:59
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 04:14:12
*/
module.exports = {
	plugin: {
		register: require('hapi-mongoose-bluebird'),
		options: require('../config').database.mongo
	},
	callback: function (server, error) {
		server.decorate('server', 'mongoose', server.plugins['hapi-mongoose-bluebird'].mongoose);
		server.decorate('server', 'models', server.plugins['hapi-mongoose-bluebird'].models);
		
		server.decorate('request', 'mongoose', server.plugins['hapi-mongoose-bluebird'].mongoose);
		server.decorate('request', 'models', server.plugins['hapi-mongoose-bluebird'].models);
	},
	require: ['good']
};
