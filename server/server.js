/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-31 03:06:43
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 04:22:24
*/
require('./lib');
const _ = require('lodash');
const Hapi = require('hapi');

// create a connection to Hapi Server
const config = _.clone(require('./config').server);
const host = config.host;
const port = config.port;

// host and port is not allowed for hapi server configuration
delete config.host;
delete config.port;
const server = new Hapi.Server(config);

// connection with host and port
server.connection({host: host, port: port});

// registers all plugins
const plugins = require('./plugins');
function registerPlugins(index, callback) {
	const plugin = plugins[index];
	if (plugin) {
		server.register(plugin.plugin, (error) => {
			if (error) {
				callback(error);
			} else {
				_.isFunction(plugin.callback) && plugin.callback(server);
				registerPlugins(index + 1, callback);
			}
		});
	} else {
		callback();
	}
}

registerPlugins(0, () => {
	server.start(function () {
		server.log(['info'], 'Server started at ' + server.info.uri);
	});
});

module.exports = server;
