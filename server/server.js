/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2015-12-31 03:06:43
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-18 01:27:50
*/
import _ from 'lodash';
import Hapi from 'hapi';
import config from './config';
import plugins from './plugins';
const serverConfig = _.clone(config.server);
const host = serverConfig.host;
const port = serverConfig.port;
// host and port is not allowed for hapi server configuration
delete serverConfig.host;
delete serverConfig.port;
const server = new Hapi.Server(serverConfig);

// connection with host and port
server.connection({host: host, port: port});

// registers all plugins
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

export default server;
