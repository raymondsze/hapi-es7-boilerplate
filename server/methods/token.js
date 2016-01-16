/* 
* @Author: Sze Ka Wai Raymond (FakeC)
* @Date:   2016-01-03 01:11:04
* @Last Modified by:   Sze Ka Wai Raymond (FakeC)
* @Last Modified time: 2016-01-17 02:45:18
*/

const Promise = require('bluebird');
module.exports = [
	{
		name: 'getSession',
		method: async function (id, subject) {
			return {
				id: id,
				subject: subject
			};
		},
		options: {
			cache: {
				cache: 'redis',
				expiresIn: 7 * 24 * 60 * 1000,
				segment: 'session',
				generateTimeout: 100
			},
			generateKey: function (id) {
				return id;
			}
		}
	},
	{
		name: 'sign',
		method: async function (...args) {
			const server = require('../server');
			return await Promise.promisify(server.plugins['hapi-jwt-token'].sign).apply(null, args);
		}
	},
	{
		name: 'verify',
		method: async function (...args) {
			const server = require('../server');
			return await Promise.promisify(server.plugins['hapi-jwt-token'].verify).apply(null, args);
		}
	}
];
