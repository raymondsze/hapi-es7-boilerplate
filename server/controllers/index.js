/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-01 03:16:19
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-03 03:51:34
*/
const _ = require('lodash');
const Boom = require('boom');
const requireDirectory = require('require-directory');

const api = requireDirectory(module);
module.exports = _.mapValues(api, (controllers) => {
	return _.mapValues(controllers, (controller) => {
		// here is just intercept the handler function to make it support async function
		// we do not use plugin due to complexity of server.handler must require a extra key to store the controller
		return _.merge({}, controller, {
			handler: function (request, reply) {
				const callback = async function () {
					controller.handler(request, reply).catch((err) => {
						request.log(['error'], err);
						if (err.isBoom) {
							reply(err);
						} else {
							reply(Boom.wrap(err, 400));
						}
					});
				};
				callback();
			}
		});
	});
});
